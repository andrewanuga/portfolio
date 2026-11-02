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

  const iw = image.width;
  const ih = image.height;
  const data = image.data;
  const sample = (u: number, v: number) => {
    const ix = Math.min(iw - 1, Math.max(0, Math.floor(u * iw)));
    const iy = Math.min(ih - 1, Math.max(0, Math.floor(v * ih)));
    const idx = (iy * iw + ix) * 4;
    return (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
  };

  type Pt = {
    x: number; y: number; z: number;
    nx: number; ny: number; nz: number;
    dx: number; dy: number; dz: number;
    rn: number; bk: number;
  };
  const pts: Pt[] = [];

  while (pts.length < N) {
    const ox = r() * 1086;
    const oy = r() * 1070;
    if (!inside(ox, oy)) continue;

    const u = ox / 1086;
    const v = oy / 1070;
    const b = sample(u, v);

    // Accept more points in brighter / detailed facial regions
    const pAccept = 0.28 + 0.72 * b;
    if (r() > pAccept) continue;

    const cx = (u - 0.53) * 1.05;
    const cy = (1 - v - 0.46) * 1.38;

    const rad = Math.hypot(cx / 0.54, (cy - 0.1) / 0.72);
    if (rad > 1.1) continue;

    const baseZ = Math.sqrt(Math.max(0, 1 - Math.min(1, rad * rad))) * 0.42;
    const relief = (b - 0.4) * 0.26;
    const z = baseZ + relief + (r() - 0.5) * 0.02;

    const nx = cx;
    const ny = cy - 0.1;
    const nz = z + 0.2;
    const nl = Math.hypot(nx, ny, nz) || 1;

    // Bucket into 8 height bands × 8 brightness bins
    const yNorm = clamp((cy + 0.6) / 1.3);
    const band = clamp(Math.floor(yNorm * 8), 0, 7);
    const bBin = clamp(Math.floor(b * 8), 0, 7);
    const bk = band * 8 + bBin;

    const [a, bDir, c] = unit();
    const len = 0.55 + 0.9 * r();

    pts.push({
      x: cx, y: cy, z,
      nx: nx / nl, ny: ny / nl, nz: nz / nl,
      rn: r(),
      bk,
      dx: a * len * 1.3, dy: bDir * len - 0.2, dz: c * len
    });
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
/* Colour: Brand Blue ↔ Sky Cyan gradient with dynamic brightness     */
/* ------------------------------------------------------------------ */

const BLUE_BRAND: [number, number, number] = [37, 99, 235]; // Brand Blue #2563eb
const BLUE_CYAN: [number, number, number] = [56, 189, 248]; // Sky Cyan #38bdf8
const BRIGHT = [0.35, 0.48, 0.60, 0.74, 0.86, 0.98, 1.10, 1.22];
const ALPHA = [0.70, 0.78, 0.84, 0.90, 0.94, 0.98, 1, 1];

function bucketStyle(bk: number, flip: number, vox: number) {
  const band = Math.floor(bk / 8);
  const bb = bk % 8;
  const yt = band / 7;
  const yellowness = mix(1 - yt, yt, flip);
  const m = ease(clamp((yellowness - 0.15) / 0.7));
  const out: number[] = [];
  for (let c = 0; c < 3; c++) {
    let v = mix(BLUE_BRAND[c], BLUE_CYAN[c], m) * BRIGHT[bb];
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

    const N = window.innerWidth < 720 ? 22000 : 50000;
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

    // Enhanced Mouse & Interaction State
    const mouse = {
      x: 0, y: 0,
      cx: window.innerWidth / 2, 
      cy: window.innerHeight / 2,
      sx: window.innerWidth / 2, 
      sy: window.innerHeight / 2,
      prevX: window.innerWidth / 2,
      prevY: window.innerHeight / 2,
      speed: 0,
      active: false, 
      initialized: false, 
      strength: 0,
    };

    // Active click shockwave ripples
    type Ripple = { x: number; y: number; age: number; maxAge: number; maxRadius: number };
    const ripples: Ripple[] = [];

    const onLeave = () => { 
      mouse.active = false; 
    };

    const updatePointer = (clientX: number, clientY: number) => {
      mouse.cx = clientX;
      mouse.cy = clientY;
      mouse.active = true;
      if (!mouse.initialized) {
        mouse.sx = mouse.cx;
        mouse.sy = mouse.cy;
        mouse.prevX = mouse.cx;
        mouse.prevY = mouse.cy;
        mouse.initialized = true;
      }
    };

    const onMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
      // Spawn shockwave ripple on click / tap
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        maxAge: 0.75,
        maxRadius: Math.min(window.innerWidth * 0.45, 340)
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onLeave, { passive: true });
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

      // Intro assembly progress
      const intro = 1 - ease(clamp((t - 0.15) / 2.4));
      const d = Math.max(s.dissolve, intro);

      // Damped time
      const dt = previousTime === null ? 1 / 60 : clamp(t - previousTime, 0, 0.05);
      previousTime = t;

      // Update pointer velocity
      const moveDx = mouse.cx - mouse.prevX;
      const moveDy = mouse.cy - mouse.prevY;
      const instantSpeed = Math.hypot(moveDx, moveDy) / Math.max(dt, 0.001);
      mouse.speed += (instantSpeed - mouse.speed) * (1 - Math.exp(-8 * dt));
      mouse.prevX = mouse.cx;
      mouse.prevY = mouse.cy;

      // Head tracking: responsive full-viewport gaze tracking
      const targetX = mouse.active ? clamp((mouse.cx / window.innerWidth) * 2 - 1, -1, 1) : 0;
      const targetY = mouse.active ? clamp((mouse.cy / window.innerHeight) * 2 - 1, -1, 1) : 0;

      const follow = 1 - Math.exp(-14 * dt);
      const settle = 1 - Math.exp(-9 * dt);

      mouse.x += (targetX - mouse.x) * settle;
      mouse.y += (targetY - mouse.y) * settle;
      mouse.sx += (mouse.cx - mouse.sx) * follow;
      mouse.sy += (mouse.cy - mouse.sy) * follow;

      // Strength activates when mouse is in viewport
      const targetStrength = mouse.active ? 1 : 0;
      mouse.strength += (targetStrength - mouse.strength) * settle;

      // Gaze angles
      const yawAmt = 0.38 * (1 - 0.5 * s.vox);
      const pitchAmt = 0.18 * (1 - 0.5 * s.vox);
      const yaw = Math.sin(t * 0.45) * 0.035 + mouse.x * yawAmt;
      const pitch = -mouse.y * pitchAmt;
      const sy = Math.sin(yaw);
      const cyw = Math.cos(yaw);
      const sp = Math.sin(pitch);
      const cp = Math.cos(pitch);

      const sc = 0.44 * Math.min(H, W * 1.1) * s.zoom * (1 + 0.05 * intro);
      const cx = W / 2 + s.shiftX * W;
      const cyS = H * 0.46;
      const cam = 3.2;

      // Ambient pedestal glow
      const glowA = 0.22 * (1 - d) * (1 - s.vox);
      if (glowA > 0.005) {
        const gr = ctx.createRadialGradient(W / 2, H * 1.02, 0, W / 2, H * 1.02, W * 0.38);
        gr.addColorStop(0, `rgba(37,99,235,${glowA})`);
        gr.addColorStop(1, "rgba(37,99,235,0)");
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, W, H);
      }

      // Cursor position in local canvas coordinates
      const mx = mouse.sx - s.frame.left;
      const my = mouse.sy - s.frame.top;

      // Interaction radius & dynamic push force
      const R = clamp(H * 0.22, 90, 200);
      const R2 = R * R;
      const velocityBoost = Math.min(30, mouse.speed * 0.035);
      const push = (Math.min(38, H * 0.045) + velocityBoost) * mouse.strength * (1 - d) * (1 - 0.7 * s.vox);

      // Soft interactive light halo around the cursor
      if (mouse.strength > 0.1 && !s.vox && push > 1) {
        const haloR = R * 1.25;
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, haloR);
        aura.addColorStop(0, `rgba(59, 130, 246, ${0.16 * mouse.strength})`);
        aura.addColorStop(0.5, `rgba(37, 99, 235, ${0.06 * mouse.strength})`);
        aura.addColorStop(1, "rgba(37, 99, 235, 0)");
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(mx, my, haloR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update click shockwave ripples
      for (let ri = ripples.length - 1; ri >= 0; ri--) {
        ripples[ri].age += dt;
        if (ripples[ri].age >= ripples[ri].maxAge) {
          ripples.splice(ri, 1);
        }
      }

      // Voxel / point setup
      const cell = s.vox > 0.02 ? mix(1.5, 12.5, s.vox) : 0;
      const baseSize = (0.95 + 0.35 * (H / 800)) * (1 + (s.zoom - 1) * 0.12) * (1 - 0.4 * d);
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
          // Back-face culling
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

          // Continuous fluid magnetic cursor repulsion
          const ddx = X - mx;
          const ddy = Y - my;
          const dd = ddx * ddx + ddy * ddy;
          if (push > 0.01 && dd < R2) {
            const dist = Math.sqrt(dd) + 0.001;
            const f = 1 - dist / R;
            // Smooth bell curve with fluid tangential swirl
            const pu = f * f * (3 - 2 * f) * push;
            const swirl = (ddx / dist - ddy / dist * 0.28) * pu;
            const swirlY = (ddy / dist + ddx / dist * 0.28) * pu;
            X += swirl;
            Y += swirlY;
          }

          // Active click shockwave propagation
          if (ripples.length > 0) {
            for (let ri = 0; ri < ripples.length; ri++) {
              const rip = ripples[ri];
              const rpx = rip.x - s.frame.left;
              const rpy = rip.y - s.frame.top;
              const rdx = X - rpx;
              const rdy = Y - rpy;
              const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
              const ripProgress = rip.age / rip.maxAge;
              const currentRadius = ripProgress * rip.maxRadius;
              const ringDist = Math.abs(rdist - currentRadius);
              const ringThickness = 45;

              if (ringDist < ringThickness) {
                const ringForce = (1 - ringDist / ringThickness) * (1 - ripProgress) * 35;
                if (rdist > 1) {
                  X += (rdx / rdist) * ringForce;
                  Y += (rdy / rdist) * ringForce;
                }
              }
            }
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
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointercancel", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
