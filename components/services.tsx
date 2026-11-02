"use client";

import React, { useState } from "react";
import { 
  Code2, 
  Globe, 
  Layers, 
  Terminal, 
  BrainCircuit, 
  Bot, 
  ArrowUpRight, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ShieldCheck,
  Workflow
} from "lucide-react";

type Service = {
  code: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metric: string;
  status: string;
  accent: string;
  icon: any;
};

const SERVICES: Service[] = [
  {
    code: "MOD_01",
    index: "01",
    title: "Full-Stack Web Architecture",
    category: "ENGINEERING",
    tagline: "Industrial-grade TypeScript & Next.js systems",
    description: "Architecting end-to-end web applications with modern Next.js App Router, type-safe API backends, and high-concurrency database schemas built to scale effortlessly.",
    deliverables: ["Next.js 15/16 App Router", "Full-Stack TypeScript", "Prisma & PostgreSQL", "Sub-50ms TTFB & Edge SSR"],
    metric: "100% Type-Safe · Edge Ready",
    status: "READY",
    accent: "#00f2fe",
    icon: Code2
  },
  {
    code: "MOD_02",
    index: "02",
    title: "AI & Machine Learning Systems",
    category: "INTELLIGENCE",
    tagline: "From research notebooks to production inference",
    description: "Designing, training, and deploying machine learning pipelines, fine-tuned transformer models, custom vector embeddings, and real-time inference microservices.",
    deliverables: ["PyTorch & TensorFlow", "Vector DBs & Embeddings", "FastAPI / Python Backends", "MLOps & Quantized Serving"],
    metric: "Production Inference · GPU Scaled",
    status: "CALIBRATED",
    accent: "#c471ed",
    icon: BrainCircuit
  },
  {
    code: "MOD_03",
    index: "03",
    title: "Agentic AI & Multi-Agent Workflows",
    category: "AUTONOMOUS",
    tagline: "Self-directing, tool-using agent architectures",
    description: "Designing stateful multi-agent workflows with LangGraph and LLMs. Agents that execute code, query live databases, browse tools, and automate complex knowledge processes.",
    deliverables: ["LangGraph & LangChain", "Autonomous Tool Calling", "Advanced RAG Retrieval", "Self-Correcting Reasoning"],
    metric: "76% Workflow Autonomy",
    status: "AUTONOMOUS",
    accent: "#e6f43c",
    icon: Bot
  },
  {
    code: "MOD_04",
    index: "04",
    title: "Cross-Platform Mobile Apps",
    category: "NATIVE",
    tagline: "Fluid 60 FPS iOS and Android applications",
    description: "Building production-grade native mobile applications with React Native and Expo. Seamless hardware integration, offline-first sync, and buttery smooth gesture animations.",
    deliverables: ["React Native & Expo", "Offline-First SQLite / BaaS", "iOS & Android Parity", "Smooth Reanimated Gestures"],
    metric: "60 FPS Native Performance",
    status: "STABLE",
    accent: "#ff5858",
    icon: SmartphoneIcon
  },
  {
    code: "MOD_05",
    index: "05",
    title: "Startup 0-to-1 Product Engine",
    category: "FOUNDING",
    tagline: "Rapid MVP architecture from idea to market",
    description: "From napkin sketch to scalable multi-tenant SaaS. Architecting the technical foundation for Thecla and early-stage ventures with high velocity and clean engineering standards.",
    deliverables: ["Rapid 2-3 Week MVP Sprints", "SaaS Billing & Stripe Tunnel", "Authentication & RBAC", "Product Analytics Instrumentation"],
    metric: "High-Velocity 0-to-1",
    status: "ACTIVE",
    accent: "#38ef7d",
    icon: Layers
  },
  {
    code: "MOD_06",
    index: "06",
    title: "Cloud Infrastructure & DevOps",
    category: "INFRASTRUCTURE",
    tagline: "Resilient cloud deployments with zero downtime",
    description: "Automating cloud infrastructure, Dockerized microservice orchestration, automated CI/CD deployment pipelines, and zero-trust Supabase/AWS security configurations.",
    deliverables: ["Docker & Containerization", "AWS & Vercel Edge Infra", "Supabase BaaS Architecture", "Automated GitHub Actions CI/CD"],
    metric: "99.98% High-Availability",
    status: "ONLINE",
    accent: "#38bdf8",
    icon: Globe
  }
];

function SmartphoneIcon(props: any) {
  return <Cpu {...props} />;
}

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="relative min-h-screen w-full bg-[#050506] py-28 px-6 md:px-14 border-t border-white/10">
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/5 via-lime-500/5 to-purple-500/5 blur-[160px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-kin-lime animate-pulse" />
              <span>Modular_Capabilities // System Architecture</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
              CORE <span className="text-white/30 not-italic">SERVICES.</span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-white/60 space-y-1">
            <p className="flex items-center gap-2 text-kin-lime">
              <Workflow size={13} />
              <span>Full-Spectrum Engineering Protocol</span>
            </p>
            <p>
              High-throughput software architectures designed with strict type-safety, neural AI agents, and production reliability.
            </p>
          </div>
        </div>
      </div>

      {/* SERVICES MODULAR GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {SERVICES.map((service, idx) => {
          const Icon = service.icon;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={service.code}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="glass relative group flex flex-col justify-between p-8 rounded-2xl border transition-all duration-500 overflow-hidden"
              style={{
                borderColor: isHovered ? `${service.accent}60` : "rgba(255, 255, 255, 0.08)",
                boxShadow: isHovered 
                  ? `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px ${service.accent}20` 
                  : "0 10px 30px rgba(0, 0, 0, 0.35)",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)"
              }}
            >
              {/* TOP ACCENT LINE */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
                style={{
                  background: isHovered 
                    ? `linear-gradient(90deg, transparent, ${service.accent}, transparent)` 
                    : "transparent"
                }}
              />

              <div>
                {/* IDENTIFIER & STATUS */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider"
                      style={{
                        backgroundColor: `${service.accent}15`,
                        color: service.accent,
                        border: `1px solid ${service.accent}35`
                      }}
                    >
                      {service.code}
                    </span>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                      {service.category}
                    </span>
                  </div>

                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {service.status}
                  </span>
                </div>

                {/* ICON & TITLE */}
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="p-3 rounded-xl transition-all duration-300 shrink-0"
                    style={{
                      backgroundColor: isHovered ? service.accent : "rgba(255, 255, 255, 0.08)",
                      color: isHovered ? "#000" : service.accent,
                      boxShadow: isHovered ? `0 0 20px ${service.accent}50` : "none"
                    }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic text-white uppercase tracking-tight leading-snug group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[11px] font-mono text-white/50 mt-1">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-xs font-mono text-white/70 leading-relaxed mt-4">
                  {service.description}
                </p>

                {/* DELIVERABLES LIST */}
                <div className="space-y-2 mt-6 pt-5 border-t border-white/5">
                  <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    Key Specifications //
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[10px] font-mono text-white/75">
                        <CheckCircle2 size={12} style={{ color: service.accent }} className="shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CARD FOOTER METRIC */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px]">
                <span className="text-white/40">CALIBRATION</span>
                <span 
                  className="font-bold flex items-center gap-1"
                  style={{ color: service.accent }}
                >
                  <Zap size={11} />
                  {service.metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE HANDSHAKE TERMINAL CALLOUT */}
      <div className="max-w-7xl mx-auto mt-14 relative z-10">
        <div className="glass p-8 sm:p-10 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-kin-lime flex items-center justify-center text-black shrink-0 shadow-[0_0_25px_rgba(230,244,60,0.4)]">
              <Workflow size={28} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-kin-lime uppercase tracking-widest">
                <ShieldCheck size={13} />
                <span>Custom Architecture &amp; System Inquiry</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black italic text-white uppercase tracking-tight">
                Need a dedicated engineer for your next milestone?
              </h4>
              <p className="text-xs font-mono text-white/60">
                Available for contract sprints, founding tech leadership, and AI architecture consultations.
              </p>
            </div>
          </div>

          <a
            href="#hire"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-kin-lime text-black font-mono text-xs font-bold uppercase tracking-widest hover:brightness-95 transition-all shadow-lg shadow-kin-lime/20 whitespace-nowrap active:scale-[0.98]"
          >
            <span>Initiate Handshake</span>
            <ArrowUpRight size={16} />
          </a>

        </div>
      </div>

    </section>
  );
}
