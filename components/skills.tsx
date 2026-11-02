"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  Globe, 
  Database, 
  Smartphone, 
  Cloud, 
  Binary, 
  BrainCircuit, 
  RotateCcw,
  Sparkles,
  Zap
} from "lucide-react";

type Skill = {
  name: string;
  level: number;
  badge: string;
};

type SkillCategory = {
  id: string;
  category: string;
  icon: any;
  colorName: string;
  gradient: string;
  glowColor: string;
  accentHex: string;
  skills: Skill[];
};

const SKILL_GROUPS: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend_Core",
    icon: Globe,
    colorName: "Neon Cyan",
    gradient: "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
    glowColor: "rgba(0, 242, 254, 0.6)",
    accentHex: "#00f2fe",
    skills: [
      { name: "TypeScript", level: 95, badge: "MASTERED" },
      { name: "React JS", level: 95, badge: "MASTERED" },
      { name: "Next JS 15/16", level: 92, badge: "PRODUCTION" },
      { name: "JavaScript (ESNext)", level: 98, badge: "MASTERED" },
      { name: "TailwindCSS & CSS3", level: 95, badge: "MASTERED" },
    ],
  },
  {
    id: "backend",
    category: "Backend_Infrastructure",
    icon: Database,
    colorName: "Vivid Violet",
    gradient: "linear-gradient(90deg, #c471ed 0%, #f64f59 100%)",
    glowColor: "rgba(196, 113, 237, 0.6)",
    accentHex: "#c471ed",
    skills: [
      { name: "Node JS", level: 90, badge: "PRODUCTION" },
      { name: "Express JS", level: 92, badge: "PRODUCTION" },
      { name: "Prisma ORM", level: 86, badge: "PRODUCTION" },
      { name: "PostgreSQL", level: 88, badge: "PRODUCTION" },
      { name: "MongoDB & Mongoose", level: 82, badge: "ADVANCED" },
    ],
  },
  {
    id: "ai",
    category: "AI_&_Agentic_Logic",
    icon: BrainCircuit,
    colorName: "Kin Lime",
    gradient: "linear-gradient(90deg, #e6f43c 0%, #00f5a0 100%)",
    glowColor: "rgba(230, 244, 60, 0.7)",
    accentHex: "#e6f43c",
    skills: [
      { name: "Python (NumPy / SciPy)", level: 92, badge: "PRODUCTION" },
      { name: "PyTorch & TensorFlow", level: 85, badge: "PRODUCTION" },
      { name: "LangChain & LangGraph", level: 90, badge: "PRODUCTION" },
      { name: "RAG & Vector Embeddings", level: 88, badge: "PRODUCTION" },
      { name: "Multi-Agent Systems", level: 90, badge: "ACTIVE_R&D" },
    ],
  },
  {
    id: "mobile",
    category: "Mobile_Native",
    icon: Smartphone,
    colorName: "Electric Coral",
    gradient: "linear-gradient(90deg, #ff5858 0%, #f09819 100%)",
    glowColor: "rgba(255, 88, 88, 0.6)",
    accentHex: "#ff5858",
    skills: [
      { name: "React Native", level: 88, badge: "PRODUCTION" },
      { name: "Expo Ecosystem", level: 86, badge: "PRODUCTION" },
      { name: "Native Mobile UI", level: 85, badge: "ADVANCED" },
      { name: "Appwrite Mobile", level: 80, badge: "ADVANCED" },
    ],
  },
  {
    id: "cloud",
    category: "Cloud_&_BaaS",
    icon: Cloud,
    colorName: "Emerald Mint",
    gradient: "linear-gradient(90deg, #38ef7d 0%, #11998e 100%)",
    glowColor: "rgba(56, 239, 125, 0.6)",
    accentHex: "#38ef7d",
    skills: [
      { name: "Supabase BaaS", level: 92, badge: "MASTERED" },
      { name: "Firebase Platform", level: 90, badge: "PRODUCTION" },
      { name: "AWS (S3, EC2, Lambda)", level: 78, badge: "ADVANCED" },
      { name: "Docker & CI/CD", level: 82, badge: "PRODUCTION" },
    ],
  },
  {
    id: "logic",
    category: "Computational_Logic",
    icon: Binary,
    colorName: "Radiant Rose",
    gradient: "linear-gradient(90deg, #f857a6 0%, #ff5858 100%)",
    glowColor: "rgba(248, 87, 166, 0.6)",
    accentHex: "#f857a6",
    skills: [
      { name: "C / C++ Systems", level: 80, badge: "ACADEMIC" },
      { name: "MATLAB (Matrix & DSP)", level: 78, badge: "ENGINEERING" },
      { name: "Algorithms & Math", level: 88, badge: "PRODUCTION" },
    ],
  },
];

function AnimatedSkillBar({ 
  skill, 
  group, 
  animate 
}: { 
  skill: Skill; 
  group: SkillCategory; 
  animate: boolean; 
}) {
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    if (!animate) {
      setCurrentLevel(0);
      return;
    }

    let frame = 0;
    const startTime = performance.now();
    const duration = 1200; // 1.2s animation

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrentLevel(Math.round(skill.level * ease));

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [animate, skill.level]);

  return (
    <div className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all group">
      
      {/* HEADER: NAME, BADGE, AND COUNT-UP VALUE */}
      <div className="flex justify-between items-baseline mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-white group-hover:text-white transition-colors">
            {skill.name}
          </span>
          <span 
            className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{ 
              backgroundColor: `${group.accentHex}15`, 
              color: group.accentHex,
              border: `1px solid ${group.accentHex}35`
            }}
          >
            {skill.badge}
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono">
          <span 
            className="text-sm font-black tabular-nums transition-all"
            style={{ color: group.accentHex }}
          >
            {currentLevel}%
          </span>
          <span className="text-[9px] text-white/30">LOAD</span>
        </div>
      </div>

      {/* PROMINENT VISIBLE LOADING TRACK */}
      <div className="relative h-2.5 w-full bg-[#121218] rounded-full overflow-hidden p-[2px] border border-white/10 shadow-inner">
        {/* ANIMATED GLOWING PROGRESS BAR */}
        <div
          className="relative h-full rounded-full transition-all duration-75"
          style={{
            width: `${currentLevel}%`,
            background: group.gradient,
            boxShadow: `0 0 14px ${group.glowColor}, 0 0 4px ${group.accentHex}`,
          }}
        >
          {/* SHIMMER BEAM EFFECT */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function SkillSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [key, setKey] = useState(0);

  // Trigger loading animation on intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleReplay = () => {
    setIsInView(false);
    setTimeout(() => {
      setKey((k) => k + 1);
      setIsInView(true);
    }, 50);
  };

  const filteredGroups = activeCategory === "all" 
    ? SKILL_GROUPS 
    : SKILL_GROUPS.filter((g) => g.id === activeCategory);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      key={key}
      className="relative min-h-screen w-full bg-[#050506] py-28 px-6 md:px-14 border-t border-white/10"
    >
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-kin-lime animate-pulse" />
              <span>Capability_Matrix // Dynamic Load</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
              SKILL <span className="text-white/30 not-italic">INTEGRATION.</span>
            </h2>
            <p className="mt-4 text-white/60 text-xs md:text-sm font-mono max-w-xl">
              Real-time visualization of engineering proficiency across full-stack systems, machine learning architectures, and native platforms.
            </p>
          </div>

          {/* REPLAY ANIMATION BUTTON */}
          <button
            onClick={handleReplay}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-mono text-xs transition-all hover:border-kin-lime/50"
            title="Re-run skill loading sequence"
          >
            <RotateCcw size={13} className="text-kin-lime" />
            <span>Replay Loading</span>
          </button>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap gap-2 pt-6">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeCategory === "all"
                ? "bg-kin-lime text-black font-bold shadow-[0_0_12px_rgba(230,244,60,0.4)]"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            [ALL_DOMAINS]
          </button>

          {SKILL_GROUPS.map((g) => {
            const isActive = activeCategory === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActiveCategory(g.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? "text-black font-bold shadow-lg"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
                style={isActive ? { backgroundColor: g.accentHex, color: "#000" } : {}}
              >
                <span 
                  className="h-1.5 w-1.5 rounded-full" 
                  style={{ backgroundColor: isActive ? "#000" : g.accentHex }} 
                />
                <span>{g.category.replace("_", " ")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SKILLS CARDS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div 
              key={group.id} 
              className="glass p-6 sm:p-7 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all shadow-xl"
            >
              <div>
                {/* CATEGORY TITLE & ICON */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2.5 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${group.accentHex}15`, 
                        color: group.accentHex,
                        border: `1px solid ${group.accentHex}30`
                      }}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {group.category}
                      </h3>
                      <span className="text-[9px] font-mono text-white/40">
                        {group.skills.length} Capabilities Loaded
                      </span>
                    </div>
                  </div>

                  <span 
                    className="h-2 w-2 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: group.accentHex,
                      boxShadow: `0 0 8px ${group.accentHex}`
                    }}
                  />
                </div>

                {/* SKILLS LIST WITH VIBRANT PROGRESS BARS */}
                <div className="space-y-3">
                  {group.skills.map((skill) => (
                    <AnimatedSkillBar 
                      key={skill.name} 
                      skill={skill} 
                      group={group} 
                      animate={isInView} 
                    />
                  ))}
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/30">
                <span>INDEX // {group.id.toUpperCase()}</span>
                <span style={{ color: group.accentHex }}>CALIBRATED ✓</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM FOOTER SUMMARY */}
      <div className="max-w-7xl mx-auto mt-14 glass p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/60">
        <div className="flex items-center gap-3">
          <Zap size={16} className="text-kin-lime" />
          <span>Full-Stack Mastery: Typescript, Python, Next.js, PyTorch, Supabase &amp; LangGraph</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-white/40">
          <span>Benchmarked 2026</span>
          <span className="text-emerald-400">● 100% Operational Readiness</span>
        </div>
      </div>
    </section>
  );
}

// Integrated live count-up percentage calculation and shimmer beam sweep
