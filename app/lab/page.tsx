"use client";

import React from "react";
import { motion } from "framer-motion";
import { Microscope, FlaskConical, Beaker, Binary, Construction, BoxSelect, Radio, Activity } from "lucide-react";
import { cn } from "@/components/lib/utils";
import NavBar from "@/components/navbar";

const LabModule = ({ 
  title, 
  status, 
  progress, 
  tags, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  status: "IN_ALPHA" | "STABLE" | "DEPRECATED" | "PROTOTYPING"; 
  progress: number; 
  tags: string[]; 
  description: string;
  icon: any;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="group relative p-8 border border-white/5 bg-[#0d0d0d] rounded-3xl hover:bg-blue-600/[0.02] transition-all duration-700 overflow-hidden"
  >
    <NavBar />
    {/* Blueprint Overlay */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" 
         style={{ backgroundImage: 'radial-gradient(#3b82f6 0.8px, transparent 0.8px)', backgroundSize: '16px 16px' }} />

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-12">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-500 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-end">
          <span className={cn(
            "text-[8px] font-mono px-2 py-1 rounded border mb-2 tracking-widest",
            status === "IN_ALPHA" ? "border-amber-500/30 text-amber-500 bg-amber-500/5" : "border-blue-500/30 text-blue-500 bg-blue-500/5"
          )}>
            {status}
          </span>
          <span className="text-[10px] font-mono text-zinc-700 tracking-tighter uppercase italic">{progress}%_COMPILE</span>
        </div>
      </div>

      <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-blue-500 transition-colors">
        {title}
      </h3>
      <p className="text-zinc-500 text-xs leading-relaxed mb-8 max-w-[260px]">
        {description}
      </p>

      {/* Progress Bar */}
      <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden mb-6">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[7px] font-mono text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded uppercase">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function LabSpace() {
  return (
    <section id="lab" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row">
      
      {/* --- LEFT SIDE: RESEARCH OPS (40%) --- */}
      <div className="w-full md:w-[40%] p-8 md:p-20 flex flex-col justify-between border-r border-white/5 bg-[#0a0a0a] sticky top-0 md:h-screen">
        
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <Microscope size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">R&D_Environment</span>
          </motion.div>

          <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter text-white uppercase leading-[0.85] italic">
            THE <br />
            <span className="text-zinc-800 not-italic">LAB.</span>
          </h2>
          
          <p className="mt-10 text-zinc-500 text-sm font-light leading-relaxed max-w-xs uppercase tracking-widest">
            Welcome to <span className="text-white">Workspace_01</span>. This is where I stress-test new logic, prototype hardware interfaces, and build the future of <span className="text-blue-400">Thecla</span>.
          </p>
        </div>

        {/* LIVE SYSTEM ACTIVITY */}
        <div className="mt-20 p-6 border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden relative">
           <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                 <Activity size={12} className="text-emerald-500" /> Current_Focus
              </span>
              <span className="text-[8px] font-mono text-zinc-800 tracking-[0.3em]">LIVE_LOG</span>
           </div>
           
           <div className="space-y-3 font-mono text-[10px]">
              <p className="text-zinc-500 italic">“Optimizing Thecla backend for low-latency in Lagos.”</p>
              <div className="flex gap-1 h-1">
                 {[1,1,1,0.4,1,1,0.2].map((op, i) => (
                    <div key={i} className="flex-1 bg-blue-600" style={{ opacity: op }} />
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: PROJECT PIPELINE (60%) --- */}
      <div className="w-full md:w-[60%] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 self-start">
        
        <LabModule 
          title="Thecla_Edge"
          status="IN_ALPHA"
          progress={65}
          icon={Radio}
          description="A decentralized edge-network protocol designed specifically for offline-first ed-tech apps in Nigeria."
          tags={['RUST', 'P2P', 'THECLA']}
        />

        <LabModule 
          title="Neural_Logic"
          status="PROTOTYPING"
          progress={30}
          icon={Binary}
          description="Mapping EEE signal processing filters into AI-driven UI components for predictable state transitions."
          tags={['MATLAB', 'REACT', 'DSP']}
        />

        <LabModule 
          title="Circuit_Dash"
          status="STABLE"
          progress={95}
          icon={BoxSelect}
          description="A high-contrast visual dashboard for real-time monitoring of IoT hardware sensors."
          tags={['NEXT.JS', 'MQTT', 'IOT']}
        />

        <LabModule 
          title="Module_X"
          status="PROTOTYPING"
          progress={12}
          icon={Construction}
          description="Classified R&D: Exploring the intersection of digital identity and EEE-based hardware security keys."
          tags={['SECURITY', 'HARDWARE']}
        />

        {/* INDUSTRIAL GRID DECOR */}
        <div className="md:col-span-2 mt-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-20 font-mono text-[8px] text-zinc-700 uppercase tracking-[0.5em]">
           <span>Authorized_Personnel_Only</span>
           <span className="hidden md:block">/// BUILDING_BEYOND_THE_SCREEN ///</span>
           <span>EST_2024_LAB_OPS</span>
        </div>
      </div>

    </section>
  );
}