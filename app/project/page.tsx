"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, GlobeX , Cpu, Layout, Zap, Layers, ChevronRight } from "lucide-react";
import { cn } from "@/components/lib/utils";
import NavBar from "@/components/navbar";

const BuildStep = ({ number, title, description, active = false }: any) => (
  <div className={cn(
    "relative pl-8 border-l pb-12 transition-colors",
    active ? "border-blue-500" : "border-zinc-800"
  )}>
    <div className={cn(
      "absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 bg-black transition-all",
      active ? "border-blue-500 shadow-[0_0_10px_#3b82f6]" : "border-zinc-800"
    )} />
    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Phase_{number}</span>
    <h4 className={cn("text-sm font-bold uppercase mt-1", active ? "text-white" : "text-zinc-600")}>{title}</h4>
    <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed uppercase">{description}</p>
  </div>
);

export default function ProjectShowcase() {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] text-white">
      
      <NavBar />
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <button className="group flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-white transition-all">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          RETURN_TO_ARCHIVE
        </button>
        <div className="flex gap-6">
          <GlobeX size={18} className="text-zinc-600 hover:text-white cursor-pointer" />
          <Globe size={18} className="text-zinc-600 hover:text-blue-500 cursor-pointer" />
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        
        {/* --- LEFT SIDE: THE BLUEPRINT TRACKER (30%) --- */}
        <aside className="w-full md:w-[30%] p-8 md:p-12 md:sticky md:top-20 md:h-[calc(100vh-80px)] overflow-y-auto border-r border-white/5">
          <div className="mb-12">
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em]">Project_Dossier // 001</span>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic mt-4">THECLA<br/>V1.0</h1>
          </div>

          <div className="space-y-0">
            <BuildStep number="01" title="Problem Identification" description="Analyzing low-bandwidth constraints in West African education." active />
            <BuildStep number="02" title="Architecture Design" description="Mapping out a Next.js 15 edge-first infrastructure." active />
            <BuildStep number="03" title="UI/UX Prototyping" description="Industrial high-contrast design for focus-heavy learning." active />
            <BuildStep number="04" title="Deployment" description="Optimizing for Vercel edge functions and global CDN." />
          </div>

          <div className="mt-12 p-4 rounded-xl border border-white/5 bg-white/[0.02] font-mono text-[9px] text-zinc-600 space-y-2">
            <div className="flex justify-between"><span>STACK</span> <span className="text-blue-500">NEXT.JS / TS / PG</span></div>
            <div className="flex justify-between"><span>STATUS</span> <span className="text-emerald-500">PRODUCTION_READY</span></div>
          </div>
        </aside>

        {/* --- RIGHT SIDE: THE STORYTELLING VIEWPORT (70%) --- */}
        <main className="w-full md:w-[70%] p-8 md:p-24 space-y-32 bg-black">
          
          {/* SECTION 1: THE HERO IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative group aspect-video rounded-3xl overflow-hidden border border-white/10"
          >
             <img src="/thecla-preview.jpg" alt="Thecla UI" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             <div className="absolute bottom-8 left-8">
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">[ FIG_01: PRIMARY_INTERFACE ]</span>
             </div>
          </motion.div>

          {/* SECTION 2: THE NARRATIVE */}
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.5em] mb-8">// The_Vision</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-zinc-300 italic">
              "We didn't just want to build another LMS. We wanted to build a <span className="text-white font-bold not-italic">Learning Engine</span> that felt like a professional workstation."
            </p>
            <p className="mt-8 text-zinc-500 leading-relaxed text-lg">
              The journey of Thecla started with a simple observation: most ed-tech platforms in Nigeria are too heavy for local internet speeds. As an EEE student, I approached this as a 
              <span className="text-white"> Signal-to-Noise Ratio</span> problem. Every extra kilobyte was noise. We needed 100% signal.
            </p>
          </div>

          {/* SECTION 3: TECHNICAL SHOWCASE (GRID) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
                <div className="aspect-square rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center p-12">
                   <Layout size={80} className="text-blue-500/20" />
                </div>
                <h4 className="text-lg font-bold uppercase italic">Modular Component Architecture</h4>
                <p className="text-sm text-zinc-500 leading-relaxed uppercase font-mono text-[10px]">
                   Built using a custom-developed design system that prioritizes fast rendering and atomic design principles.
                </p>
             </div>
             <div className="space-y-6">
                <div className="aspect-square rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center p-12">
                   <Zap size={80} className="text-blue-500/20" />
                </div>
                <h4 className="text-lg font-bold uppercase italic">Edge Performance Optimization</h4>
                <p className="text-sm text-zinc-500 leading-relaxed uppercase font-mono text-[10px]">
                   Leveraging Vercel Edge Middleware to reduce Time to First Byte (TTFB) by 40% for our users in Lagos and Abuja.
                </p>
             </div>
          </div>

          {/* SECTION 4: THE LESSONS */}
          <div className="p-12 rounded-[40px] border border-blue-500/10 bg-blue-500/[0.02] relative overflow-hidden">
             <h2 className="text-xl font-black italic uppercase tracking-tight text-white mb-6">Lessons from the Build_</h2>
             <ul className="space-y-4 text-zinc-400 text-sm">
                <li className="flex items-start gap-4">
                   <ChevronRight size={14} className="text-blue-500 mt-1" />
                   <span>Don't over-engineer early. Focus on core user logic first.</span>
                </li>
                <li className="flex items-start gap-4">
                   <ChevronRight size={14} className="text-blue-500 mt-1" />
                   <span>Hardware principles (like EEE circuits) apply perfectly to software state management.</span>
                </li>
             </ul>
             <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <Layers size={200} />
             </div>
          </div>

          {/* CTA: NEXT PROJECT */}
          <div className="pt-20 border-t border-white/5 flex justify-between items-center group cursor-pointer">
             <div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase">Up_Next</span>
                <h3 className="text-4xl font-black italic uppercase group-hover:text-blue-500 transition-colors">LOGIC-V DSP_</h3>
             </div>
             <div className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                <ChevronRight size={24} />
             </div>
          </div>

        </main>
      </div>

      {/* Decorative Background Text */}
      <div className="fixed bottom-10 right-10 opacity-[0.02] font-mono text-[12vw] font-black pointer-events-none uppercase tracking-tighter italic leading-none">
        ARCHITECT
      </div>
    </section>
  );
}