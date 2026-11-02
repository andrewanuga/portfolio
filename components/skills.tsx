"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Database, 
  Smartphone, 
  BrainCircuit, 
  Layers,
  Code2,
  Server,
  Cpu,
  CheckCircle2
} from "lucide-react";

type TechItem = {
  name: string;
  category: "frontend" | "backend" | "ai" | "mobile";
  categoryLabel: string;
  description: string;
  isPrimary?: boolean;
};

const TECH_STACK: TechItem[] = [
  // FRONTEND
  {
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Modern App Router, React Server Components & Edge SSR",
    isPrimary: true
  },
  {
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Strict end-to-end type safety and developer productivity",
    isPrimary: true
  },
  {
    name: "React",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Component architecture, hooks & interactive state",
    isPrimary: true
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Utility-first responsive layouts & design systems",
    isPrimary: true
  },

  // BACKEND
  {
    name: "Node.js & Express",
    category: "backend",
    categoryLabel: "Backend",
    description: "High-concurrency RESTful APIs and microservices",
    isPrimary: true
  },
  {
    name: "PostgreSQL",
    category: "backend",
    categoryLabel: "Backend",
    description: "Robust relational database with indexing & ACID compliance",
    isPrimary: true
  },
  {
    name: "Prisma ORM",
    category: "backend",
    categoryLabel: "Backend",
    description: "Type-safe database modeling, migrations & queries",
    isPrimary: true
  },
  {
    name: "Supabase",
    category: "backend",
    categoryLabel: "Backend",
    description: "Cloud PostgreSQL backend, auth & real-time synchronization",
    isPrimary: true
  },

  // AI & ML
  {
    name: "Python",
    category: "ai",
    categoryLabel: "AI & ML",
    description: "Core language for ML pipelines, scripts & data processing",
    isPrimary: true
  },
  {
    name: "PyTorch & TensorFlow",
    category: "ai",
    categoryLabel: "AI & ML",
    description: "Deep learning models, fine-tuning & model evaluation",
    isPrimary: true
  },
  {
    name: "LangGraph & LangChain",
    category: "ai",
    categoryLabel: "AI & ML",
    description: "Multi-agent workflows, autonomous tool calling & RAG",
    isPrimary: true
  },
  {
    name: "Vector Databases",
    category: "ai",
    categoryLabel: "AI & ML",
    description: "Semantic embeddings, similarity search & context retrieval",
    isPrimary: false
  },

  // MOBILE
  {
    name: "React Native",
    category: "mobile",
    categoryLabel: "Mobile",
    description: "Cross-platform native iOS & Android applications",
    isPrimary: true
  },
  {
    name: "Expo Ecosystem",
    category: "mobile",
    categoryLabel: "Mobile",
    description: "Rapid mobile prototyping, native APIs & OTA updates",
    isPrimary: true
  },
  {
    name: "Docker & CI/CD",
    category: "backend",
    categoryLabel: "DevOps",
    description: "Containerized deployments and automated GitHub Actions",
    isPrimary: false
  },
  {
    name: "Git & GitHub",
    category: "frontend",
    categoryLabel: "Tools",
    description: "Version control, code reviews & collaborative workflows",
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
    <section id="skills" className="relative w-full bg-[#050506] py-28 px-4 sm:px-6 md:px-14 border-t border-white/10 text-white">
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-cyan-500/10 blur-[180px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-14 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Skills &amp; Expertise</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              TECH <span className="text-white/30 font-light">STACK.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-white/60 leading-relaxed">
            The modern frameworks, programming languages, and cloud tools I leverage to build dependable products.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap gap-2 pt-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.45)]"
                    : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TECH CARDS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {filteredTech.map((item) => (
          <div
            key={item.name}
            className="p-5 rounded-2xl bg-[#090b12] border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-400">
                  {item.categoryLabel}
                </span>
                {item.isPrimary && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Core
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>

              <p className="text-xs text-white/60 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-500" />
                Production Ready
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
