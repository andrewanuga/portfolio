"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  ExternalLink, 
  GitBranch, 
  ArrowUpRight 
} from "lucide-react";

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  tech: string[];
  link: string;
  github: string;
  status: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    id: "PROJ_01",
    index: "01",
    title: "Socially AI",
    category: "AI & Automation",
    tagline: "Autonomous content generation and social media scheduling platform",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Supabase", "Tailwind CSS"],
    link: "https://github.com/andrewanuga/Socially",
    github: "https://github.com/andrewanuga/Socially",
    status: "Live Project",
    image: "/assets/agentic-ai.jpg"
  },
  {
    id: "PROJ_02",
    index: "02",
    title: "Aurax Commerce",
    category: "E-Commerce",
    tagline: "Modern high-speed online shopping with real-time inventory sync",
    tech: ["Next.js", "React", "Stripe Checkout", "Node.js", "MongoDB"],
    link: "https://aurax-henna.vercel.app/",
    github: "https://github.com/andrewanuga/Aurax",
    status: "Live Project",
    image: "/aurax.png"
  },
  {
    id: "PROJ_03",
    index: "03",
    title: "JohhTech Academic",
    category: "EdTech & Collaboration",
    tagline: "Centralized learning portal connecting students with research materials",
    tech: ["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL", "Supabase"],
    link: "https://johh-tech-academic.vercel.app",
    github: "https://github.com/andrewanuga/JohhTechAcademic",
    status: "Live Project",
    image: "/john_academy.png"
  },
  {
    id: "PROJ_04",
    index: "04",
    title: "VaultFlow SaaS",
    category: "Financial Analytics",
    tagline: "Startup cashflow intelligence and real-time revenue telemetry dashboard",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Recharts", "Auth.js"],
    link: "https://github.com/andrewanuga/vaultflow",
    github: "https://github.com/andrewanuga/vaultflow",
    status: "Open Source",
    image: "/assets/full-stack.jpg"
  },
  {
    id: "PROJ_05",
    index: "05",
    title: "Nexus 3D",
    category: "3D & Interactive Web",
    tagline: "Interactive 3D digital identity showcase powered by WebGL shaders",
    tech: ["Next.js", "Three.js", "WebGL", "Tailwind CSS"],
    link: "https://nexus-beta-gold.vercel.app/",
    github: "https://github.com/andrewanuga/nexus",
    status: "Live Demo",
    image: "/nexus.png"
  },
  {
    id: "PROJ_06",
    index: "06",
    title: "Lumiere Showcase",
    category: "Editorial Design",
    tagline: "Minimalist photography & creative director editorial portfolio",
    tech: ["Next.js", "GSAP", "Radix UI", "Tailwind CSS"],
    link: "https://lumiere-nu-nine.vercel.app/",
    github: "https://github.com/andrewanuga/lumiere",
    status: "Live Project",
    image: "/lumiere.png"
  }
];

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px] rounded-2xl overflow-hidden bg-[#0d101a] border border-white/10 group-hover:border-blue-500/30 transition-all shadow-xl">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white/90">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-medium">{project.status}</span>
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

          {/* PROJECT COUNTER & NAVIGATION DOTS */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-white/40">Current Project</p>
              <p className="text-lg font-bold text-white">
                <span className="text-blue-400">0{activeIdx + 1}</span>
                <span className="text-white/30"> / 0{PROJECTS.length}</span>
              </p>
            </div>

            <div className="flex gap-1.5">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(i)}
                  aria-label={`Jump to ${p.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
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
                className="group relative flex flex-col justify-between p-7 lg:p-8 rounded-3xl w-[70vw] lg:w-[54vw] max-w-[760px] shrink-0 border border-white/10 hover:border-blue-500/40 bg-[#090b12] transition-all shadow-xl"
              >
                {/* CARD TOP INFO */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-white/80 border border-white/10">
                    {project.category}
                  </span>

                  <span className="text-sm font-bold text-white/30 group-hover:text-blue-400 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* CARD BODY: DETAILS & VISUAL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto py-3">
                  
                  {/* TEXT DETAILS */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/60 mt-2 font-medium leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    {/* TECH PILLS */}
                    <div className="pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* VISUAL PREVIEW */}
                  <div className="lg:col-span-6 h-full flex items-center justify-center">
                    <ProjectVisual project={project} />
                  </div>

                </div>

                {/* CARD FOOTER BUTTONS */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.35)]"
                    >
                      <span>Live Preview</span>
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-semibold transition-all"
                    >
                      <span>Source</span>
                      <GitBranch size={13} />
                    </a>
                  </div>

                  <span className="text-xs text-white/40 hidden sm:inline">
                    Scroll down for next →
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
              className="h-full bg-blue-500 rounded-full w-0 transition-all duration-75 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
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
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-white/80 border border-white/10">
                  {project.category}
                </span>
                <span className="text-xs text-white/40 font-bold">
                  0{idx + 1}
                </span>
              </div>

              {/* IMAGE PREVIEW */}
              <ProjectVisual project={project} />

              {/* DETAILS */}
              <div className="space-y-2 pt-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* TECH TAGS */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white/70">
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
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xs font-semibold"
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
