"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_PHRASES = [
  "Curating digital experiences...",
  "Loading interactive 3D stage...",
  "Fine-tuning interface details...",
  "Welcome."
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // 1.6s smooth duration

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) setPhraseIdx(0);
      else if (pct < 65) setPhraseIdx(1);
      else if (pct < 95) setPhraseIdx(2);
      else setPhraseIdx(3);

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setExiting(true);
        }, 150);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col justify-between p-8 sm:p-14 bg-[#050506] text-white overflow-hidden pointer-events-auto"
        >
          {/* AMBIENT BACKGROUND GLOW */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />

          {/* TOP BAR */}
          <div className="relative z-10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold text-blue-400 uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Andrew Oche</span>
            </div>
            <span className="text-white/40 uppercase tracking-widest font-mono text-[11px]">
              Portfolio // 2026
            </span>
          </div>

          {/* CENTER DISPLAY AREA */}
          <div className="relative z-10 max-w-xl mx-auto w-full text-center space-y-6">
            <div className="space-y-2">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none"
              >
                ANDREW <span className="text-white/30 font-light">OCHE.</span>
              </motion.h2>
              <p className="text-sm sm:text-base text-white/50 font-medium">
                Full-Stack Developer &amp; AI Engineer
              </p>
            </div>

            {/* PROGRESS BAR & PERCENTAGE */}
            <div className="pt-6 space-y-3">
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-75"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/40">
                <span className="text-blue-400/90 font-medium text-[13px]">
                  {LOADING_PHRASES[phraseIdx]}
                </span>
                <span className="text-white font-mono font-bold text-sm">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-white/30 uppercase tracking-widest">
            <span>Crafting Digital Products</span>
            <span>Worldwide Remote</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
