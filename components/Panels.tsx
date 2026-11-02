"use client";

import { clamp, ease } from "@/lib/stage";
import { useStageEffect } from "@/lib/useStage";

/** Shared: grow bars, count numbers up and fill meters as a panel appears. */
function animateInner(el: HTMLElement, o: number) {
  el.querySelectorAll<HTMLElement>("[data-bar]").forEach((b, i) => {
    const g = ease(clamp(o * 1.7 - i * 0.045));
    b.style.transform = `scaleY(${g})`;
  });
  el.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => {
    const target = Number(c.dataset.count);
    c.textContent = Math.round(target * ease(clamp(o * 1.4))).toLocaleString("en-US");
  });
  el.querySelectorAll<HTMLElement>("[data-fill]").forEach((f) => {
    f.style.width = `${Number(f.dataset.fill) * ease(clamp(o * 1.3))}%`;
  });
  el.querySelectorAll<HTMLElement>("[data-tick]").forEach((t, i, all) => {
    t.style.opacity = String(clamp(o * 1.6 - (i / all.length) * 0.9));
  });
}

/* ------------------------------ Memory / Architecture ------------------------------ */

const WEEK = [
  { d: "Thu", v: 0.58 },
  { d: "Fri", v: 0.8 },
  { d: "Sat", v: 0.42 },
  { d: "Sun", v: 0.35 },
  { d: "Mon", v: 0.92 },
  { d: "Tue", v: 0.74 },
  { d: "NOW", v: 0.88 },
];

export function MemoryPanel() {
  const ref = useStageEffect<HTMLDivElement>((el, s) => {
    const o = s.memory;
    el.style.opacity = String(o);
    el.style.transform = `translate3d(${(1 - o) * 60}px,-50%,0)`;
    el.style.pointerEvents = o > 0.6 ? "auto" : "none";
    animateInner(el, o);
  });

  return (
    <div
      ref={ref}
      className="absolute right-[4vw] top-[48%] z-10 w-[min(92vw,430px)] opacity-0 will-change-transform lg:right-[8%]"
    >
      <div className="mb-3 flex justify-end">
        <div className="glass flex rounded-lg p-0.5 text-[10px] text-white/55">
          {["Day", "Week", "Month"].map((t) => (
            <span
              key={t}
              className={`rounded-md px-3 py-1 ${t === "Week" ? "bg-white/15 text-white" : ""}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] text-white/80 font-mono">Code Velocity</span>
          <span className="text-[9px] font-mono text-kin-lime">Q2 Sprint</span>
        </div>
        <div className="flex h-24 items-end justify-between gap-2.5">
          {WEEK.map((w, i) => (
            <div
              key={w.d}
              data-bar
              className={`flex-1 origin-bottom rounded-md ${i === WEEK.length - 1 ? "bg-kin-lime" : "bg-kin-lav"}`}
              style={{ height: `${w.v * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between gap-2.5 text-[9px] text-white/45">
          {WEEK.map((w, i) => (
            <span key={w.d} className={`flex-1 text-center ${i === WEEK.length - 1 ? "font-semibold text-white/80" : ""}`}>
              {w.d}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-white/45 font-mono">
          <span data-count="1204" className="tabular-nums text-white/90">0</span> production commits ·{" "}
          <span data-count="12" className="tabular-nums text-white/90">0</span> shipped models
        </p>
      </div>

      <div className="glass mt-3 rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12px] font-medium text-white/90">Core Stack</span>
          <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] text-blue-400 font-medium">Next.js &amp; PyTorch</span>
        </div>
        <div className="h-3.5 overflow-hidden rounded-md bg-white/10">
          <div data-fill="100" className="h-full w-0 rounded-md bg-blue-500" />
        </div>
        <div className="mt-2 flex gap-4 text-[9px] text-white/50">
          <span className="flex items-center gap-1.5">
            <i className="h-1.5 w-1.5 rounded-[2px] bg-white/80" />
            TypeScript · Modern Web
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-1.5 w-1.5 rounded-[2px] bg-emerald-400" />
            Production Tested
          </span>
        </div>
        <div className="mt-3 flex gap-2 text-[10px] text-white/80">
          <a
            href="/Adakole_Andrew_Oche_Resume.pdf"
            download
            className="rounded-md bg-white/10 px-2.5 py-1.5 transition hover:bg-white/20 flex items-center gap-1"
          >
            Download CV <span className="text-white/45">⌘D</span>
          </a>
          <a
            href="#projects"
            className="rounded-md bg-white/10 px-2.5 py-1.5 transition hover:bg-white/20 flex items-center gap-1"
          >
            Explore Projects <span className="text-white/45">⌘P</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Time & Impact ------------------------------- */

const DAY = [
  0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 1.0, 0.1, 0.05, 0.05, 0.42, 0.38, 0.48, 0.1,
  0.5, 0.34, 0.12, 0.05, 0.62, 0.1, 0.96, 0.4, 0.05, 0.05, 0.52, 0.12, 0.6, 0.78,
];

const TICKS = 48;

export function TimePanel() {
  const ref = useStageEffect<HTMLDivElement>((el, s) => {
    const o = s.time;
    el.style.opacity = String(o);
    el.style.transform = `translate3d(${(1 - o) * -60}px,-50%,0)`;
    el.style.pointerEvents = o > 0.6 ? "auto" : "none";
    animateInner(el, o);
  });

  return (
    <div
      ref={ref}
      className="absolute left-[4vw] top-[50%] z-10 w-[min(92vw,380px)] opacity-0 will-change-transform lg:left-[5%]"
    >
      <div className="glass rounded-2xl p-4">
        <p className="mb-3 text-[11px] text-white/70 font-mono">System Throughput Today</p>
        <div className="flex h-24 items-end gap-[3px]">
          {DAY.map((v, i) => (
            <div
              key={i}
              data-bar
              className={`flex-1 origin-bottom rounded-[2px] ${
                i === DAY.length - 1 ? "bg-kin-lime" : v > 0.2 ? "bg-kin-lav" : "bg-white/15"
              }`}
              style={{ height: `${v * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-white/40 font-mono">
          {["6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "NOW"].map((t) => (
            <span key={t} className={t === "NOW" ? "font-semibold text-white/80" : ""}>
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-white/45 font-mono">
          <span data-count="3240" className="tabular-nums text-white/90">0</span> requests handled · 0 system failures
        </p>
      </div>

      <div className="glass mt-3 rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12px] font-medium text-white/90">Agentic Efficiency</span>
          <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] text-kin-lime font-mono">Autonomy · High</span>
        </div>
        <p className="flex items-baseline gap-0.5 text-white">
          <span data-count="76" className="text-3xl font-medium tabular-nums">0</span>
          <span className="text-sm text-white/60 font-mono">%</span>
        </p>
        <p className="mt-0.5 text-[10px] text-white/50 font-mono">routine workflow tasks automated</p>
        <div className="mt-3 flex h-4 items-end justify-between">
          {Array.from({ length: TICKS }).map((_, i) => {
            const f = i / TICKS;
            const color = f < 0.76 ? "bg-kin-lav" : f < 0.84 ? "bg-kin-lime" : "bg-white/20";
            return <span key={i} data-tick className={`block h-full w-px ${color}`} style={{ opacity: 0 }} />;
          })}
        </div>
        <p className="mt-2 text-[9px] text-white/40 font-mono">24ms average latency · Lagos, NG &amp; Global Edge</p>
      </div>
    </div>
  );
}
