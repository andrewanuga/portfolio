"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "LOADING_HARDWARE_LOGIC...",
  "FETCHING_THECLA_PROTOCOLS...",
  "MOUNTING_NEXTJS_V15...",
  "ESTABLISHING_STABLE_LINK...",
  "SYSTEM_READY ✓",
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [status, setStatus] = useState("INITIALIZING_CORE...");
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 1;
      });
    }, 30);

    // Step labels
    const timers = STEPS.map((step, i) =>
      setTimeout(() => setStatus(step), i * 800)
    );

    // Trigger exit
    const exit = setTimeout(() => setExiting(true), 3200);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
      clearTimeout(exit);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Shutter top */}
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#0d0d0d] border-b border-white/5 z-20"
          />
          {/* Shutter bottom */}
          <motion.div
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0d0d0d] border-t border-white/5 z-20"
          />

          {/* Ambient glow */}
          <div className="absolute w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full z-10 animate-pulse" />

          {/* Interface card */}
          <motion.div
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="relative z-30 w-full max-w-[380px] mx-6 bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-10 overflow-hidden"
          >
            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
              }}
            />

            {/* Corner accents */}
            {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r",
              "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((c, i) => (
              <div key={i} className={`absolute w-3 h-3 ${c} border-blue-600/30`} />
            ))}

            {/* Top bar */}
            <div className="flex items-center justify-between mb-10">
              <span className="w-[6px] h-[6px] rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6] animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.22em] text-white/20 uppercase">
                SYS // BOOT_SEQUENCE
              </span>
              <span className="w-[6px] h-[6px] rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6] animate-pulse" />
            </div>

            {/* Name */}
            <div className="mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-white font-black italic tracking-tighter text-2xl"
              >
                ANDREW_OCHE <span className="text-blue-500">.SYS</span>
              </motion.h2>
              <div className="h-px mt-3 bg-gradient-to-r from-transparent via-white/6 to-transparent" />
            </div>

            {/* Progress */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
                <span>{status}</span>
                <span className="text-blue-500 font-bold">{progress}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/4 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.04 }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                />
              </div>
            </div>

            {/* Footer */}
            <p className="font-mono text-[8px] text-white/10 uppercase tracking-widest text-center mt-6">
              SECURED_PROTOCOL // ENCRYPTED_ENTRY
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}