"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Cpu, Terminal, Zap, Layers, 
  ExternalLink, GitBranch, ChevronRight, ChevronLeft 
} from "lucide-react";
import NavBar from "@/components/navbar";
import { cn } from "@/components/lib/utils";

// --- DATASET: THE SPRINT REPOSITORY ---
const PROJECTS = [
  {
    id: "00",
    title: "SOCIALLY_AI",
    description: "An intelligent SaaS orchestration platform that leverages neural networks to automate social media content lifecycles and engagement analytics.",
    tech: ["Next.js 14", "OpenAI", "Supabase", "Tailwind"],
    link: "https://github.com/andrewanuga/Socially",
    github: "https://github.com/andrewanuga/Socially",
    image: "/projects/socially.jpg" // Add your image paths here
  },
  {
    id: "01",
    title: "AURAX_ECOMMERCE",
    description: "Full-stack commercial architecture featuring a high-performance product engine, real-time inventory sync, and secure payment tunneling.",
    tech: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "https://aurax-henna.vercel.app/",
    github: "https://github.com/andrewanuga/Aurax",
    image: "/aurax.png"
  },
  {
    id: "02",
    title: "JOHHTECH_ACADEMIC",
    description: "A centralized academic knowledge hub designed for high-availability learning resources and collaborative student research protocols.",
    tech: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
    link: "https://johh-tech-academic.vercel.app",
    github: "https://github.com/andrewanuga/JohhTechAcademic",
    image: "/john_academy.png"
  },
  {
    id: "03",
    title: "VAULTFLOW_SaaS",
    description: "Enterprise-grade financial visualization dashboard optimized for real-time data streaming and complex fiscal metric tracking.",
    tech: ["Next.js", "Framer Motion", "Recharts", "Auth.js"],
    link: "https://github.com/andrewanuga/vaultflow",
    github: "https://github.com/andrewanuga/vaultflow",
    image: "/vaultflow.png"
  },
  {
    id: "04",
    title: "NEXUS_WEB3",
    description: "Web3 frontier interface focusing on decentralized identity visualization and high-fidelity blockchain interaction landing modules.",
    tech: ["Web3.js", "Three.js", "Tailwind", "Next.js"],
    link: "https://nexus-beta-gold.vercel.app/",
    github: "https://github.com/andrewanuga/nexus",
    image: "/nexus.png"
  },
  {
    id: "05",
    title: "lumiere",
    description: "A high-performance photography website template optimized for visual storytelling and seamless media management.",
    tech: ["Next.js", "GSAP", "Radix UI", "Lucide"],
    link: "https://lumiere-nu-nine.vercel.app/",
    github: "https://github.com/andrewanuga/lumiere",
    image: "/lumiere.png"
  }
];

export default function ProjectShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PROJECTS[activeIdx];

  const nextProject = () => setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
  const prevProject = () => setActiveIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden font-mono">
      <NavBar />
      
      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* --- LEFT SIDE: PROJECT INFO (45%) --- */}
        <aside className="w-full lg:w-[45%] p-8 lg:p-20 flex flex-col justify-between border-r border-white/5 bg-[#080808] z-10">
          <div className="space-y-12">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-[10px] text-zinc-500 hover:text-blue-500 transition-colors uppercase tracking-[0.3em]">
              <ArrowLeft size={14} /> Back_to_Origin
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-500 font-bold text-xs tracking-widest uppercase">Node_{active.id}</span>
                  <div className="h-px w-12 bg-blue-500/30" />
                </div>
                <h1 className="text-5xl lg:text-7xl font-black italic uppercase leading-none tracking-tighter">
                  {active.title.split('_')[0]}<br/>
                  <span className="text-zinc-800 not-italic">{active.title.split('_')[1]}</span>
                </h1>
                <p className="text-zinc-500 text-sm leading-relaxed uppercase max-w-md">
                  {active.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {active.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6 pt-12">
            <a href={active.link} target="_blank" className="flex items-center gap-2 text-[10px] font-bold text-white hover:text-blue-500 transition-all uppercase tracking-widest">
              Live_Deploy <ExternalLink size={12} />
            </a>
            <a href={active.github} target="_blank" className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-widest">
              Source_Code <GitBranch size={12} />
            </a>
          </div>
        </aside>

        {/* --- RIGHT SIDE: VISUALIZER (55%) --- */}
        <main className="w-full lg:w-[55%] relative flex flex-col items-center justify-center p-8 bg-black">
          {/* IMAGE CONTAINER */}
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 group shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                {/* Fallback pattern if image is empty */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
                <img 
                  src={active.image} 
                  alt={active.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/1200x800/0a0a0a/444444?text=NODE_DATA_ENCRYPTED"; }}
                />
              </motion.div>
            </AnimatePresence>

            {/* OVERLAY UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 right-8 flex gap-4">
              <button onClick={prevProject} className="p-4 rounded-full border border-white/10 bg-black/50 hover:bg-blue-600 transition-all group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={nextProject} className="p-4 rounded-full border border-white/10 bg-black/50 hover:bg-blue-600 transition-all group">
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* SPRINT TRACKER FOOTER */}
          <div className="mt-12 w-full max-w-4xl flex justify-between items-end px-4">
            <div className="space-y-2">
              <span className="text-[9px] text-zinc-600 uppercase tracking-[0.4em]">Sprint_Progress</span>
              <div className="flex gap-1">
                {PROJECTS.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1 w-8 rounded-full transition-all duration-500",
                      i === activeIdx ? "bg-blue-600 w-16" : "bg-zinc-900"
                    )} 
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
               <span className="text-[40px] font-black italic text-zinc-900 leading-none">{activeIdx + 1}/{PROJECTS.length}</span>
            </div>
          </div>
        </main>

      </div>

      {/* Decorative BG Text */}
      <div className="fixed -bottom-10 -right-10 opacity-[0.02] font-black text-[20vw] pointer-events-none select-none italic">
        NODE
      </div>
    </section>
  );
}