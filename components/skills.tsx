"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Database, 
  Smartphone, 
  Cpu, 
  Layers,
  Code2,
  Server,
  Workflow,
  Terminal,
  Cloud,
  Box,
  GitBranch,
  Network
} from "lucide-react";

type TechItem = {
  name: string;
  category: "frontend" | "backend" | "ai" | "mobile";
  categoryLabel: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
};

const TECH_STACK: TechItem[] = [
  // FRONTEND
  {
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <Globe size={16} />,
    isPrimary: true
  },
  {
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <Code2 size={16} />,
    isPrimary: true
  },
  {
    name: "React",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <Layers size={16} />,
    isPrimary: true
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <Layers size={16} />,
    isPrimary: true
  },
  {
    name: "Framer Motion",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <Code2 size={16} />,
    isPrimary: false
  },

  // BACKEND
  {
    name: "Node.js & Express",
    category: "backend",
    categoryLabel: "Backend",
    icon: <Server size={16} />,
    isPrimary: true
  },
  {
    name: "PostgreSQL",
    category: "backend",
    categoryLabel: "Backend",
    icon: <Database size={16} />,
    isPrimary: true
  },
  {
    name: "Prisma ORM",
    category: "backend",
    categoryLabel: "Backend",
    icon: <Layers size={16} />,
    isPrimary: true
  },
  {
    name: "Supabase",
    category: "backend",
    categoryLabel: "Backend",
    icon: <Database size={16} />,
    isPrimary: true
  },
  {
    name: "Redis",
    category: "backend",
    categoryLabel: "Backend",
    icon: <Database size={16} />,
    isPrimary: false
  },
  {
    name: "REST & GraphQL",
    category: "backend",
    categoryLabel: "Backend",
    icon: <Network size={16} />,
    isPrimary: false
  },

  // AI & ML
  {
    name: "Python",
    category: "ai",
    categoryLabel: "AI & ML",
    icon: <Terminal size={16} />,
    isPrimary: true
  },
  {
    name: "PyTorch & TensorFlow",
    category: "ai",
    categoryLabel: "AI & ML",
    icon: <Cpu size={16} />,
    isPrimary: true
  },
  {
    name: "LangGraph & LangChain",
    category: "ai",
    categoryLabel: "AI & ML",
    icon: <Workflow size={16} />,
    isPrimary: true
  },
  {
    name: "Vector Databases & RAG",
    category: "ai",
    categoryLabel: "AI & ML",
    icon: <Database size={16} />,
    isPrimary: true
  },
  {
    name: "LLM Fine-Tuning & Agents",
    category: "ai",
    categoryLabel: "AI & ML",
    icon: <Cpu size={16} />,
    isPrimary: false
  },

  // MOBILE & CLOUD
  {
    name: "React Native",
    category: "mobile",
    categoryLabel: "Mobile",
    icon: <Smartphone size={16} />,
    isPrimary: true
  },
  {
    name: "Expo Ecosystem",
    category: "mobile",
    categoryLabel: "Mobile",
    icon: <Smartphone size={16} />,
    isPrimary: true
  },
  {
    name: "Docker",
    category: "backend",
    categoryLabel: "DevOps",
    icon: <Box size={16} />,
    isPrimary: false
  },
  {
    name: "CI/CD & GitHub Actions",
    category: "backend",
    categoryLabel: "DevOps",
    icon: <GitBranch size={16} />,
    isPrimary: false
  },
  {
    name: "AWS & Vercel",
    category: "backend",
    categoryLabel: "Cloud",
    icon: <Cloud size={16} />,
    isPrimary: false
  }
];

const CATEGORIES = [
  { id: "all", label: "All Technologies" },
  { id: "frontend", label: "Frontend & Web" },
  { id: "backend", label: "Backend & Cloud" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "mobile", label: "Mobile Apps" }
];

export default function SkillSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTech = activeCategory === "all" 
    ? TECH_STACK 
    : TECH_STACK.filter(t => t.category === activeCategory);

  return (
    <section id="skills" className="relative w-full bg-[#050506] py-28 px-4 sm:px-6 md:px-14 border-t border-white/10 text-white overflow-hidden">
      
      {/* ANIMATED AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Glow Orb 1 - Blue */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[130px]"
        />

        {/* Animated Glow Orb 2 - Cyan Accent */}
        <motion.div
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.9, 1.12, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-28 -right-20 w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[150px]"
        />

        {/* Center Breathing Glow */}
        <motion.div
          animate={{
            opacity: [0.25, 0.5, 0.25],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] rounded-full bg-blue-500/10 blur-[160px]"
        />

        {/* Subtle Radial Dot Matrix Grid */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, black 25%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, black 25%, transparent 100%)",
          }}
        />
      </div>

      {/* SECTION HEADER */}
      <div className="max-w-5xl mx-auto mb-12 relative z-10 text-center sm:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Skills &amp; Expertise</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              TECH <span className="text-white/30 font-light">STACK.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-white/60 leading-relaxed sm:text-left">
            The core frameworks, languages, and tools I use to build robust, scalable applications.
          </p>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_0_18px_rgba(37,99,235,0.45)] border border-blue-400/30"
                    : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TECH BUTTON-STYLE PILL LIST */}
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          layout
          className="flex flex-wrap items-center justify-center sm:justify-start gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                key={item.name}
                className="group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.03] hover:bg-blue-600/10 border border-white/10 hover:border-blue-500/60 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] cursor-default select-none"
              >
                {/* Tech Icon */}
                <span className="text-blue-400/80 group-hover:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>

                {/* Tech Name */}
                <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                  {item.name}
                </span>

                {/* Category Pill Tag */}
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] group-hover:bg-blue-500/20 text-white/40 group-hover:text-blue-300 transition-colors">
                  {item.categoryLabel}
                </span>

                {/* Core Indicator Dot */}
                {item.isPrimary && (
                  <span 
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" 
                    title="Core competency" 
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}
