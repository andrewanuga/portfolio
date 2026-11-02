"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ArrowUpRight, 
  Download, 
  Heart, 
  Copy, 
  Check, 
  MapPin 
} from "lucide-react";
import { SocialIcon } from "react-social-icons";

function useLagosClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      try {
        const d = new Date();
        const lagosTime = d.toLocaleTimeString("en-GB", {
          timeZone: "Africa/Lagos",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setTime(lagosTime);
      } catch {
        const d = new Date();
        setTime(d.toTimeString().split(" ")[0]);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function FooterSection() {
  const lagosTime = useLagosClock();
  const [copied, setCopied] = useState(false);
  const email = "adakole56andrew@gmail.com";

  // Scroll-driven scale animation for the "Available for New Projects" card
  const calloutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: calloutRef,
    offset: ["start end", "end start"],
  });

  // Scales from 60% (0.6) as it enters, to 100% (1.0), and back to 60% as it leaves
  const rawScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.6, 1, 1, 0.6]);
  const scale = useSpring(rawScale, { stiffness: 220, damping: 26, mass: 0.5 });
  
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.6]);
  const opacity = useSpring(rawOpacity, { stiffness: 220, damping: 26, mass: 0.5 });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#030305] border-t border-white/10 overflow-hidden text-white rounded-t-[40px] sm:rounded-t-[56px] md:rounded-t-[64px] shadow-[0_-25px_60px_rgba(0,0,0,0.6)] relative z-40 -mt-8 sm:-mt-12">
      
      {/* BACKGROUND AMBIENT GRADIENT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      {/* TOP STATEMENT CALLOUT WITH SCROLL SCALE ANIMATION (FULL VIEWPORT HEIGHT CARD) */}
      <div ref={calloutRef} className="max-w-6xl mx-auto px-4 sm:px-6 my-16 sm:my-24 relative z-10 flex justify-center">
        <motion.div 
          style={{ scale, opacity }}
          className="w-full h-dvh min-h-[580px] max-h-[920px] origin-center p-8 sm:p-12 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden bg-[#090b12] shadow-2xl hover:border-blue-500/30 transition-colors flex flex-col justify-between"
        >
          {/* Subtle Ambient Backlight inside the Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

          {/* TOP BAR: Status & Timezone */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for New Projects</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1.5 text-white/70">
                <MapPin size={13} className="text-blue-400" />
                <span>Lagos, Nigeria</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-white/80">{lagosTime} (WAT)</span>
            </div>
          </div>

          {/* CENTER HERO AREA: Large Statement & Action CTAs */}
          <div className="relative z-10 my-auto py-8 text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-block text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
              Got an Ambitious Vision?
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              LET&apos;S BUILD <br />
              <span className="text-white/30 font-light">SOMETHING EXCEPTIONAL.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
              Available for freelance engineering, full-stack product sprints, and AI system architecture. Let&apos;s build software that makes an impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#hire"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={copyToClipboard}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-white/60" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* BOTTOM HIGHLIGHTS ROW: Value Pillars */}
          <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">01 / High Velocity</span>
              <p className="text-xs text-white/60">Rapid delivery from concept to production launch.</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">02 / Full Ownership</span>
              <p className="text-xs text-white/60">System architecture, backend APIs, and sleek UI polish.</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">03 / Global Remote</span>
              <p className="text-xs text-white/60">Seamless asynchronous collaboration across timezones.</p>
            </div>
          </div>

        </motion.div>
      </div>

      {/* DIRECTORY COLUMNS */}
      <div className="max-w-6xl pt-10 pb-14 px-6 md:px-14 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/10 relative z-10">
        
        {/* BRANDING (5/12) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Andrew Oche
          </h3>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm">
            Full-Stack Developer &amp; AI Engineer. Crafting modern web applications, intelligent automation, and mobile experiences with clean code.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="/Adakole_Andrew_Oche_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
            >
              <Download size={13} className="text-blue-400" />
              <span>Resume</span>
            </a>

            <Link
              href="https://myhappr.com/andrew_the_dev"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-xs font-semibold transition-all"
            >
              <span>Support My Work</span>
              <Heart size={13} className="text-purple-400 fill-purple-400" />
            </Link>
          </div>
        </div>

        {/* NAVIGATION DIRECTORY (3/12) */}
        <div className="lg:col-span-3 space-y-3">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
            Navigation
          </p>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Featured Projects", href: "#projects" },
              { label: "Skills & Technologies", href: "#skills" },
              { label: "Services & Solutions", href: "#services" },
              { label: "About Me", href: "#about" },
              { label: "Contact", href: "#hire" },
            ].map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className="text-white/70 hover:text-blue-400 transition-colors inline-block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL CHANNELS (4/12) */}
        <div className="lg:col-span-4 space-y-4">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
            Connect
          </p>
          
          <div className="flex flex-wrap gap-2">
            <SocialIcon url="https://linkedin.com" label="LinkedIn" href="https://www.linkedin.com/in/andrew-adakole-63462227a" target="_blank" />
            <SocialIcon url="https://github.com" label="GitHub" href="https://github.com/andrewanuga" target="_blank" />
            <SocialIcon url="https://twitter.com" label="Twitter / X" href="https://x.com/adakole56andrew" target="_blank" />
            <SocialIcon url="https://instagram.com" label="Instagram" href="https://www.instagram.com/andrew_phiip_neri/" target="_blank" />
          </div>
        </div>

      </div>

      {/* MASSIVE "ANDREW" WATERMARK / DISPLAY TITLE */}
      <div className="w-full overflow-hidden select-none pointer-events-none pt-10 sm:pt-14 pb-4 text-center">
        <h1 className="text-[19vw] sm:text-[21vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent uppercase">
          ANDREW
        </h1>
      </div>

      {/* BOTTOM LEGAL & SCROLL TO TOP */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 pt-4 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 relative z-10 border-t border-white/5">
        <div>
          &copy; {new Date().getFullYear()} Andrew Oche. All rights reserved.
        </div>

        <button
          onClick={scrollToTop}
          className="hover:text-blue-400 transition-colors flex items-center gap-1 font-medium cursor-pointer"
        >
          <span>Back to Top</span>
          <span>↑</span>
        </button>
      </div>

    </footer>
  );
}
