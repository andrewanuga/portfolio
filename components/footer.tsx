"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Download, 
  Heart, 
  Copy, 
  Check, 
  MapPin, 
  Sparkles
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
      } catch (e) {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#030305] border-t border-white/10 pt-28 pb-14 px-6 md:px-14 overflow-hidden text-white">
      
      {/* BACKGROUND AMBIENT GRADIENT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      {/* TOP STATEMENT CALLOUT */}
      <div className="max-w-6xl mx-auto mb-20 relative z-10">
        <div className="p-10 sm:p-14 rounded-3xl border border-white/10 relative overflow-hidden bg-[#090b12] shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for New Projects</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                LET&apos;S BUILD <br />
                <span className="text-white/30 font-light">SOMETHING EXCEPTIONAL.</span>
              </h2>
              <p className="text-sm text-white/60 max-w-xl leading-relaxed">
                Available for freelance projects, full-stack development sprints, and AI engineering roles. Have an ambitious idea? Let&apos;s talk.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="#hire"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.98]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-all"
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
        </div>
      </div>

      {/* DIRECTORY COLUMNS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10 relative z-10">
        
        {/* BRANDING (4/12) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Andrew Oche
          </h3>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm">
            Full-Stack Developer &amp; AI Engineer. Crafting modern web applications, intelligent automation, and mobile experiences with clean code.
          </p>

          <div className="flex items-center gap-2 pt-2">
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
              <span>Support MY Work</span>
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

        {/* SPECIALIZATION (2/12) */}
        <div className="lg:col-span-2 space-y-3">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
            Expertise
          </p>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>Next.js &amp; React</li>
            <li>TypeScript</li>
            <li>AI &amp; Machine Learning</li>
            <li>AI Agents &amp; LangGraph</li>
            <li>React Native Mobile</li>
          </ul>
        </div>

        {/* SOCIAL CHANNELS & TELEMETRY (3/12) */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
            Connect
          </p>
          
          <div className="flex flex-wrap gap-2">
            <SocialIcon url="https://linkedin.com" label="LinkedIn" href="https://www.linkedin.com/in/andrew-adakole-63462227a" target="_blank" />
            <SocialIcon url="https://github.com" label="GitHub" href="https://github.com/andrewanuga" target="_blank" />
            <SocialIcon url="https://twitter.com" label="Twitter / X" href="https://x.com/adakole56andrew" target="_blank" />
            <SocialIcon url="https://instagram.com" label="Instagram" href="https://www.instagram.com/andrew_phiip_neri/" target="_blank" />
          </div>

          {/* LOCATION STATUS BOX */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs space-y-2 text-white/60">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-white/80">
                <MapPin size={13} className="text-blue-400" />
                Lagos, Nigeria
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
            <div className="flex items-center justify-between text-white/40 pt-1 border-t border-white/5">
              <span>Local Time</span>
              <span className="font-semibold text-white tabular-nums">{lagosTime} WAT</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM LEGAL & SCROLL TO TOP */}
      <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 relative z-10">
        <div>
          &copy; {new Date().getFullYear()} Andrew Oche. All rights reserved.
        </div>

        <button
          onClick={scrollToTop}
          className="hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
        >
          <span>Back to Top</span>
          <span>↑</span>
        </button>
      </div>

    </footer>
  );
}
