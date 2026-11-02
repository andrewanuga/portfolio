"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Download, 
  Code, 
  Cpu, 
  Database, 
  Microscope, 
  Bot, 
  ShieldCheck, 
  Terminal, 
  MapPin, 
  Award,
  GraduationCap,
  Rocket,
  CheckCircle2
} from "lucide-react";

type Milestone = {
  year: string;
  role: string;
  org: string;
  detail: string;
  icon: any;
  accent: string;
};

const TIMELINE: Milestone[] = [
  { 
    year: "SINCE 2023", 
    role: "Full-Stack Web Developer", 
    org: "Independent / Contract",
    detail: "4+ years of production experience architecting scalable Next.js, Node.js, and TypeScript ecosystems with zero-downtime reliability.",
    icon: Code,
    accent: "#00f2fe"
  },
  { 
    year: "2026", 
    role: "AI & Machine Learning Engineer", 
    org: "Applied Intelligence",
    detail: "Designing end-to-end ML training pipelines, custom vector search embeddings, and inference optimization with Python, PyTorch & TensorFlow.",
    icon: Cpu,
    accent: "#c471ed"
  },
  { 
    year: "2026", 
    role: "Agentic AI Systems Architect", 
    org: "Autonomous Systems",
    detail: "Pioneering stateful multi-agent workflows using LangGraph, autonomous tool execution, and real-time retrieval-augmented generation (RAG).",
    icon: Bot,
    accent: "#e6f43c"
  },
  { 
    year: "2026", 
    role: "Cross-Platform Mobile Engineer", 
    org: "Mobile Native",
    detail: "Engineering native performance iOS and Android applications with React Native, Expo, and offline-first cloud synchronization.",
    icon: Rocket,
    accent: "#ff5858"
  },
  { 
    year: "2026", 
    role: "Founder & Chief Architect", 
    org: "Thecla",
    detail: "Building Thecla from the ground up: creating an autonomous engineering system that accelerates product lifecycles.",
    icon: ShieldCheck,
    accent: "#38ef7d"
  },
  { 
    year: "2023 — 2027", 
    role: "B.Eng. Electrical Engineering", 
    org: "Federal University of Technology Akure (FUTA)",
    detail: "Rigorous mathematical foundation covering digital signal processing, matrix transforms, embedded logic, and computational engineering.",
    icon: GraduationCap,
    accent: "#38bdf8"
  },
];

const METRICS = [
  { label: "Engineering Experience", value: "4+", unit: "Years" },
  { label: "Production Models & Agents", value: "12+", unit: "Shipped" },
  { label: "Production Git Commits", value: "1,200+", unit: "Commits" },
  { label: "Code Integrity", value: "100%", unit: "Type-Safe" },
];

export default function BioSection() {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  return (
    <section id="about" className="relative min-h-screen w-full bg-[#050506] py-28 px-6 md:px-14 border-t border-white/10">
      
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] mb-3">
              <Microscope className="text-kin-lime" size={14} />
              <span>Dossier: Biography &amp; Background</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
              MY <span className="text-white/30 not-italic">BIO.</span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-white/60">
            <p className="text-kin-lime mb-1 flex items-center gap-1.5 font-bold">
              <span className="h-2 w-2 rounded-full bg-kin-lime animate-pulse" />
              Andrew Oche // Identity
            </p>
            <p>
              Full-Stack &amp; AI Engineer living at the bridge between clean architectures, pixel-perfect user experiences, and scalable machine intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN DOSSIER GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT COLUMN: OPERATOR PROFILE CARD (4/12) */}
        <div className="lg:col-span-4 flex flex-col justify-between glass p-7 rounded-2xl border border-white/10 shadow-2xl space-y-6">
          <div>
            {/* PHOTO VIEWFINDER */}
            <div className="relative aspect-[1.05] w-full rounded-xl overflow-hidden bg-[#0d0d14] border border-white/10 group mb-6">
              <Image
                src="/my-photo.png"
                alt="Andrew Oche"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* CORNER TARGETS */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-kin-lime" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-kin-lime" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-kin-lime" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-kin-lime" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono px-2.5 py-1.5 rounded-md bg-black/70 backdrop-blur border border-white/10">
                <span className="flex items-center gap-1.5 text-white/90 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ANDREW OCHE
                </span>
                <span className="text-kin-lime">SYS_VERIFIED</span>
              </div>
            </div>

            {/* IDENTITY METADATA */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">PRIMARY_ROLE</span>
                <span className="text-white font-bold text-right">Full-Stack &amp; AI Engineer</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">LOCATION</span>
                <span className="text-white/80 flex items-center gap-1">
                  <MapPin size={11} className="text-kin-lime" />
                  Lagos, Nigeria (NG)
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">STARTUP</span>
                <span className="text-kin-lime font-bold">Founder @ Thecla</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">EDUCATION</span>
                <span className="text-white/80">Electrical Eng. (FUTA)</span>
              </div>
            </div>
          </div>

          {/* CV DOWNLOAD MODULE */}
          <div className="pt-4 border-t border-white/10">
            <a
              href="/Adakole_Andrew_Oche_Resume.pdf"
              download
              className="flex items-center justify-between p-4 rounded-xl bg-kin-lime text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-95 transition-all shadow-[0_0_20px_rgba(230,244,60,0.3)] group"
            >
              <div>
                <p className="text-[8px] opacity-70">CONFIRMED DOSSIER</p>
                <p className="text-sm italic">Download Resume</p>
              </div>
              <div className="p-2 rounded-lg bg-black text-kin-lime group-hover:scale-105 transition-transform">
                <Download size={16} />
              </div>
            </a>
          </div>
        </div>

        {/* CENTER & RIGHT COLUMN: PHILOSOPHY & TIMELINE (8/12) */}
        <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
          
          {/* PHILOSOPHY STATEMENT */}
          <div className="glass p-8 sm:p-10 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/5 select-none font-black text-8xl italic pointer-events-none">
              &ldquo;
            </div>

            <p className="text-xl sm:text-2xl font-light text-white leading-relaxed mb-6">
              &ldquo;Building <span className="text-kin-lime font-bold italic">high-fidelity</span> systems where full-stack engineering meets applied AI — every component with a purpose, every signal reaching the user with zero noise.&rdquo;
            </p>

            <div className="space-y-4 text-xs sm:text-sm font-mono text-white/70 leading-relaxed">
              <p>
                I&apos;m a Full-Stack &amp; AI Engineer who lives at the bridge between a messy database, a pixel-perfect UI, and a model that actually ships. To me, engineering isn&apos;t just about making things work — it&apos;s about making them work well for the people using them.
              </p>
              <p>
                Day to day I architect scalable web platforms with Next.js, Node and TypeScript, and design ML pipelines and agentic AI systems with Python, PyTorch and LLMs — RAG, tool-using agents and autonomous workflows.
              </p>
              <p>
                I believe in clean code, honest communication, and the idea that the best solution is usually the simplest one. Currently building <span className="text-kin-lime font-bold">Thecla</span>.
              </p>
            </div>

            {/* KEY METRICS ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
              {METRICS.map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-white/5 border border-white/5 font-mono">
                  <p className="text-2xl font-black text-white italic tracking-tight">
                    {m.value}
                  </p>
                  <p className="text-[10px] text-kin-lime font-bold uppercase">{m.unit}</p>
                  <p className="text-[9px] text-white/40 mt-1 leading-tight">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* INTERACTIVE TIMELINE / CAREER STAGES */}
          <div className="glass p-8 sm:p-10 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-widest">
                <Terminal size={14} className="text-kin-lime" />
                <span>Lifecycle_Events // Milestones</span>
              </div>
              <span className="text-[9px] font-mono text-white/40">Interactive Trajectory</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TIMELINE.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = selectedMilestone === idx;

                return (
                  <div
                    key={item.role}
                    onClick={() => setSelectedMilestone(idx)}
                    className="p-4 rounded-xl cursor-pointer transition-all duration-300 relative border group"
                    style={{
                      backgroundColor: isSelected ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.02)",
                      borderColor: isSelected ? item.accent : "rgba(255, 255, 255, 0.08)",
                      boxShadow: isSelected ? `0 0 20px ${item.accent}20` : "none"
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span 
                        className="text-[9px] font-mono px-2 py-0.5 rounded font-bold"
                        style={{
                          backgroundColor: `${item.accent}15`,
                          color: item.accent,
                          border: `1px solid ${item.accent}30`
                        }}
                      >
                        {item.year}
                      </span>
                      <div 
                        className="p-1.5 rounded-lg"
                        style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
                      >
                        <Icon size={14} />
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-white">
                      {item.role}
                    </h4>
                    <p className="text-[10px] font-mono text-white/50 mb-2">
                      {item.org}
                    </p>
                    <p className="text-[11px] font-mono text-white/70 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
