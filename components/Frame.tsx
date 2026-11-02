"use client";

import PixelHeadline from "./PixelHeadline";
import PointCloud from "./PointCloud";
import { useStageEffect } from "@/lib/useStage";

/**
 * The black viewport the head lives in. It starts full-bleed, shrinks into a
 * rounded card, and expands back to full-bleed for the dissolve.
 */
export default function Frame() {
  const frameRef = useStageEffect<HTMLDivElement>((el, s) => {
    const f = s.frame;
    el.style.left = `${f.left}px`;
    el.style.top = `${f.top}px`;
    el.style.width = `${f.width}px`;
    el.style.height = `${f.height}px`;
    el.style.borderRadius = `${f.radius}px`;
    el.style.boxShadow =
      f.amount > 0.02
        ? `0 30px 80px rgba(20,16,40,${0.28 * f.amount}), 0 0 0 1px rgba(255,255,255,${0.05 * f.amount})`
        : "none";
  });

  const tagRef = useStageEffect<HTMLDivElement>((el, s) => {
    el.style.opacity = String(s.hero);
    el.style.transform = `translate3d(0,${-s.heroShift * 0.5}px,0)`;
  });

  const hintRef = useStageEffect<HTMLDivElement>((el, s) => {
    el.style.opacity = String(s.hero);
  });

  const capRef = useStageEffect<HTMLDivElement>((el, s) => {
    el.style.opacity = String(s.caption);
    el.style.transform = `translate3d(0,${(1 - s.caption) * 18}px,0)`;
    el.style.filter = s.caption < 0.98 ? `blur(${(1 - s.caption) * 8}px)` : "none";
  });

  return (
    <div
      ref={frameRef}
      className="absolute left-0 top-0 overflow-hidden bg-black will-change-[left,top,width,height]"
    >
      <PixelHeadline />
      <PointCloud />

      {/* hero tagline */}
      <div
        ref={tagRef}
        className="pointer-events-none absolute bottom-[6%] left-[4%] max-w-[26rem] will-change-transform"
      >
        <div className="mb-3 flex items-center gap-2 text-[10px] text-white/55">
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 text-white/80">
            <i className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            Available for hire
          </span>
          <span>Andrew Oche · Full-Stack &amp; AI</span>
        </div>
        <p className="text-[clamp(18px,1.7vw,28px)] font-medium leading-[1.18] tracking-tight text-white">
          Building intelligent, scalable systems —
          <br />
          from web products to
          <br />
          <span className="text-white/45">autonomous AI agents.</span>
        </p>
      </div>

      {/* scroll hint */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-[6%] right-[4%] hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 md:flex"
      >
        Scroll
        <span className="block h-8 w-px overflow-hidden bg-white/10">
          <span
            className="block h-full w-full bg-white/70"
            style={{ animation: "scrollLine 2s ease-in-out infinite" }}
          />
        </span>
      </div>

      {/* card caption */}
      <div
        ref={capRef}
        className="pointer-events-none absolute left-0 right-0 top-[8%] flex flex-col items-center opacity-0 px-4"
      >
        <span className="mb-4 flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[10px] text-white/80 backdrop-blur">
          <i className="h-1 w-1 rounded-full bg-emerald-400" />
          Andrew Oche // 2026
        </span>
        <h2 className="text-center text-[clamp(18px,2.1vw,34px)] font-medium leading-[1.15] tracking-tight text-white">
          High-fidelity systems,
          <br />
          <span className="text-white/45">where full-stack meets applied AI.</span>
        </h2>
      </div>
    </div>
  );
}

// Calibrated operator tagline and scroll indicator line
