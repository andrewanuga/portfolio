"use client";

import { useEffect, useRef } from "react";
import { clamp, ease, mix, subscribe, type SceneState } from "@/lib/stage";

/* ------------------------------------------------------------------ */
/* Portrait sampled as a sculpted point relief with facial detail      */
/* ------------------------------------------------------------------ */

const NB = 64; // 8 height bands × 8 photographic shading levels

type Cloud = {
  n: number;
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  nx: Float32Array;
  ny: Float32Array;
  nz: Float32Array;
  dx: Float32Array;
  dy: Float32Array;
  dz: Float32Array;
  rn: Float32Array;
  bstart: Int32Array;
};

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCloud(N: number, image: ImageData): Cloud {
  const r = rng(1337);
  const g = () => {
    let u = 0;
    while (u === 0) u = r();
    const v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const unit = (): [number, number, number] => {
    const a = g();
    const b = g();
    const c = g();
    const l = Math.hypot(a, b, c) || 1;
    return [a / l, b / l, c / l];
  };

  // Trace the subject in the reference's original 1086 × 1448 coordinates.
  // This keeps the dark backdrop out without discarding dark hair or clothing.
  const outline = [
    [377, 345], [390, 265], [432, 207], [497, 164], [585, 148],
    [679, 160], [750, 199], [791, 264], [807, 337], [786, 432],
    [779, 464], [790, 469], [786, 521], [761, 562], [741, 575],
    [708, 689], [706, 740], [765, 785], [874, 834], [1028, 883],
    [1065, 980], [1086, 1070], [0, 1070], [31, 990], [79, 887],
    [240, 831], [352, 775], [421, 727], [424, 682], [399, 588],
    [384, 535], [379, 486], [386, 444],
  ];
  const inside = (x: number, y: number) => {
    let hit = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const [xi, yi] = outline[i];
      const [xj, yj] = outline[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  };
  const bump = (x: number, y: number, cx: number, cy: number, wx: number, wy: number) =>
    Math.exp(-(((x - cx) / wx) ** 2 + ((y - cy) / wy) ** 2) * 2);

  type P = {
    x: number; y: number; z: number;
    nx: number; ny: number; nz: number;
    bk: number; rn: number; dx: number; dy: number; dz: number;
  };
  const pts: P[] = [];
  // A jittered grid keeps facial detail evenly distributed, including the eyes.
  const step = Math.sqrt((1086 * 950 * 0.56) / N);
  for (let v = 148; v < 1070; v += step) {
    for (let u = 0; u < 1086; u += step) {
      const sx = u + r() * step;
      const sy = v + r() * step;
      if (!inside(sx, sy)) continue;
      const ix = Math.min(image.width - 1, Math.floor(sx / 1086 * image.width));
      const iy = Math.min(image.height - 1, Math.floor(sy / 1448 * image.height));
      const offset = (iy * image.width + ix) * 4;
      const lum = (image.data[offset] * 0.2126 + image.data[offset + 1] * 0.7152 + image.data[offset + 2] * 0.0722) / 255;
      const x = (sx - 543) / 1086 * 2.3;
      const y = 1.18 - (sy - 148) / 1086 * 2.3;
      // Photo relief: rounded cranium, cheekbones, eye sockets, nose and lips.
      // Depth is anatomical rather than inferred from dark skin/hair pixels.
      const faceX = (sx - 590) / 205;
      let z = 0.07;
      if (sy < 790) {
        z += 0.27 * Math.sqrt(Math.max(0, 1 - faceX * faceX));
        z += 0.15 * bump(sx, sy, 553, 562, 65, 115);
        z += 0.10 * bump(sx, sy, 550, 600, 67, 37);
        z += 0.045 * bump(sx, sy, 471, 558, 65, 75);
        z += 0.045 * bump(sx, sy, 672, 566, 65, 75);
        z -= 0.055 * bump(sx, sy, 480, 496, 57, 31);
        z -= 0.055 * bump(sx, sy, 650, 507, 57, 31);
        z += 0.055 * bump(sx, sy, 552, 680, 82, 40);
        z += 0.025 * bump(sx, sy, 554, 755, 86, 44);
      } else {
        z += 0.08 * Math.max(0, 1 - Math.abs(x));
      }
      z += (r() - 0.5) * 0.009;
      const band = clamp(Math.floor(((y + 0.8) / 2) * 8), 0, 7);
      const shade = clamp(Math.floor(Math.pow(lum, 0.65) * 8), 0, 7);
      const [a, b, c] = unit();
      const len = 0.4 + r() * 1.6;
      pts.push({ x, y, z, nx: 0, ny: 0, nz: 1,
        bk: band * 8 + shade, rn: r(),
        dx: a * len * 1.3, dy: b * len - 0.2, dz: c * len });
    }
  }

  pts.sort((p, q) => p.bk - q.bk);

  const n = pts.length;
  const cloud: Cloud = {
    n,
    px: new Float32Array(n),
    py: new Float32Array(n),
    pz: new Float32Array(n),
    nx: new Float32Array(n),
    ny: new Float32Array(n),
    nz: new Float32Array(n),
    dx: new Float32Array(n),
    dy: new Float32Array(n),
    dz: new Float32Array(n),
    rn: new Float32Array(n),
    bstart: new Int32Array(NB + 1),
  };
  const counts = new Int32Array(NB);
  pts.forEach((p, i) => {
    cloud.px[i] = p.x;
    cloud.py[i] = p.y;
    cloud.pz[i] = p.z;
    cloud.nx[i] = p.nx;
    cloud.ny[i] = p.ny;
    cloud.nz[i] = p.nz;
    cloud.dx[i] = p.dx;
    cloud.dy[i] = p.dy;
    cloud.dz[i] = p.dz;
    cloud.rn[i] = p.rn;
    counts[p.bk]++;
  });
  for (let b = 0; b < NB; b++) cloud.bstart[b + 1] = cloud.bstart[b] + counts[b];
  return cloud;
}

/* ------------------------------------------------------------------ */
/* Colour: lavender ↔ lime gradient that flips as you scroll           */
/* ------------------------------------------------------------------ */

const LAV: [number, number, number] = [200, 178, 244];
const YEL: [number, number, number] = [228, 240, 96];
const BRIGHT = [0.32, 0.44, 0.57, 0.70, 0.83, 0.96, 1.08, 1.18];
const ALPHA = [0.65, 0.73, 0.81, 0.88, 0.93, 0.97, 1, 1];

function bucketStyle(bk: number, flip: number, vox: number) {
  const band = Math.floor(bk / 8);
  const bb = bk % 8;
  const yt = band / 7; // 0 = bottom, 1 = top
  const yellowness = mix(1 - yt, yt, flip);
  const m = ease(clamp((yellowness - 0.15) / 0.7));
  const out: number[] = [];
  for (let c = 0; c < 3; c++) {
    let v = mix(LAV[c], YEL[c], m) * BRIGHT[bb];
    v += (255 - v) * (0.08 + vox * 0.22);
    out.push(Math.round(clamp(v, 0, 255)));
  }
  return { fill: `rgb(${out[0]},${out[1]},${out[2]})`, alpha: ALPHA[bb] };
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function PointCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const N = window.innerWidth < 720 ? 20000 : 48000;
    let cloud: Cloud | null = null;
    let disposed = false;
    const portrait = new Image();
    portrait.onload = () => {
      if (disposed) return;
      const sample = document.createElement("canvas");
      sample.width = 543;
      sample.height = 724;
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;
      sampleCtx.drawImage(portrait, 0, 0, sample.width, sample.height);
      cloud = buildCloud(N, sampleCtx.getImageData(0, 0, sample.width, sample.height));
    };
    portrait.src = "/assets/andrew.png";

    const mouse = {
      x: 0, y: 0, cx: 0, cy: 0, sx: 0, sy: 0,
      active: false, initialized: false, strength: 0,
    };
    const onLeave = () => { mouse.active = false; };
    const onMove = (e: PointerEvent) => {
      // Let touch gestures scroll without leaving a stuck hover effect.
      if (e.pointerType === "touch") { onLeave(); return; }
      mouse.cx = e.clientX;
      mouse.cy = e.clientY;
      mouse.active = true;
      if (!mouse.initialized) {
        mouse.sx = mouse.cx;
        mouse.sy = mouse.cy;
        mouse.initialized = true;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointercancel", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);
    let previousTime: number | null = null;

    const draw = (s: SceneState, t: number) => {
      if (!cloud) return;
      const W = Math.max(1, Math.round(s.frame.width));
      const H = Math.max(1, Math.round(s.frame.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const cw = Math.round(W * dpr);
      const ch = Math.round(H * dpr);
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);

      // intro: the head assembles itself out of particles on load
      const intro = 1 - ease(clamp((t - 0.15) / 2.4));
      const d = Math.max(s.dissolve, intro);

      // Time-based damping feels consistent on both 60 Hz and 144 Hz screens.
      const dt = previousTime === null ? 1 / 60 : clamp(t - previousTime, 0, 0.05);
      previousTime = t;
      const follow = 1 - Math.exp(-12 * dt);
      const settle = 1 - Math.exp(-7 * dt);
      const inside = mouse.active && mouse.cx >= s.frame.left &&
        mouse.cx <= s.frame.left + W && mouse.cy >= s.frame.top &&
        mouse.cy <= s.frame.top + H;
      const targetX = inside ? clamp((mouse.cx - s.frame.left) / W * 2 - 1, -1, 1) : 0;
      const targetY = inside ? clamp((mouse.cy - s.frame.top) / H * 2 - 1, -1, 1) : 0;
      mouse.x += (targetX - mouse.x) * settle;
      mouse.y += (targetY - mouse.y) * settle;
      mouse.sx += (mouse.cx - mouse.sx) * follow;
      mouse.sy += (mouse.cy - mouse.sy) * follow;
      mouse.strength += ((inside ? 1 : 0) - mouse.strength) * settle;
      const yawAmt = 0.28 * (1 - 0.6 * s.vox);
      const yaw = Math.sin(t * 0.45) * 0.045 + mouse.x * yawAmt;
      const pitch = -mouse.y * 0.10;
      const sy = Math.sin(yaw);
      const cyw = Math.cos(yaw);
      const sp = Math.sin(pitch);
      const cp = Math.cos(pitch);

      const sc = 0.44 * Math.min(H, W * 1.1) * s.zoom * (1 + 0.05 * intro);
      const cx = W / 2 + s.shiftX * W;
      const cyS = H * 0.46;
      const cam = 3.2;

      // glow under the bust
      const glowA = 0.2 * (1 - d) * (1 - s.vox);
      if (glowA > 0.005) {
        const gr = ctx.createRadialGradient(W / 2, H * 1.02, 0, W / 2, H * 1.02, W * 0.34);
        gr.addColorStop(0, `rgba(226,240,90,${glowA})`);
        gr.addColorStop(1, "rgba(226,240,90,0)");
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, W, H);
      }

      // mouse in canvas space
      const mx = mouse.sx - s.frame.left;
      const my = mouse.sy - s.frame.top;
      const R = clamp(H * 0.16, 70, 150);
      const R2 = R * R;
      const push = Math.min(26, H * 0.032) * mouse.strength * (1 - d) * (1 - 0.7 * s.vox);

      // voxel mode
      const cell = s.vox > 0.02 ? mix(1.5, 12.5, s.vox) : 0;
      const baseSize = (0.9 + 0.35 * (H / 800)) * (1 + (s.zoom - 1) * 0.12) * (1 - 0.4 * d);
      const cullThr = -0.15 - d * 4;

      const { px, py, pz, nx, ny, nz, dx, dy, dz, rn, bstart } = cloud;

      for (let b = 0; b < NB; b++) {
        const i0 = bstart[b];
        const i1 = bstart[b + 1];
        if (i0 === i1) continue;
        const st = bucketStyle(b, s.flip, s.vox);
        ctx.fillStyle = st.fill;
        ctx.globalAlpha = st.alpha * (1 - 0.45 * d) * (cell ? 0.92 : 1);

        for (let i = i0; i < i1; i++) {
          // back-face culling (relaxes while dissolving)
          const nzz = ny[i] * sp + (-nx[i] * sy + nz[i] * cyw) * cp;
          if (nzz < cullThr) continue;

          let x = px[i];
          let y = py[i];
          let z = pz[i];

          if (d > 0.002) {
            const e = d * (0.5 + rn[i]);
            x += dx[i] * e + Math.sin(t * 0.8 + rn[i] * 12.56) * 0.04 * d;
            y += dy[i] * e + Math.cos(t * 0.7 + rn[i] * 9) * 0.04 * d;
            z += dz[i] * e;
          }

          const x1 = x * cyw + z * sy;
          const z1 = -x * sy + z * cyw;
          const y0 = y - 0.55;
          const y1 = y0 * cp - z1 * sp;
          const z2 = y0 * sp + z1 * cp;
          const k = cam / (cam - z2);

          let X = cx + x1 * sc * k;
          let Y = cyS - y1 * sc * k;

          const ddx = X - mx;
          const ddy = Y - my;
          const dd = ddx * ddx + ddy * ddy;
          if (push > 0.01 && dd < R2) {
            const dist = Math.sqrt(dd) + 0.001;
            const f = 1 - dist / R;
            const pu = f * f * (3 - 2 * f) * push;
            // A small tangential drift makes the dots flow around the cursor.
            X += (ddx / dist - ddy / dist * 0.2) * pu;
            Y += (ddy / dist + ddx / dist * 0.2) * pu;
          }

          if (X < -20 || X > W + 20 || Y < -20 || Y > H + 20) continue;

          if (cell > 0) {
            const vs = cell * 0.82;
            ctx.fillRect(Math.floor(X / cell) * cell, Math.floor(Y / cell) * cell, vs, vs);
          } else {
            const ps = baseSize * k;
            ctx.fillRect(X, Y, ps * (1 + d * 2.2), ps * 0.9);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const unsub = subscribe(draw);
    return () => {
      disposed = true;
      portrait.onload = null;
      unsub();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointercancel", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
