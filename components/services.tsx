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
  ArrowUpRight,
  Sparkle
} from "lucide-react";

type Service = {
  index: string;
  title: string;
  category: string;
  tagline: string;
  deliverables: string[];
  highlight: string;
  accent: string;
  image: string;
  icon: any;
};

const SERVICES: Service[] = [
  {
    index: "01",
    title: "Web App Development",
    category: "Full-Stack Web",
    tagline: "Fast, modern, and beautiful websites and web applications",
    deliverables: [
      "Custom responsive web applications built with Next.js & React",
      "High-performance architecture with lightning-fast page load times",
      "Secure user authentication, cloud databases & payment processing",
      "Clean, maintainable codebase engineered for growth and scale",
      "Search engine optimization (SEO) and cross-device accessibility"
    ],
    highlight: "High Performance & Scalable",
    accent: "#3b82f6",
    image: "/assets/full-stack.jpg",
    icon: Code2
  },
  {
    index: "02",
    title: "AI & Machine Learning",
    category: "Applied AI",
    tagline: "Intelligent systems and smart features tailored to your product",
    deliverables: [
      "Custom machine learning models tailored to your business needs",
      "Smart semantic search, instant recommendations & vector search",
      "High-speed APIs connecting AI models directly to your web apps",
      "Intelligent text, image, and data processing pipelines",
      "Continuous performance testing, quality checks & cost optimization"
    ],
    highlight: "Tailored Machine Learning",
    accent: "#2563eb",
    image: "/assets/ai-ml.jpg",
    icon: BrainCircuit
  },
  {
    index: "03",
    title: "AI Agents & Automation",
    category: "Smart Automation",
    tagline: "Automate repetitive workflows with autonomous digital assistants",
    deliverables: [
      "Intelligent AI agents that can search, analyze, and take actions",
      "Automated document processing and research assistants",
      "Interactive customer support and internal company knowledge bots",
      "Reliable error handling and human-in-the-loop safety checks",
      "Seamless integration into Slack, Discord, email, and internal tools"
    ],
    highlight: "Workflow Automation",
    accent: "#38bdf8",
    image: "/assets/agentic-ai.jpg",
    icon: Bot
  },
  {
    index: "04",
    title: "Mobile App Development",
    category: "iOS & Android",
    tagline: "Smooth, fluid mobile applications that users love using",
    deliverables: [
      "Cross-platform iOS and Android apps with React Native & Expo",
      "Silky smooth 60 FPS animations and intuitive touch gestures",
      "Offline-first support so the app works even without internet",
      "Biometric security, push notifications & device hardware integration",
      "End-to-end publishing and deployment to Apple App Store & Google Play"
    ],
    highlight: "Native Mobile Experience",
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-cyan-500/10 blur-[180px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>What I Offer</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              SERVICES &amp; <span className="text-white/30 font-light">SOLUTIONS.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-white/60 leading-relaxed">
            I partner with startups and forward-thinking teams to design, build, and ship modern web platforms, intelligent AI features, and mobile apps.
          </p>
        </div>
      </div>

      {/* STACKING CARDS SCROLL CONTAINER */}
      <div className="max-w-6xl mx-auto relative pb-32">
        <div className="space-y-10 sm:space-y-12">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const isHovered = activeCard === idx;
            const stickyTop = `calc(85px + ${idx * 26}px)`;

            return (
              <div
                key={service.title}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                style={{ 
                  top: stickyTop,
                  zIndex: idx + 10
                }}
                className="sticky rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 border border-white/10 group bg-[#0a0b12]/95 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(37,99,235,0.1)] hover:border-blue-500/40"
              >
                {/* TOP ACCENT LINE */}
                <div 
                  className="absolute top-0 left-8 right-8 h-[2px] transition-all duration-500 rounded-full"
                  style={{
                    background: isHovered 
                      ? `linear-gradient(90deg, transparent, ${service.accent}, transparent)` 
                      : "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)"
                  }}
                />

                {/* CARD HEADER */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                      style={{
                        backgroundColor: `${service.accent}15`,
                        color: service.accent,
                        border: `1px solid ${service.accent}40`
                      }}
                    >
                      {service.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Available for projects
                    </span>
                  </div>

                  <span className="text-xl font-bold text-white/30 group-hover:text-blue-400 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* MAIN SPLIT CONTENT: LIST ON LEFT, RESPONSIVE IMAGE ON RIGHT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* LEFT COLUMN: TITLE, TAGLINE & DELIVERABLES */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-3.5 mb-3">
                        <div 
                          className="p-3 rounded-2xl transition-all duration-300 shrink-0"
                          style={{
                            backgroundColor: isHovered ? service.accent : "rgba(37, 99, 235, 0.12)",
                            color: isHovered ? "#ffffff" : service.accent,
                            border: `1px solid ${service.accent}30`,
                            boxShadow: isHovered ? `0 0 20px ${service.accent}50` : "none"
                          }}
                        >
                          <Icon size={24} strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-white/60 mt-1">
                            {service.tagline}
                          </p>
                        </div>
                      </div>

                      {/* CLEAN BULLET POINTS */}
                      <div className="mt-6 pt-5 border-t border-white/5 space-y-2.5">
                        {service.deliverables.map((item) => (
                          <div 
                            key={item} 
                            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-colors group/item"
                          >
                            <CheckCircle2 
                              size={16} 
                              style={{ color: service.accent }} 
                              className="shrink-0 mt-0.5" 
                            />
                            <span className="text-sm text-white/80 leading-relaxed group-hover/item:text-white transition-colors">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CARD FOOTER */}
                    <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span 
                          className="font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                          style={{ 
                            backgroundColor: `${service.accent}12`,
                            color: service.accent,
                            border: `1px solid ${service.accent}30`
                          }}
                        >
                          <Zap size={13} />
                          {service.highlight}
                        </span>
                      </div>

                      <a
                        href="#hire"
                        className="inline-flex items-center gap-2 font-medium text-white/70 hover:text-blue-400 transition-colors group/link"
                      >
                        <span>Start a Project</span>
                        <ArrowUpRight size={15} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: SERVICE IMAGE VIEWPORT */}
                  <div className="lg:col-span-5 relative w-full aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/40 transition-all duration-500 shadow-2xl bg-[#030305]">
                    
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: service.accent }} />
                      <span>{service.category}</span>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* FRIENDLY CALL TO ACTION */}
      <div className="max-w-6xl mx-auto mt-16 relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-[#0c101c] via-[#080b14] to-[#040406] shadow-2xl">
          
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Have a project in mind? Let&apos;s build it together.
            </h4>
            <p className="text-sm text-white/60 max-w-xl">
              Available for freelance development, contract sprints, and full-time technical leadership.
            </p>
          </div>

          <a
            href="#hire"
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 text-white text-sm font-semibold tracking-wide hover:bg-blue-500 transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] whitespace-nowrap active:scale-[0.98]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </a>

        </div>
      </div>

    </section>
  );
}
