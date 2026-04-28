"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Cpu, Database, Terminal, Lock, ExternalLink, GitBranch } from "lucide-react";
import { cn } from "@/components/lib/utils";

// --- PROJECT DATA MODULE ---
const PROJECTS = [
  {
    id: "NODE_01",
    title: "SOCIALLY_AI",
    description: "Neural-driven social media orchestration engine. Automates content lifecycle using generative AI to optimize engagement latency and brand presence.",
    tech: ["TypeScript", "React.js", "Node.js", "OpenAI API", "PostgreSQL", "TailwindCSS", "Supabase" ],
    link: "https://github.com/andrewanuga/Socially", // Repo as primary link if live is down
    github: "https://github.com/andrewanuga/Socially",
    status: "OPERATIONAL"
  },
  {
    id: "NODE_02",
    title: "AURAX_COMMERCE",
    description: "High-throughput commerce architecture. Featuring real-time inventory synchronization, secure checkout protocols, and an adaptive user interface.",
    tech: ["TypeScript", "Next.js", "Stripe SDK"],
    link: "https://aurax-henna.vercel.app/",
    github: "https://github.com/andrewanuga/Aurax",
    status: "LIVE_STABLE"
  },
  {
    id: "NODE_03",
    title: "JOHHTECH_ACADEMIC",
    description: "Decentralized knowledge distribution hub. Engineered to streamline student collaboration and educational resource accessibility through a unified portal.",
    tech: ["TypeScript", "Next.js", "TailwindCSS", "Supabase"],
    link: "https://johh-tech-academic.vercel.app",
    github: "https://github.com/andrewanuga/JohhTechAcademic",
    status: "OPERATIONAL"
  }
];

const Typewriter = ({ text, delay = 40 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setCurrentText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);
  return <span>{currentText}</span>;
};

const ProjectNode = ({ project }: { project: typeof PROJECTS[0] }) => (
  <div className="group relative flex flex-col justify-between p-10 border-b border-r border-white/5 bg-black/40 min-h-[400px] hover:bg-blue-600/[0.02] transition-all duration-500">
    <div className="absolute top-6 left-8 font-mono text-[10px] text-zinc-700 flex items-center gap-2">
      <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" />
      [{project.id}]
    </div>
    
    <div className="mt-12 space-y-4">
      <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter group-hover:text-blue-500 transition-colors">
        {project.title}
      </h3>
      <p className="text-zinc-500 text-[11px] font-mono leading-relaxed uppercase tracking-wider">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 pt-4">
        {project.tech.map((t) => (
          <span key={t} className="text-[8px] font-mono text-zinc-700 border border-zinc-800 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-4 pt-8">
      <a href={project.link} target="_blank" className="p-3 rounded-xl bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-blue-600 transition-all">
        <ExternalLink size={16} />
      </a>
      <a href={project.github} target="_blank" className="p-3 rounded-xl bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
        <GitBranch size={16} />
      </a>
      <span className="ml-auto text-[9px] font-mono text-emerald-500 italic opacity-50 uppercase tracking-widest">
        {project.status}
      </span>
    </div>
  </div>
);

const EmptyNode = ({ id }: { id: string }) => (
  <div className="group relative flex flex-col justify-center items-center p-12 border-b border-r border-white/5 bg-black/20 min-h-[400px]">
    <div className="absolute top-6 left-8 font-mono text-[10px] text-zinc-900">[{id}]</div>
    <Lock size={20} className="text-zinc-900 group-hover:text-white/10 transition-colors" />
    <div className="mt-4 font-mono text-[9px] text-zinc-900 uppercase tracking-[0.3em]">Awaiting_Expansion</div>
  </div>
);

export default function ProjectSection() {
  return (
    <section id="projects" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row overflow-hidden">
      
      <div className="absolute -bottom-10 -left-10 text-[20rem] font-black text-white/[0.01] select-none pointer-events-none italic">01</div>

      {/* --- LEFT SIDE: THE MANIFESTO --- */}
      <div className="w-full md:w-[40%] p-8 md:p-20 flex flex-col justify-between border-r border-white/5 bg-[#0d0d0d] sticky top-0 md:h-screen z-20">
        <div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-4 mb-12">
            <Terminal size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">System_Reboot // 2026</span>
          </motion.div>

          <h2 className="text-5xl md:text-[3.5rem] lg:text-[5rem] xl:text-[6rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic">
            ACTIVE <br />
            <span className="text-zinc-800 not-italic">NODES.</span>
          </h2>
          
          <div className="mt-10 max-w-xs">
            <p className="text-zinc-500 text-xs font-mono leading-relaxed uppercase tracking-widest italic">
              <Typewriter text="Legacy data cleared. New production nodes initialized. Current architecture reflects the 90-day mastery sprint." />
            </p>
          </div>
        </div>

        <div className="mt-20 space-y-6">
          <div className="p-6 border border-blue-500/20 bg-blue-500/[0.02] rounded-xl font-mono text-[9px] uppercase space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-600">Sprint_Phase</span>
              <span className="text-blue-500">Initialization_01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Nodes_Deployed</span>
              <span className="text-emerald-500">{PROJECTS.length} / 04</span>
            </div>
            <div className="w-full h-[2px] bg-zinc-900 mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "75%" }} 
                  className="h-full bg-blue-600 shadow-[0_0_10px_#2563eb]" 
                />
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: PROJECT GRID --- */}
      <div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 bg-black relative">
        {PROJECTS.map((project) => (
          <ProjectNode key={project.id} project={project} />
        ))}
        
        {/* Fill remaining slots with EmptyNodes if count < 4 */}
        {[...Array(4 - PROJECTS.length)].map((_, i) => (
          <EmptyNode key={i} id={`NODE_0${PROJECTS.length + i + 1}`} />
        ))}

        <motion.a 
          href="https://github.com/andrewanuga"
          target="_blank"
          whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.05)" }}
          className="md:col-span-2 p-12 flex items-center justify-between group cursor-pointer border-b border-white/5"
        >
          <h4 className="text-2xl font-bold text-zinc-800 uppercase italic tracking-tighter group-hover:text-white transition-colors">
            Access_Full_Repository_
          </h4>
          <div className="p-4 rounded-full border border-zinc-900 group-hover:border-blue-600 transition-all">
              <ArrowRight size={24} className="text-zinc-900 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}