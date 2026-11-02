"use client";

import React from "react";
import Image from "next/image";
import { 
  Code2, 
  BrainCircuit, 
  Bot, 
  Smartphone, 
  CheckCircle2, 
  ArrowUpRight
} from "lucide-react";

type Service = {
  index: string;
  title: string;
  category: string;
  tagline: string;
  deliverables: string[];
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

const SERVICES: Service[] = [
  {
    index: "01",
    title: "Web App Development",
    category: "Full-Stack Web",
    tagline: "Fast, modern, and responsive web platforms",
    deliverables: [
      "Custom web applications built with Next.js and React",
      "High-performance architecture with fast page load times",
      "Secure user authentication, databases & payment processing",
      "Clean, maintainable codebase engineered for scale",
      "Search engine optimization (SEO) and cross-device accessibility"
    ],
    image: "/assets/full-stack.jpg",
    icon: Code2
  },
  {
    index: "02",
    title: "AI & Machine Learning",
    category: "Machine Learning",
    tagline: "Intelligent systems tailored to your product needs",
    deliverables: [
      "Custom machine learning models tailored to business data",
      "Semantic search, smart recommendations & vector embeddings",
      "High-speed APIs connecting AI models directly to your apps",
      "Intelligent text, image, and data processing workflows",
      "Continuous performance testing and model evaluation"
    ],
    image: "/assets/ai-ml.jpg",
    icon: BrainCircuit
  },
  {
    index: "03",
    title: "AI Agents & Automation",
    category: "Automation",
    tagline: "Automate repetitive workflows with smart assistants",
    deliverables: [
      "Intelligent AI agents that can search, analyze, and take actions",
      "Automated document processing and research assistants",
      "Interactive customer support and internal knowledge bots",
      "Reliable error handling and human-in-the-loop safety checks",
      "Seamless integration into email, Slack, and internal tools"
    ],
    image: "/assets/agentic-ai.jpg",
    icon: Bot
  },
  {
    index: "04",
    title: "Mobile App Development",
    category: "iOS & Android",
    tagline: "Fluid, native performance mobile applications",
    deliverables: [
      "Cross-platform iOS and Android apps with React Native & Expo",
      "Silky smooth 60 FPS animations and intuitive touch gestures",
      "Offline support so the app works seamlessly anywhere",
      "Biometric security, push notifications & device APIs",
      "End-to-end publishing to Apple App Store & Google Play"
    ],
    image: "/assets/mobile-app.avif",
    icon: Smartphone
  }
];

export default function ServicesSection() {
  return (
    <section 
      id="services" 
      className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 py-28 px-4 sm:px-6 md:px-14 rounded-t-[40px] sm:rounded-t-[56px] md:rounded-t-[64px] shadow-[0_-25px_60px_rgba(0,0,0,0.35)] relative z-20 overflow-visible"
    >
      
      {/* SUBTLE AMBIENT ACCENT GLOW FOR LIGHT BACKGROUND */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/[0.08] via-cyan-500/[0.05] to-blue-600/[0.07] blur-[160px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>What I Offer</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-none">
              SERVICES &amp; <span className="text-slate-400 font-light">SOLUTIONS.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-slate-600 leading-relaxed font-medium">
            I partner with startups and forward-thinking teams to design, build, and ship modern web platforms, intelligent AI features, and mobile apps.
          </p>
        </div>
      </div>

      {/* STACKING CARDS SCROLL CONTAINER */}
      <div className="max-w-6xl mx-auto relative pb-32">
        <div className="space-y-10 sm:space-y-12">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const stickyTop = `calc(85px + ${idx * 26}px)`;

            return (
              <div
                key={service.title}
                style={{ 
                  top: stickyTop,
                  zIndex: idx + 10
                }}
                className="sticky rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-300 border border-slate-200/80 group bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.06)] hover:border-blue-500/40 hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.12)]"
              >
                {/* CARD HEADER */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-50 text-blue-700 border border-blue-100">
                    {service.category}
                  </span>

                  <span className="text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* MAIN SPLIT CONTENT: LIST ON LEFT, RESPONSIVE IMAGE ON RIGHT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* LEFT COLUMN: TITLE, TAGLINE & DELIVERABLES */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shrink-0">
                          <Icon size={22} strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1 font-medium">
                            {service.tagline}
                          </p>
                        </div>
                      </div>

                      {/* CLEAN BULLET POINTS */}
                      <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                        {service.deliverables.map((item) => (
                          <div 
                            key={item} 
                            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/60 hover:border-blue-100 transition-colors group/item"
                          >
                            <CheckCircle2 
                              size={16} 
                              className="text-blue-600 shrink-0 mt-0.5" 
                            />
                            <span className="text-sm text-slate-700 leading-relaxed group-hover/item:text-slate-900 font-medium transition-colors">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CARD FOOTER */}
                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Tailored Architecture &amp; Delivery
                      </span>

                      <a
                        href="#hire"
                        className="inline-flex items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-colors group/link"
                      >
                        <span>Start a Project</span>
                        <ArrowUpRight size={15} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: SERVICE IMAGE VIEWPORT */}
                  <div className="lg:col-span-5 relative w-full aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 group-hover:border-blue-500/40 transition-all duration-300 shadow-lg bg-slate-100">
                    
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white font-medium">
                      <span>{service.category}</span>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* CALL TO ACTION BANNER */}
      <div className="max-w-6xl mx-auto mt-16 relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 bg-[#090b12] text-white shadow-2xl">
          
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
            className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-blue-600 text-white text-sm font-semibold tracking-wide hover:bg-blue-500 transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] whitespace-nowrap active:scale-[0.98] cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </a>

        </div>
      </div>

    </section>
  );
}
