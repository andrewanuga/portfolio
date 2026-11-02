"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  ExternalLink, 
  GitBranch, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Bot,
  Layers,
  Sparkles
} from "lucide-react";

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
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
    id: "PROJ_01",
    index: "01",
    title: "Socially AI",
    category: "AI & Content Platform",
    tagline: "Autonomous content creation and social media automation",
    description: "An intelligent platform that helps creators and teams generate engaging viral content, automate scheduling, and track performance with OpenAI models and real-time cloud data.",
    tech: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL", "Supabase", "Tailwind CSS"],
    link: "https://github.com/andrewanuga/Socially",
    github: "https://github.com/andrewanuga/Socially",
    status: "Live Project",
    accent: "#3b82f6",
    customVisual: "socially"
  },
  {
    id: "PROJ_02",
    index: "02",
    title: "Aurax Commerce",
    category: "E-Commerce",
    tagline: "Modern high-speed online shopping experience",
    description: "A lightning-fast e-commerce storefront designed with fluid navigation, real-time product inventory sync, and seamless, secure Stripe payment checkout.",
    tech: ["Next.js", "React", "Stripe Checkout", "MongoDB", "Node.js"],
    link: "https://aurax-henna.vercel.app/",
    github: "https://github.com/andrewanuga/Aurax",
    status: "Live Project",
    image: "/aurax.png",
    accent: "#3b82f6"
  },
  {
    id: "PROJ_03",
    index: "03",
    title: "JohhTech Academic",
    category: "Education & Collaboration",
    tagline: "Collaborative university learning portal",
    description: "A centralized academic platform connecting university students with shared research materials, lecture notes, and collaborative study groups.",
    tech: ["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL", "Supabase"],
    link: "https://johh-tech-academic.vercel.app",
    github: "https://github.com/andrewanuga/JohhTechAcademic",
    status: "Live Project",
    image: "/john_academy.png",
    accent: "#3b82f6"
  },
  {
    id: "PROJ_04",
    index: "04",
    title: "VaultFlow SaaS",
    category: "Financial Analytics",
    tagline: "Real-time startup cashflow and revenue dashboard",
    description: "A high-clarity financial dashboard providing founders and finance teams with real-time MRR analytics, cash runway projections, and transactional streaming.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Recharts", "Auth.js"],
    link: "https://github.com/andrewanuga/vaultflow",
    github: "https://github.com/andrewanuga/vaultflow",
    status: "Open Source",
    accent: "#3b82f6",
    customVisual: "vaultflow"
  },
  {
    id: "PROJ_05",
    index: "05",
    title: "Nexus 3D",
    category: "Web3 & 3D Graphics",
    tagline: "Interactive 3D digital identity showcase",
    description: "An experimental interactive web experience featuring custom WebGL 3D shaders, real-time particle effects, and decentralized identity verification.",
    tech: ["Next.js", "Three.js", "WebGL Shaders", "Tailwind CSS"],
    link: "https://nexus-beta-gold.vercel.app/",
    github: "https://github.com/andrewanuga/nexus",
    status: "Live Demo",
    image: "/nexus.png",
    accent: "#3b82f6"
  },
  {
    id: "PROJ_06",
    index: "06",
    title: "Lumiere Showcase",
    category: "Editorial Design",
    tagline: "Minimalist photography & editorial portfolio",
    description: "An editorial portfolio crafted for photographers and creative directors with smooth inertial scrolling, high-resolution image decoding, and fluid typography.",
    tech: ["Next.js", "GSAP", "Radix UI", "Tailwind CSS"],
    link: "https://lumiere-nu-nine.vercel.app/",
    github: "https://github.com/andrewanuga/lumiere",
    status: "Live Project",
    image: "/lumiere.png",
    accent: "#3b82f6"
  }
];

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden bg-[#0a0b12] border border-white/10 group-hover:border-blue-500/30 transition-all shadow-xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-white/90">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Preview</span>
        </div>
      </div>
    );
  }

  if (project.customVisual === "socially") {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1220] via-[#080d18] to-black border border-white/10 p-6 flex flex-col justify-between group-hover:border-blue-500/40 transition-all shadow-xl">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <Bot size={13} /> AI Content Engine
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ready
          </span>
        </div>

        {/* Visual Mock Graph */}
        <div className="space-y-3 my-auto">
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <div className="flex justify-between items-center text-xs text-white/90 mb-2 font-medium">
              <span>Viral Hook Generator</span>
              <span className="text-blue-400 font-bold">98.4% Match</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-[85%]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-[10px] text-white/40">Engine</p>
              <p className="font-semibold text-white">GPT-4o</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-[10px] text-white/40">Database</p>
              <p className="font-semibold text-white">Supabase</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-[10px] text-white/40">Framework</p>
              <p className="font-semibold text-white">Next.js</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/40 pt-3 border-t border-white/10">
          <span>Target Platform: Multi-Channel</span>
          <span className="text-blue-400">Automated Sync</span>
        </div>
      </div>
    );
  }

  // Vaultflow visual fallback
  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1220] via-[#090e18] to-black border border-white/10 p-6 flex flex-col justify-between group-hover:border-blue-500/40 transition-all shadow-xl">
      <div className="flex items-center justify-between text-xs text-white/50">
        <span className="text-blue-400 font-semibold flex items-center gap-1.5">
          <Layers size={13} /> Financial Telemetry
        </span>
        <span className="text-emerald-400 font-bold">+28.4% MoM</span>
      </div>

      <div className="space-y-4 my-auto">
        <div>
          <p className="text-xs text-white/50">Monthly Recurring Revenue</p>
          <p className="text-3xl font-extrabold text-white tracking-tight mt-0.5">$124,500.00</p>
        </div>

        {/* Mini Bar Chart */}
        <div className="flex items-end gap-1.5 h-16 pt-2">
          {[40, 55, 45, 65, 80, 70, 95, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-white/10 rounded-sm hover:bg-blue-500 transition-colors" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-[11px] text-white/40 pt-3 border-t border-white/10">
        <span>Runway: 18 Months</span>
        <span className="text-blue-400 font-medium">Healthy Burn Rate</span>
      </div>
    </div>
  );
}

export default function ProjectSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (!trackRef.current || !sliderRef.current) return;
      if (window.innerWidth < 768) return; // Native scroll on mobile

      const track = trackRef.current;
      const rect = track.getBoundingClientRect();
      const totalScroll = track.offsetHeight - window.innerHeight;
      
      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

      // Max horizontal translation width
      const maxTranslate = sliderRef.current.scrollWidth - window.innerWidth + 120;
      const translateX = progress * maxTranslate;

      sliderRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${progress * 100}%`;
      }

      // Compute active project index
      const newIdx = Math.min(
        PROJECTS.length - 1,
        Math.floor(progress * PROJECTS.length)
      );
      setActiveIdx(newIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToProject = (idx: number) => {
    if (window.innerWidth < 768) {
      const el = document.getElementById(`mobile-proj-${idx}`);
      el?.scrollIntoView({ behavior: "smooth" });
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
      className="relative bg-[#050506] border-t border-white/10 md:h-[400vh]"
    >
      {/* ============================================================== */}
      {/* DESKTOP VIEW: STICKY 100VH HORIZONTAL SCRUB CONTAINER          */}
      {/* ============================================================== */}
      <div className="hidden md:flex sticky top-0 h-screen w-full overflow-hidden flex-col justify-between py-10 px-8 lg:px-14">
        
        {/* TOP BAR / HEADER */}
        <div className="flex items-end justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              FEATURED <span className="text-white/30 font-light">PROJECTS.</span>
            </h2>
          </div>

          {/* PROJECT COUNTER & DOTS */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-white/40">Current Project</p>
              <p className="text-lg font-bold text-white">
                <span className="text-blue-400">0{activeIdx + 1}</span>
                <span className="text-white/30"> / 0{PROJECTS.length}</span>
              </p>
            </div>

            {/* Quick Dots */}
            <div className="flex gap-1.5">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(i)}
                  aria-label={`Jump to ${p.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIdx 
                      ? "w-8 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" 
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
                className="group relative flex flex-col justify-between p-8 lg:p-9 rounded-3xl w-[70vw] lg:w-[58vw] max-w-[820px] shrink-0 border border-white/10 hover:border-blue-500/40 bg-[#090b12]/90 backdrop-blur-xl transition-all shadow-2xl"
              >
                {/* CARD TOP INFO */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {project.status}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-white/30 group-hover:text-blue-400 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* CARD BODY: DETAILS & VISUAL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
                  
                  {/* TEXT DETAILS */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/60 mt-1 font-medium">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-white/70 leading-relaxed">
                      {project.description}
                    </p>

                    {/* TECH PILLS */}
                    <div className="pt-2">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">
                        Built With
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* VISUAL MOCKUP VIEWPORT */}
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    >
                      <span>Live Preview</span>
                      <ExternalLink size={14} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
                    >
                      <span>Source Code</span>
                      <GitBranch size={14} />
                    </a>
                  </div>

                  <span className="text-xs text-white/40 hidden sm:inline">
                    Scroll down for next project →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM PROGRESS SCRUB BAR */}
        <div className="pt-4 flex items-center gap-4">
          <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-0 transition-all duration-75 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
            />
          </div>
          <span className="text-xs text-white/40 uppercase tracking-wider whitespace-nowrap font-medium">
            Scroll to Navigate
          </span>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MOBILE VIEW: RESPONSIVE VERTICAL STACK FEED                    */}
      {/* ============================================================== */}
      <div className="md:hidden py-20 px-6">
        
        {/* MOBILE HEADER */}
        <div className="mb-10 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Portfolio</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            SELECTED <span className="text-white/30 font-light">PROJECTS.</span>
          </h2>
        </div>

        {/* MOBILE VERTICAL FEED */}
        <div className="space-y-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              id={`mobile-proj-${idx}`}
              className="p-6 rounded-3xl bg-[#090b12] border border-white/10 shadow-xl space-y-4"
            >
              {/* TOP HEADER */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {project.category}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.status}
                </span>
              </div>

              {/* IMAGE PREVIEW */}
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden">
                <ProjectVisual project={project} />
              </div>

              {/* DETAILS */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 font-medium">
                  {project.tagline}
                </p>
                <p className="text-sm text-white/70 leading-relaxed pt-1">
                  {project.description}
                </p>
              </div>

              {/* TECH TAGS */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs text-white/70">
                    {t}
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-600/30"
                >
                  <span>Live Preview</span>
                  <ExternalLink size={13} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white text-xs font-semibold"
                >
                  <span>Source</span>
                  <GitBranch size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE FOOTER NOTE */}
        <div className="mt-8 flex items-center justify-between text-xs text-white/50">
          <span>{PROJECTS.length} Featured Projects</span>
          <a href="https://github.com/andrewanuga" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            View All On GitHub →
          </a>
        </div>

      </div>

    </section>
  );
}
