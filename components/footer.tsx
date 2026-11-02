"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Download, 
  Heart, 
  Copy, 
  Check, 
  Terminal, 
  MapPin, 
  Radio, 
  ExternalLink,
  Sparkles,
  Zap
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-kin-lime/5 via-blue-500/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      {/* TOP STATEMENT CALLOUT */}
      <div className="max-w-7xl mx-auto mb-20 relative z-10">
        <div className="glass p-10 sm:p-14 rounded-3xl border border-white/10 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-kin-lime uppercase tracking-[0.4em]">
                <Sparkles size={14} />
                <span>Ready to deploy // High-Stakes Collaboration</span>
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none">
                LET&apos;S BUILD <br />
                <span className="text-white/30 not-italic">SOMETHING EXCEPTIONAL.</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono text-white/60 max-w-xl leading-relaxed pt-2">
                Available for contract sprints, AI agent integrations, and founding engineering leadership. Have an ambitious system in mind?
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="#hire"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-kin-lime text-black font-mono text-xs font-bold uppercase tracking-widest hover:brightness-95 transition-all shadow-[0_0_25px_rgba(230,244,60,0.35)] active:scale-[0.98]"
              >
                <span>Transmit Project Request</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs transition-all"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10 relative z-10">
        
        {/* BRANDING (4/12) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black italic tracking-tight text-white uppercase">
              ANDREW_OCHE<span className="text-kin-lime">.SYS</span>
            </span>
          </div>
          <p className="text-xs font-mono text-white/60 leading-relaxed max-w-sm">
            Full-Stack &amp; AI Engineer. Architecting production Next.js ecosystems, autonomous agent workflows with LangGraph, and scalable machine intelligence.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <a
              href="/Adakole_Andrew_Oche_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all"
            >
              <Download size={13} className="text-kin-lime" />
              <span>Download CV</span>
            </a>

            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 font-mono text-xs transition-all"
            >
              <Heart size={13} className="text-purple-400 fill-purple-400" />
              <span>Tip on MyHappr</span>
            </Link>
          </div>
        </div>

        {/* NAVIGATION DIRECTORY (3/12) */}
        <div className="lg:col-span-3 space-y-3 font-mono text-xs">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
            // System Directory
          </p>
          <ul className="space-y-2">
            {[
              { label: "Active Production Nodes", href: "#projects" },
              { label: "Tech Capability Matrix", href: "#skills" },
              { label: "Modular Services", href: "#services" },
              { label: "Operator Dossier", href: "#about" },
              { label: "Transmit Project", href: "#hire" },
            ].map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className="text-white/70 hover:text-kin-lime hover:translate-x-1 transition-all inline-block"
                >
                  → {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* DOMAINS & SPECIALIZATION (2/12) */}
        <div className="lg:col-span-2 space-y-3 font-mono text-xs">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
            // Specialization
          </p>
          <ul className="space-y-2 text-white/50 text-[11px]">
            <li>Agentic AI Workflows</li>
            <li>Full-Stack Next.js 16</li>
            <li>ML &amp; PyTorch Pipelines</li>
            <li>Native React Native</li>
            <li>Thecla Startup Engine</li>
          </ul>
        </div>

        {/* SOCIAL CHANNELS & TELEMETRY (3/12) */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
            // Direct Networks
          </p>
          
          <div className="flex flex-wrap gap-2">
            <SocialIcon url="https://linkedin.com" label="LinkedIn" href="https://www.linkedin.com/in/andrew-adakole-63462227a" target="_blank" />
            <SocialIcon url="https://github.com" label="GitHub" href="https://github.com/andrewanuga" target="_blank" />
            <SocialIcon url="https://twitter.com" label="Twitter / X" href="https://x.com/adakole56andrew" target="_blank" />
            <SocialIcon url="https://instagram.com" label="Instagram" href="https://www.instagram.com/andrew_phiip_neri/" target="_blank" />
          </div>

          {/* TELEMETRY BOX */}
          <div className="glass p-3 rounded-xl border border-white/5 font-mono text-[10px] space-y-1.5 text-white/50">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-white/70">
                <MapPin size={11} className="text-kin-lime" />
                Lagos, NG
              </span>
              <span className="text-emerald-400 font-bold">● ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-white/40">
              <span>LOCAL TIME</span>
              <span className="font-bold text-white tabular-nums">{lagosTime} WAT</span>
            </div>
            <div className="flex items-center justify-between text-white/40">
              <span>LATENCY</span>
              <span className="text-kin-lime">24ms // STABLE</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM LEGAL BAR */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[10px] text-white/40 relative z-10">
        <div>
          <span>&copy; {new Date().getFullYear()} ANDREW ADAKOLE OCHE. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline">ENCRYPTED // TLS 1.3 PROTOCOL</span>
          
          {/* RETURN TO TOP BUTTON */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/60 hover:text-kin-lime transition-colors uppercase tracking-wider group"
          >
            <span>Return To Origin</span>
            <div className="p-1 rounded bg-white/10 group-hover:bg-kin-lime group-hover:text-black transition-all">
              <ArrowUpRight size={13} className="-rotate-45" />
            </div>
          </button>
        </div>
      </div>

    </footer>
  );
}
