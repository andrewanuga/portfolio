"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  ExternalLink, 
  GitBranch, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Terminal, 
  Sparkles,
  Layers
} from "lucide-react";

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  status: string;
  image?: string;
  accent: string;
  customVisual?: string;
};

const PROJECTS: Project[] = [
  {
    id: "NODE_01",
    index: "01",
    title: "SOCIALLY_AI",
    tagline: "Neural Social Orchestration Engine",
    description: "Autonomous content lifecycle platform powered by generative AI. Analyzes engagement latency, generates viral multi-format content, and synchronizes real-time distribution via Supabase & OpenAI.",
    tech: ["Next.js 15", "TypeScript", "OpenAI API", "PostgreSQL", "Supabase", "TailwindCSS"],
    link: "https://github.com/andrewanuga/Socially",
    github: "https://github.com/andrewanuga/Socially",
    status: "OPERATIONAL",
    accent: "#e6f43c",
    customVisual: "socially"
  },
  {
    id: "NODE_02",
    index: "02",
    title: "AURAX_COMMERCE",
    tagline: "High-Throughput Commerce Engine",
    description: "Enterprise e-commerce architecture engineered for instantaneous inventory synchronization, resilient Stripe payment tunneling, and fluid sub-second UI interactions.",
    tech: ["React", "Next.js", "Stripe SDK", "MongoDB", "Node.js"],
    link: "https://aurax-henna.vercel.app/",
    github: "https://github.com/andrewanuga/Aurax",
    status: "LIVE_STABLE",
    image: "/aurax.png",
    accent: "#38bdf8"
  },
  {
    id: "NODE_03",
    index: "03",
    title: "JOHHTECH_ACADEMIC",
    tagline: "Decentralized Academic Knowledge Hub",
    description: "High-availability educational portal engineered for university collaboration, distributed learning protocols, and collaborative student research repositories.",
    tech: ["TypeScript", "Next.js", "Prisma ORM", "PostgreSQL", "Supabase"],
    link: "https://johh-tech-academic.vercel.app",
    github: "https://github.com/andrewanuga/JohhTechAcademic",
    status: "OPERATIONAL",
    image: "/john_academy.png",
    accent: "#a855f7"
  },
  {
    id: "NODE_04",
    index: "04",
    title: "VAULTFLOW_SaaS",
    tagline: "Enterprise Fiscal Dashboard",
    description: "Real-time telemetry dashboard designed for high-density fiscal visualization, predictive revenue modeling, and complex transactional streaming.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Recharts", "Auth.js"],
    link: "https://github.com/andrewanuga/vaultflow",
    github: "https://github.com/andrewanuga/vaultflow",
    status: "PRODUCTION",
    accent: "#10b981",
    customVisual: "vaultflow"
  },
  {
    id: "NODE_05",
    index: "05",
    title: "NEXUS_WEB3",
    tagline: "Decentralized Frontier Interface",
    description: "Decentralized identity visualization engine featuring interactive WebGL/Three.js interaction shaders and cryptographic wallet tunneling protocols.",
    tech: ["Web3.js", "Three.js", "TailwindCSS", "Next.js"],
    link: "https://nexus-beta-gold.vercel.app/",
    github: "https://github.com/andrewanuga/nexus",
    status: "LIVE_STABLE",
    image: "/nexus.png",
    accent: "#f43f5e"
  },
  {
    id: "NODE_06",
    index: "06",
    title: "LUMIERE_PORTFOLIO",
    tagline: "High-Performance Editorial Showcase",
    description: "Editorial photography and media distribution architecture optimized for buttery layout typography, responsive image decoding, and zero-jank media panning.",
    tech: ["Next.js", "GSAP", "Radix UI", "Lucide"],
    link: "https://lumiere-nu-nine.vercel.app/",
    github: "https://github.com/andrewanuga/lumiere",
    status: "OPERATIONAL",
    image: "/lumiere.png",
    accent: "#d6c2f6"
  }
];

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] rounded-xl overflow-hidden bg-[#0d0d12] border border-white/10 group-hover:border-white/20 transition-all">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur border border-white/10 text-[9px] font-mono text-white/80">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
          <span>PREVIEW // LIVE</span>
        </div>
      </div>
    );
  }

  if (project.customVisual === "socially") {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] rounded-xl overflow-hidden bg-gradient-to-br from-[#12111c] via-[#090812] to-black border border-white/10 p-6 flex flex-col justify-between group-hover:border-[#e6f43c]/30 transition-all">
        <div className="flex items-center justify-between font-mono text-[9px] text-white/50">
          <span className="flex items-center gap-1.5 text-kin-lime">
            <Sparkles size={11} /> AI_ORCHESTRATOR
          </span>
          <span>LATENCY // 18ms</span>
        </div>

        {/* Visual Mock Graph */}
        <div className="space-y-3 my-auto">
          <div className="glass p-3 rounded-lg border border-white/10">
            <div className="flex justify-between items-center text-[10px] text-white/80 font-mono mb-2">
              <span>Viral Hook Generator</span>
              <span className="text-kin-lime font-bold">98.4% Match</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-kin-lav to-kin-lime rounded-full w-[85%]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <p className="text-[8px] text-white/40">OpenAI</p>
              <p className="text-[11px] font-bold text-white">GPT-4o</p>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <p className="text-[8px] text-white/40">Database</p>
              <p className="text-[11px] font-bold text-white">PostgreSQL</p>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <p className="text-[8px] text-white/40">Uptime</p>
              <p className="text-[11px] font-bold text-emerald-400">99.98%</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-2 border-t border-white/10">
          <span>PIPELINE: ACTIVE</span>
          <span className="text-kin-lime">AUTONOMOUS</span>
        </div>
      </div>
    );
  }

  // Vaultflow custom visual
  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0c1a17] via-[#06100e] to-black border border-white/10 p-6 flex flex-col justify-between group-hover:border-emerald-500/30 transition-all">
      <div className="flex items-center justify-between font-mono text-[9px] text-white/50">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Layers size={11} /> FISCAL_TELEMETRY
        </span>
        <span>STREAM: LIVE</span>
      </div>

      <div className="space-y-3 my-auto">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-mono text-white/50">Total Managed Volume</span>
          <span className="text-2xl font-black font-mono text-white tracking-tight">$4,820,910</span>
        </div>

        {/* Mini Bars */}
        <div className="flex items-end gap-1.5 h-16 pt-2">
          {[40, 65, 30, 80, 55, 90, 75, 98, 85, 100].map((v, i) => (
            <div key={i} className="flex-1 rounded-sm bg-white/10 overflow-hidden h-full flex items-end">
              <div 
                className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-sm" 
                style={{ height: `${v}%` }} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-2 border-t border-white/10">
        <span>SECURITY: 256-BIT AES</span>
        <span className="text-emerald-400">SOC2_READY</span>
      </div>
    </div>
  );
}

export default function ProjectSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop Scroll-Driven Horizontal Translation
  useEffect(() => {
    if (isMobile) return;

    let rafId = 0;
    let smoothProgress = 0;

    const onFrame = () => {
      const track = trackRef.current;
      const slider = sliderRef.current;
      if (!track || !slider) {
        rafId = requestAnimationFrame(onFrame);
        return;
      }

      const rect = track.getBoundingClientRect();
      const totalScroll = track.offsetHeight - window.innerHeight;
      
      // Progress 0..1
      const targetProgress = Math.min(1, Math.max(0, -rect.top / (totalScroll || 1)));

      // Smooth damping (inertia)
      smoothProgress += (targetProgress - smoothProgress) * 0.12;

      // Calculate max horizontal travel
      const maxTranslate = Math.max(0, slider.scrollWidth - window.innerWidth + 120);
      const translateX = smoothProgress * maxTranslate;

      slider.style.transform = `translate3d(${-translateX}px, 0, 0)`;

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${smoothProgress * 100}%`;
      }

      const nextActive = Math.min(
        PROJECTS.length - 1,
        Math.floor(smoothProgress * PROJECTS.length + 0.15)
      );
      setActiveIdx(nextActive);

      rafId = requestAnimationFrame(onFrame);
    };

    rafId = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile]);

  const scrollToNode = (idx: number) => {
    if (isMobile) {
      setActiveIdx(idx);
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const totalScroll = track.offsetHeight - window.innerHeight;
    const targetScrollY = track.offsetTop + (idx / (PROJECTS.length - 1)) * totalScroll;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <section 
      id="projects" 
      ref={trackRef} 
      className="relative bg-[#050506] border-t border-white/10 md:h-[420vh]"
    >
      {/* ============================================================== */}
      {/* DESKTOP VIEW: STICKY 100VH HORIZONTAL SCRUB CONTAINER          */}
      {/* ============================================================== */}
      <div className="hidden md:flex sticky top-0 h-screen w-full overflow-hidden flex-col justify-between py-10 px-8 lg:px-14">
        
        {/* TOP BAR / CONTROLS */}
        <div className="flex items-end justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-kin-lime animate-pulse" />
              <span>Production_Nodes // Horizontal Scrub</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black italic text-white uppercase tracking-tighter">
              ACTIVE <span className="text-white/30 not-italic">NODES.</span>
            </h2>
          </div>

          {/* SPRINT METRIC & INDICATOR */}
          <div className="flex items-center gap-6">
            <div className="text-right font-mono">
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Active Node</p>
              <p className="text-xl font-black text-white">
                <span className="text-kin-lime">0{activeIdx + 1}</span>
                <span className="text-white/30"> / 0{PROJECTS.length}</span>
              </p>
            </div>

            {/* Quick Node Dots */}
            <div className="flex gap-1.5">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollToNode(i)}
                  aria-label={`Jump to ${p.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIdx 
                      ? "w-8 bg-kin-lime shadow-[0_0_10px_rgba(230,244,60,0.6)]" 
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* HORIZONTAL TRANSLATING CARDS TRACK */}
        <div className="relative w-full flex-1 flex items-center overflow-visible">
          <div 
            ref={sliderRef}
            className="flex gap-8 items-stretch will-change-transform pr-16"
          >
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className="glass-interactive group relative flex flex-col justify-between p-7 lg:p-9 rounded-2xl w-[70vw] lg:w-[58vw] max-w-[820px] shrink-0 border border-white/10 hover:border-white/25 transition-all shadow-2xl"
              >
                {/* CARD TOP INFO */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-3">
                    <span 
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold"
                      style={{ 
                        backgroundColor: `${project.accent}15`, 
                        color: project.accent,
                        border: `1px solid ${project.accent}40`
                      }}
                    >
                      {project.id}
                    </span>
                    <span className="text-xs font-mono text-white/60 tracking-wider uppercase">
                      {project.tagline}
                    </span>
                  </div>

                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.status}
                  </span>
                </div>

                {/* CARD BODY: TWO COLUMNS (DETAILS + IMAGE) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1">
                  
                  {/* LEFT DETAILS (6/12) */}
                  <div className="lg:col-span-6 space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-black italic text-white uppercase tracking-tight group-hover:text-kin-lime transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs font-mono leading-relaxed">
                      {project.description}
                    </p>

                    {/* TECH STACK PILLS */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((t) => (
                        <span 
                          key={t}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT IMAGE / VISUAL PREVIEW (6/12) */}
                  <div className="lg:col-span-6 h-full flex items-center justify-center">
                    <ProjectVisual project={project} />
                  </div>

                </div>

                {/* CARD FOOTER BUTTONS */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-kin-lime text-black font-mono text-xs font-bold hover:brightness-95 transition-all shadow-[0_0_15px_rgba(230,244,60,0.25)]"
                    >
                      <span>Live Deploy</span>
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all"
                    >
                      <span>Source</span>
                      <GitBranch size={13} />
                    </a>
                  </div>

                  <span className="font-mono text-[9px] text-white/30 hidden sm:inline">
                    SCROLL // NEXT_NODE →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM PROGRESS SCRUB BAR */}
        <div className="pt-4 flex items-center gap-4">
          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-kin-lav to-kin-lime rounded-full w-0 transition-all duration-75 shadow-[0_0_10px_rgba(230,244,60,0.5)]"
            />
          </div>
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest whitespace-nowrap">
            Scroll to Navigate Nodes
          </span>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MOBILE VIEW: FLUID INTERACTIVE CAROUSEL & VISUAL CARDS         */}
      {/* ============================================================== */}
      <div className="block md:hidden py-20 px-5">
        
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-kin-lime animate-pulse" />
            <span>Production_Nodes // 01</span>
          </div>
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tight">
            ACTIVE <span className="text-white/30 not-italic">NODES.</span>
          </h2>
          <p className="mt-2 text-white/50 text-xs font-mono">
            Swipe or use controls to inspect all active production nodes.
          </p>
        </div>

        {/* MOBILE CAROUSEL CARD */}
        <div className="space-y-4">
          {PROJECTS.map((project, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <div
                key={project.id}
                className={`glass p-6 rounded-2xl border transition-all duration-500 ${
                  isCurrent ? "border-kin-lime/50 shadow-xl" : "border-white/10 opacity-75"
                }`}
              >
                {/* TOP HEADER */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                      style={{ 
                        backgroundColor: `${project.accent}15`, 
                        color: project.accent,
                        border: `1px solid ${project.accent}40`
                      }}
                    >
                      {project.id}
                    </span>
                    <span className="text-[11px] font-mono text-white/60 uppercase">
                      0{idx + 1}/0{PROJECTS.length}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">
                    {project.status}
                  </span>
                </div>

                {/* IMAGE PREVIEW */}
                <div className="mb-4 aspect-[16/10] w-full rounded-xl overflow-hidden">
                  <ProjectVisual project={project} />
                </div>

                {/* DETAILS */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-xl font-black italic text-white uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-[11px] font-mono text-white/70 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* TECH TAGS */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-mono text-white/60">
                      {t}
                    </span>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-kin-lime text-black font-mono text-[11px] font-bold"
                  >
                    <span>Deploy</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 text-white font-mono text-[11px]"
                  >
                    <span>Source</span>
                    <GitBranch size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE PAGINATION */}
        <div className="mt-6 flex items-center justify-between font-mono text-[10px] text-white/50">
          <span>{PROJECTS.length} Systems Active</span>
          <a href="https://github.com/andrewanuga" target="_blank" rel="noopener noreferrer" className="text-kin-lime underline">
            View All On GitHub →
          </a>
        </div>

      </div>

    </section>
  );
}
