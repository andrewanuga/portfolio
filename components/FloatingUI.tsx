"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import { clamp, ease } from "@/lib/stage";
import { useStageEffect } from "@/lib/useStage";

const PROMPT = "Deploy autonomous agentic pipeline for Thecla";

/** Wraps a floating piece: staggered fly-in, blur-in, and fade-out on exit. */
function Reveal({
  i,
  className,
  children,
  bob = 0,
}: {
  i: number;
  className: string;
  children: ReactNode;
  bob?: number;
}) {
  const ref = useStageEffect<HTMLDivElement>((el, s) => {
    const a = ease(clamp((s.float - i * 0.09) / 0.55));
    const o = a * (1 - s.floatOut);
    el.style.opacity = String(o);
    el.style.transform = `translate3d(0,${(1 - a) * 28 - s.floatOut * 10}px,0) scale(${0.94 + 0.06 * a})`;
    el.style.filter = o < 0.98 ? `blur(${(1 - o) * 8}px)` : "none";
    el.style.pointerEvents = o > 0.5 ? "auto" : "none";
  });

  return (
    <div ref={ref} className={`absolute opacity-0 will-change-transform ${className}`}>
      <div className="animate-float" style={{ animationDelay: `${bob}s` }}>
        {children}
      </div>
    </div>
  );
}

export default function FloatingUI() {
  const typedRef = useStageEffect<HTMLSpanElement>((el, s) => {
    const n = Math.floor(clamp(s.typed) * PROMPT.length);
    const txt = PROMPT.slice(0, n);
    if (el.textContent !== txt) el.textContent = txt;
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-10 [&>*]:pointer-events-auto">
      {/* Profile / Operator */}
      <Reveal i={0} bob={0} className="left-[9%] top-[22%] hidden w-[13vw] min-w-[150px] max-w-[210px] lg:block">
        <div className="glass overflow-hidden rounded-2xl p-2">
          <div className="relative aspect-[1.1] overflow-hidden rounded-xl bg-zinc-900">
            <Image
              src="/my-photo.png"
              alt="Andrew Oche"
              fill
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[9px] font-mono text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Andrew Oche
            </div>
          </div>
          <div className="flex items-center justify-between px-1.5 pb-0.5 pt-2 text-[10px] text-white/70">
            <span>Engineer</span>
            <span className="text-[9px] font-semibold text-blue-400">Lagos, NG</span>
          </div>
        </div>
      </Reveal>

      {/* Quick Spec Badge */}
      <Reveal i={1} bob={0.8} className="left-[4.5%] top-[50%] hidden lg:block">
        <div className="glass flex items-center gap-3 rounded-xl px-3 py-2 text-[11px] text-white/85">
          <span>AI / ML Engineer</span>
          <span className="flex h-5 items-center justify-center rounded-md bg-white/15 px-1.5 text-[9px] font-mono text-kin-lime">
            PyTorch
          </span>
        </div>
      </Reveal>

      {/* Featured Node */}
      <Reveal i={2} bob={1.6} className="left-[13.5%] top-[52%] hidden w-[12vw] min-w-[150px] max-w-[200px] lg:block">
        <div className="glass overflow-hidden rounded-2xl p-2.5">
          <div className="flex items-center justify-between text-[10px] text-white/80 pb-2 border-b border-white/10">
            <span className="text-blue-400 font-semibold">Socially AI</span>
            <span className="text-[8px] text-white/50">Featured</span>
          </div>
          <p className="pt-2 text-[10px] text-white/70 leading-tight">
            AI content creation &amp; social media automation
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[9px] text-white/40">
            <span>Next.js &amp; OpenAI</span>
            <span className="text-emerald-400 font-medium">LIVE</span>
          </div>
        </div>
      </Reveal>

      {/* Action chips */}
      <Reveal i={3} bob={0.4} className="left-[60%] top-[23%] hidden lg:block">
        <div className="glass flex items-center gap-1 rounded-xl p-1 text-[10px] text-white/80">
          <span className="rounded-md px-2 py-1">
            Agentic AI <span className="text-white/45">LangGraph</span>
          </span>
          <span className="rounded-md bg-[#5f86d9]/70 px-2 py-1 text-white">
            Full-Stack <span className="text-white/80">Next.js</span>
          </span>
          <span className="rounded-md px-2 py-1">
            Founder <span className="text-white/45">Thecla</span>
          </span>
        </div>
      </Reveal>

      {/* Focus / Velocity chart */}
      <Reveal i={4} bob={2.2} className="left-[73.5%] top-[33%] hidden w-[17vw] min-w-[180px] max-w-[260px] lg:block">
        <div className="glass rounded-2xl p-3">
          <div className="mb-3 flex items-center justify-between text-[10px] text-white/80">
            <span>Velocity this sprint</span>
            <span className="rounded bg-[#5f86d9]/70 px-1.5 py-0.5 text-[9px] text-white">+18%</span>
          </div>
          <div className="flex h-16 items-end justify-between gap-1.5">
            {[0.55, 0.72, 0.45, 0.6, 0.85, 0.7, 0.88].map((v, i, arr) => (
              <div
                key={i}
                className={`flex-1 rounded-[3px] ${i === arr.length - 1 ? "bg-kin-lime" : "bg-kin-lav"}`}
                style={{ height: `${v * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[8px] text-white/35">
            <span>Thu</span>
            <span>Now</span>
          </div>
        </div>
      </Reveal>

      {/* Toast */}
      <Reveal i={5} bob={1.1} className="left-[69.5%] top-[68%] hidden lg:block">
        <div className="glass flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-[10px] text-white/80">
          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold shadow-[0_0_10px_rgba(37,99,235,0.4)]">
            ✓
          </span>
          <span>Ready for hire · Response in &lt; 1 hr</span>
        </div>
      </Reveal>

      {/* Prompt box */}
      <Reveal i={6} bob={0.2} className="left-[5vw] right-[5vw] top-[76%] lg:left-[28%] lg:right-auto lg:w-[44%]">
        <div className="glass rounded-2xl p-3.5 text-white">
          <p className="min-h-[1.5rem] text-[clamp(12px,1.05vw,15px)] text-white/90 font-mono">
            <span ref={typedRef} />
            <span className="ml-px inline-block h-[1.05em] w-px translate-y-[2px] animate-blink bg-blue-500" />
          </p>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-white/70">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-sm leading-none text-blue-400 font-mono">
              &gt;
            </span>
            <span className="rounded-md bg-white/10 px-2 py-1">LLMs</span>
            <span className="rounded-md bg-white/10 px-2 py-1">Next.js 16</span>
            <span className="rounded-md bg-white/10 px-2 py-1">PyTorch</span>
            <span className="flex-1" />
            <span className="text-[9px] font-mono text-white/40 hidden sm:inline">Ctrl + Enter</span>
            <a
              href="#hire"
              aria-label="Send"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white transition hover:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.45)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
