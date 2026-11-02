/**
 * Scroll-driven scene engine.
 *
 * One rAF loop reads the scroll position, smooths it, turns it into a
 * `SceneState` (every animated value on the page) and hands that to every
 * subscriber. Components write straight to the DOM / canvas, so scrolling never
 * triggers a React re-render.
 */

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const ease = (t: number) => t * t * (3 - 2 * t);
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export type SceneState = {
  p: number;
  w: number;
  h: number;
  bg: string;
  frame: {
    amount: number; // 0 = full-bleed, 1 = floating card
    left: number;
    top: number;
    width: number;
    height: number;
    radius: number;
  };
  hero: number; // hero text / tagline opacity
  heroShift: number; // px
  caption: number; // "Everything around you" opacity
  float: number; // floating UI enter progress
  floatOut: number; // floating UI exit progress
  typed: number; // prompt box typing progress
  dissolve: number; // point cloud scatter amount
  zoom: number; // camera zoom on the head
  shiftX: number; // horizontal pan (fraction of frame width)
  vox: number; // 0 = points, 1 = voxels
  flip: number; // colour gradient direction
  memory: number; // memory panel visibility
  time: number; // time panel visibility
};

const BG_STOPS: [number, [number, number, number]][] = [
  [0, [5, 5, 6]],
  [0.12, [5, 5, 6]],
  [0.2, [162, 159, 167]],
  [0.32, [236, 234, 243]],
  [0.54, [236, 234, 243]],
  [0.6, [5, 5, 6]],
  [1, [5, 5, 6]],
];

function bgAt(p: number): string {
  for (let i = 0; i < BG_STOPS.length - 1; i++) {
    const [p0, c0] = BG_STOPS[i];
    const [p1, c1] = BG_STOPS[i + 1];
    if (p >= p0 && p <= p1) {
      const t = ease((p - p0) / (p1 - p0 || 1));
      return `rgb(${Math.round(mix(c0[0], c1[0], t))},${Math.round(mix(c0[1], c1[1], t))},${Math.round(
        mix(c0[2], c1[2], t),
      )})`;
    }
  }
  return "rgb(5,5,6)";
}

/**
 * Timeline (p = 0..1 over the sticky section)
 *   0.00 – 0.10  hero: "HELLO I'M ANDREW"
 *   0.12 – 0.26  head shrinks into a floating card, background lightens
 *   0.34 – 0.46  floating UI flies in, prompt types itself
 *   0.54 – 0.66  card expands to full black, head dissolves into particles
 *   0.68 – 0.76  head re-forms
 *   0.78 – 0.86  camera dives into the voxel face (pans left)
 *   0.84 – 0.93  memory / system nodes panel
 *   0.91 – 0.96  face slides to the right
 *   0.95 – 1.00  time saved / velocity metrics panel
 */
export function computeScene(p: number, w: number, h: number): SceneState {
  const mobile = w < 768;
  const insetX = mobile ? 0.05 : 0.14;
  const insetT = mobile ? 0.2 : 0.135;
  const insetB = mobile ? 0.2 : 0.145;

  const toCard = ease(range(p, 0.12, 0.26));
  const toFull = ease(range(p, 0.54, 0.62));
  const amount = toCard * (1 - toFull);

  const l = w * insetX * amount;
  const t = h * insetT * amount;
  const b = h * insetB * amount;

  const zt = ease(range(p, 0.78, 0.86));
  const dissolve = ease(range(p, 0.55, 0.66)) * (1 - ease(range(p, 0.68, 0.76)));

  return {
    p,
    w,
    h,
    bg: bgAt(p),
    frame: {
      amount,
      left: l,
      top: t,
      width: w - l * 2,
      height: h - t - b,
      radius: 16 * amount,
    },
    hero: 1 - ease(range(p, 0.07, 0.16)),
    heroShift: -ease(range(p, 0.05, 0.2)) * 90,
    caption: ease(range(p, 0.2, 0.27)) * (1 - ease(range(p, 0.5, 0.56))),
    float: range(p, 0.34, 0.46),
    floatOut: ease(range(p, 0.54, 0.6)),
    typed: range(p, 0.38, 0.52),
    dissolve,
    zoom: 1 + 2.7 * zt,
    shiftX: -0.4 * zt + 0.8 * ease(range(p, 0.91, 0.96)),
    vox: zt,
    flip: 1 - ease(range(p, 0.06, 0.26)),
    memory: ease(range(p, 0.84, 0.89)) * (1 - ease(range(p, 0.9, 0.93))),
    time: ease(range(p, 0.95, 0.985)),
  };
}

type Listener = (s: SceneState, t: number) => void;
const listeners = new Set<Listener>();

export function subscribe(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

/** Starts the shared loop. `getEl` returns the tall scroll container. */
export function startStage(getEl: () => HTMLElement | null) {
  let raf = 0;
  let cur = 0;
  let first = true;
  const t0 = performance.now();
  let last = t0;

  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const el = getEl();
    if (el) {
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const target = clamp(-rect.top / total);
      if (first) {
        cur = target;
        first = false;
      } else {
        cur += (target - cur) * (1 - Math.exp(-dt * 7));
      }
      const s = computeScene(cur, window.innerWidth, window.innerHeight);
      const t = (now - t0) / 1000;
      listeners.forEach((fn) => fn(s, t));
    }
    raf = requestAnimationFrame(loop);
  };

  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
}
