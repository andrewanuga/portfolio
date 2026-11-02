"use client";

import { useEffect, useRef } from "react";
import { clamp, ease, mix, subscribe, type SceneState } from "@/lib/stage";

/* ------------------------------------------------------------------ */
/* Procedural bust: head + ears + neck + shoulders, sampled as points  */
/* ------------------------------------------------------------------ */

const NB = 24; // colour buckets: 8 height bands × 3 shading levels

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

function buildCloud(N: number): Cloud {
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

  const Lr = Math.hypot(-0.4, 0.7, 0.6);
  const L = [-0.4 / Lr, 0.7 / Lr, 0.6 / Lr];

  type P = {
    x: number;
    y: number;
    z: number;
    nx: number;
    ny: number;
    nz: number;
    bk: number;
    rn: number;
    dx: number;
    dy: number;
    dz: number;
  };
  const pts: P[] = [];

  for (let i = 0; i < N; i++) {
    const k = r();
    let x = 0;
    let y = 0;
    let z = 0;
    let nx = 0;
    let ny = 0;
    let nz = 1;

    if (k < 0.5) {
      // head
      const [ux, uy, uz] = unit();
      const jaw = Math.max(0, -uy);
      const f = 1 + (r() - 0.5) * 0.03;
      x = 0.36 * ux * (1 - 0.22 * jaw) * f;
      y = 0.55 + 0.48 * uy * f;
      z = 0.4 * uz * (1 - 0.1 * jaw) * f;
      nx = ux;
      ny = uy;
      nz = uz;
    } else if (k < 0.525) {
      // ears
      const sign = r() < 0.5 ? -1 : 1;
      const [ux, uy, uz] = unit();
      x = sign * 0.37 + 0.045 * ux;
      y = 0.5 + 0.1 * uy;
      z = -0.02 + 0.07 * uz;
      nx = sign * 0.7 + ux * 0.3;
      ny = uy * 0.3;
      nz = uz * 0.3;
    } else if (k < 0.6) {
      // neck
      const a = r() * Math.PI * 2;
      y = -0.12 + r() * 0.26;
      x = 0.19 * Math.cos(a);
      z = 0.17 * Math.sin(a);
      nx = Math.cos(a);
      ny = 0;
      nz = Math.sin(a);
    } else if (k < 0.69) {
      // trapezius: a flared cone that blends the neck into the shoulders
      const a = r() * Math.PI * 2;
      const tt = r();
      y = -0.12 - 0.3 * tt;
      x = (0.19 + 0.78 * Math.pow(tt, 1.2)) * Math.cos(a);
      z = (0.17 + 0.28 * tt) * Math.sin(a);
      nx = Math.cos(a);
      ny = 0.7;
      nz = Math.sin(a);
    } else {
      // shoulders / upper torso
      const [ux, uy, uz] = unit();
      const uy2 = Math.abs(uy);
      x = 1.15 * ux;
      y = -0.62 + 0.26 * uy2 - 0.1 * ux * ux;
      z = 0.5 * uz;
      nx = ux;
      ny = uy2 * 1.4;
      nz = uz * 1.2;
    }

    x += (r() - 0.5) * 0.004;
    y += (r() - 0.5) * 0.004;
    z += (r() - 0.5) * 0.004;

    const nl = Math.hypot(nx, ny, nz) || 1;
    nx /= nl;
    ny /= nl;
    nz /= nl;

    const yb = clamp(Math.floor(((y + 0.8) / 1.9) * 8), 0, 7);
    const dot = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
    const bb = dot < 0.3 ? 0 : dot < 0.65 ? 1 : 2;

    const [a, b, c] = unit();
    const len = 0.4 + r() * 1.6;

    pts.push({
      x,
      y,
      z,
      nx,
      ny,
      nz,
      bk: yb * 3 + bb,
      rn: r(),
      dx: a * len * 1.3,
      dy: b * len - 0.2,
      dz: c * len,
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
/* Colour: lavender ↔ lime gradient that flips as you scroll           */
/* ------------------------------------------------------------------ */

const LAV: [number, number, number] = [200, 178, 244];
const YEL: [number, number, number] = [228, 240, 96];
const BRIGHT = [0.62, 0.88, 1.12];
const ALPHA = [0.5, 0.78, 1];

function bucketStyle(bk: number, flip: number, vox: number) {
  const band = Math.floor(bk / 3);
  const bb = bk % 3;
  const yt = band / 7; // 0 = bottom, 1 = top
  const yellowness = mix(1 - yt, yt, flip);
  const m = ease(clamp((yellowness - 0.15) / 0.7));
  const out: number[] = [];
  for (let c = 0; c < 3; c++) {
    let v = mix(LAV[c], YEL[c], m) * BRIGHT[bb];
    v += (255 - v) * vox * 0.3;
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
    const cloud = buildCloud(N);

    const mouse = { tx: 0, ty: 0, x: 0, y: 0, cx: -9999, cy: -9999, sx: 0, sy: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.cx = e.clientX;
      mouse.cy = e.clientY;
    };
    const onLeave = () => {
      mouse.cx = -9999;
      mouse.cy = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const draw = (s: SceneState, t: number) => {
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

      // smoothed mouse → head rotation
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const yawAmt = 0.5 * (1 - 0.6 * s.vox);
      const yaw = Math.sin(t * 0.45) * 0.09 + mouse.x * yawAmt;
      const pitch = mouse.y * 0.12;
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
      const mx = mouse.cx - s.frame.left;
      const my = mouse.cy - s.frame.top;
      const R = Math.max(70, H * 0.14);
      const R2 = R * R;
      const push = H * 0.05;

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
          if (dd < R2) {
            const dist = Math.sqrt(dd) + 0.001;
            const f = 1 - dist / R;
            const pu = f * f * push;
            X += (ddx / dist) * pu;
            Y += (ddy / dist) * pu;
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
      unsub();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

// Calibrated camera perspective projection and back-face culling threshold
