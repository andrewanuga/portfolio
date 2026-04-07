"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, Code2, Globe, Database, Terminal, 
  Layers, Smartphone, Cloud, Binary 
} from "lucide-react";
import { cn } from "@/components/lib/utils";

// --- SKILL DATA STRUCTURE ---
const SKILL_GROUPS = [
  {
    category: "Frontend_Core",
    icon: <Globe size={16} />,
    skills: [
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 98 },
      { name: "TypeScript", level: 92 },
      { name: "React JS", level: 95 },
      { name: "Next JS", level: 90 },
    ],
  },
  {
    category: "Backend_Infrastructure",
    icon: <Database size={16} />,
    skills: [
      { name: "Node JS", level: 88 },
      { name: "Express JS", level: 90 },
      { name: "Prisma", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB/Mongoose", level: 80 },
    ],
  },
  {
    category: "Mobile_Native",
    icon: <Smartphone size={16} />,
    skills: [
      { name: "React Native", level: 85 },
      { name: "Appwrite", level: 75 },
    ],
  },
  {
    category: "Cloud_BaaS",
    icon: <Cloud size={16} />,
    skills: [
      { name: "AWS", level: 70 },
      { name: "Supabase", level: 88 },
      { name: "Firebase", level: 92 },
    ],
  },
  {
    category: "Computational_Logic",
    icon: <Binary size={16} />,
    skills: [
      { name: "Python", level: 85 },
      { name: "C / C++", level: 78 },
      { name: "MATLAB", level: 72 },
    ],
  },
];

const SkillModule = ({ name, level }: { name: string; level: number }) => (
  <div className="group p-4 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 rounded-xl">
    <div className="flex justify-between items-end mb-3">
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
        {name}
      </span>
      <span className="text-[9px] font-mono text-zinc-700 italic">{level}%_LOAD</span>
    </div>
    <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
      />
    </div>
  </div>
);

export default function SkillSection() {
  return (
    <section id="skills" className="relative min-h-screen w-full bg-[#0a0a0a] py-24 px-6 md:px-12 border-t border-white/5">
      
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="text-blue-500 animate-pulse" size={18} />
          <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.6em]">Tech_Capability_Matrix</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
          SKILL <br />
          <span className="text-zinc-800 not-italic">INTEGRATION.</span>
        </h2>
      </div>

      {/* SKILLS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {SKILL_GROUPS.map((group, idx) => (
          <motion.div 
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-6"
          >
            {/* GROUP HEADER */}
            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
              <div className="p-2 rounded-lg bg-zinc-900 text-zinc-400">
                {group.icon}
              </div>
              <h3 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest">
                {group.category}
              </h3>
            </div>

            {/* SKILLS LIST */}
            <div className="grid grid-cols-1 gap-3">
              {group.skills.map((skill) => (
                <SkillModule key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* DECORATIVE FOOTER FOR SECTION */}
      <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-12">
          <div className="space-y-1">
            <p className="text-[8px] font-mono text-zinc-600 uppercase">Architecture</p>
            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-tight">Full-Stack / Microservices</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-mono text-zinc-600 uppercase">Design_System</p>
            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-tight">Atomic / Industrial</p>
          </div>
        </div>
        
        <div className="text-[9px] font-mono text-zinc-800 uppercase tracking-[0.3em]">
          End_Of_Transmission // 2026
        </div>
      </div>
    </section>
  );
}