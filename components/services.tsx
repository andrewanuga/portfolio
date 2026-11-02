"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Code2, 
  BrainCircuit, 
  Bot, 
  Smartphone, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Workflow, 
  ArrowUpRight,
  Layers,
  Terminal,
  Activity
} from "lucide-react";

type Service = {
  code: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  deliverables: string[];
  metric: string;
  status: string;
  accent: string;
  image: string;
  icon: any;
};

const SERVICES: Service[] = [
  {
    code: "MOD_01",
    index: "01",
    title: "Full-Stack Web Architecture",
    category: "SYSTEMS ENGINEERING",
    tagline: "Industrial-grade TypeScript & Next.js ecosystems",
    deliverables: [
      "Next.js 15/16 App Router & Edge Server Components",
      "Strict End-to-End TypeScript & Type-Safe APIs",
      "Prisma, PostgreSQL & High-Concurrency Schemas",
      "Sub-50ms TTFB, Global Edge SSR & Caching",
      "Dockerized Microservices & Automated CI/CD Pipelines"
    ],
    metric: "100% Type-Safe · Edge Ready",
    status: "ONLINE // PRODUCTION",
    accent: "#3b82f6",
    image: "/assets/full-stack.jpg",
    icon: Code2
  },
  {
    code: "MOD_02",
    index: "02",
    title: "AI & Machine Learning Systems",
    category: "APPLIED INTELLIGENCE",
    tagline: "From research prototypes to real-time production inference",
    deliverables: [
      "Custom PyTorch & TensorFlow Training / Fine-Tuning",
      "Dense Vector Embeddings & Hybrid RAG Retrieval",
      "High-Throughput Python & FastAPI Microservices",
      "Quantized LLM Serving with vLLM & TensorRT",
      "Automated MLOps, Drift Detection & Model Evals"
    ],
    metric: "Production Inference · GPU Scaled",
    status: "CALIBRATED // ACTIVE",
    accent: "#2563eb",
    image: "/assets/ai-ml.jpg",
    icon: BrainCircuit
  },
  {
    code: "MOD_03",
    index: "03",
    title: "Agentic AI & Multi-Agent Workflows",
    category: "AUTONOMOUS SYSTEMS",
    tagline: "Self-directing, stateful, tool-using agent architectures",
    deliverables: [
      "Multi-Agent Graph Orchestration via LangGraph",
      "Autonomous Tool Calling, API Execution & Sandboxing",
      "Self-Reflective Reasoning & Automated Error Recovery",
      "Live Database Traversal & Adaptive Retrieval Augmented Generation",
      "Real-Time Telemetry, Token Cost Guardrails & Safety Auditing"
    ],
    metric: "Autonomous Execution · Multi-Agent",
    status: "AUTONOMOUS // DEPLOYED",
    accent: "#38bdf8",
    image: "/assets/agentic-ai.jpg",
    icon: Bot
  },
  {
    code: "MOD_04",
    index: "04",
    title: "Cross-Platform Mobile Applications",
    category: "MOBILE NATIVE",
    tagline: "Fluid 60 FPS iOS and Android applications",
    deliverables: [
      "Production React Native & Expo Architecture",
      "Offline-First SQLite Sync & Persistent Local Storage",
      "60 FPS Hardware-Accelerated Gesture Animations (Reanimated)",
      "Native Biometric Auth & Background Push Workflows",
      "Automated CI/CD Store Deployments (App Store & Google Play)"
    ],
    metric: "60 FPS Native Performance",
    status: "STABLE // PRODUCTION",
    accent: "#60a5fa",
    image: "/assets/mobile-app.avif",
    icon: Smartphone
  }
];

export default function ServicesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="services" className="relative min-h-screen w-full bg-[#050506] py-28 px-4 sm:px-6 md:px-14 border-t border-white/10 overflow-visible text-white">
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/5 to-blue-500/10 blur-[180px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 uppercase tracking-[0.4em] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Modular_Capabilities // System Architecture</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
              CORE <span className="text-white/30 not-italic">SERVICES.</span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-white/60 space-y-2">
            <p className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider text-[11px]">
              <Workflow size={14} className="text-blue-500" />
              <span>Full-Spectrum Engineering Protocol</span>
            </p>
            <p className="leading-relaxed">
              Scroll through the stack below. Each discipline is architected with strict type safety, neural model integrations, and high-concurrency production reliability.
            </p>
          </div>
        </div>

        {/* STACK TELEMETRY / DECK STATUS */}
        <div className="flex items-center justify-between pt-4 text-[10px] font-mono text-white/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue-400">
              <Activity size={12} className="animate-pulse" />
              <span>STACK_DECK // 04 PILLARS</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline text-white/40">SCROLL DOWN TO REVEAL &amp; STACK CARDS</span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold">
            4 ACTIVE PROTOCOLS
          </span>
        </div>
      </div>

      {/* STACKING CARDS SCROLL CONTAINER */}
      <div className="max-w-6xl mx-auto relative pb-32">
        <div className="space-y-10 sm:space-y-12">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const isHovered = activeCard === idx;
            // Sticky top offset so each subsequent card rests gracefully on top with a top tab preview
            const stickyTop = `calc(85px + ${idx * 26}px)`;

            return (
              <div
                key={service.code}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                style={{ 
                  top: stickyTop,
                  zIndex: idx + 10
                }}
                className="sticky rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 border border-white/10 group bg-[#090a10]/95 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(37,99,235,0.12)] hover:border-blue-500/40"
              >
                {/* TOP AMBIENT ACCENT LINE */}
                <div 
                  className="absolute top-0 left-8 right-8 h-[2px] transition-all duration-500 rounded-full"
                  style={{
                    background: isHovered 
                      ? `linear-gradient(90deg, transparent, ${service.accent}, transparent)` 
                      : "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)"
                  }}
                />

                {/* CARD HEADER: IDENTIFIER, CATEGORY, STATUS & INDEX */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span 
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider"
                      style={{
                        backgroundColor: `${service.accent}15`,
                        color: service.accent,
                        border: `1px solid ${service.accent}40`
                      }}
                    >
                      {service.code}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.25em]">
                      {service.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {service.status}
                    </span>
                    <span className="font-mono text-lg font-black text-white/30 group-hover:text-blue-400 transition-colors">
                      /{service.index}
                    </span>
                  </div>
                </div>

                {/* MAIN SPLIT CONTENT: SPECIFICATIONS ON LEFT, RESPONSIVE IMAGE ON RIGHT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* LEFT COLUMN: TITLE, TAGLINE & DELIVERABLES LIST */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-3.5 mb-3">
                        <div 
                          className="p-3 rounded-xl transition-all duration-300 shrink-0"
                          style={{
                            backgroundColor: isHovered ? service.accent : "rgba(37, 99, 235, 0.12)",
                            color: isHovered ? "#ffffff" : service.accent,
                            border: `1px solid ${service.accent}30`,
                            boxShadow: isHovered ? `0 0 20px ${service.accent}60` : "none"
                          }}
                        >
                          <Icon size={24} strokeWidth={2.2} />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black italic text-white uppercase tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-xs font-mono text-white/60 mt-1">
                            {service.tagline}
                          </p>
                        </div>
                      </div>

                      {/* DELIVERABLES LIST (CLEAN, NO REDUNDANT PARAGRAPH) */}
                      <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">
                          <span>Verified Execution Specifications //</span>
                          <span className="text-blue-400 font-bold">{service.deliverables.length} Standards</span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2.5">
                          {service.deliverables.map((item) => (
                            <div 
                              key={item} 
                              className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-colors group/item"
                            >
                              <CheckCircle2 
                                size={15} 
                                style={{ color: service.accent }} 
                                className="shrink-0 mt-0.5" 
                              />
                              <span className="text-xs font-mono text-white/85 leading-snug group-hover/item:text-white transition-colors">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CARD FOOTER METRIC & CTA */}
                    <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-[10px] uppercase">Telemetry:</span>
                        <span 
                          className="font-bold flex items-center gap-1.5 px-3 py-1 rounded-md"
                          style={{ 
                            backgroundColor: `${service.accent}12`,
                            color: service.accent,
                            border: `1px solid ${service.accent}30`
                          }}
                        >
                          <Zap size={12} />
                          {service.metric}
                        </span>
                      </div>

                      <a
                        href="#hire"
                        className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-blue-400 transition-colors uppercase tracking-wider group/link"
                      >
                        <span>Initiate {service.title.split(" ")[0]} Sprint</span>
                        <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: RESPONSIVE SERVICE IMAGE VIEWPORT */}
                  <div className="lg:col-span-5 relative w-full aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/40 transition-all duration-500 shadow-2xl bg-[#030305]">
                    
                    {/* Next.js Optimized Image */}
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Holographic Subtle Scanline & Ambient Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
                    
                    {/* Corner Reticle Brackets */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-blue-400 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-blue-400 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-blue-400 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-blue-400 pointer-events-none" />

                    {/* HUD Status Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: service.accent }} />
                      <span>SYS_FEED // {service.code}</span>
                    </div>

                    <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-blue-400 font-bold">
                      {service.category}
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE HANDSHAKE TERMINAL CALLOUT */}
      <div className="max-w-6xl mx-auto mt-20 relative z-10">
        <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-[#0c0d15] via-[#080910] to-[#040406] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_25px_rgba(37,99,235,0.5)]">
              <Workflow size={28} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                <ShieldCheck size={13} />
                <span>Custom Architecture &amp; System Consultation</span>
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
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] whitespace-nowrap active:scale-[0.98]"
          >
            <span>Initiate Handshake</span>
            <ArrowUpRight size={16} />
          </a>

        </div>
      </div>

    </section>
  );
}
