"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Layers, Zap, Terminal, Share2 } from "lucide-react";
import { cn } from "@/components/lib/utils";

const ServiceModule = ({ 
  icon: Icon, 
  title, 
  code, 
  description, 
  features, 
  status 
}: { 
  icon: any; 
  title: string; 
  code: string; 
  description: string; 
  features: string[]; 
  status: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative border-b border-r border-white/5 p-8 hover:bg-blue-600/[0.02] transition-all duration-500"
  >
    {/* Identification Tag */}
    <div className="flex justify-between items-start mb-12">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-500 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <span className="font-mono text-[9px] text-zinc-600 tracking-[0.3em] uppercase group-hover:text-blue-500/50">
        {code}
      </span>
    </div>

    {/* Content */}
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic group-hover:not-italic transition-all">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
        {description}
      </p>
    </div>

    {/* Live Specs - Revealed on Hover */}
    <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
      {features.map((f) => (
        <span key={f} className="text-[8px] font-mono text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">
          {f}
        </span>
      ))}
    </div>

    {/* Status Indicator */}
    <div className="absolute bottom-4 right-4 flex items-center gap-2">
      <div className="h-1 w-1 rounded-full bg-blue-500 group-hover:animate-ping" />
      <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">{status}</span>
    </div>
  </motion.div>
);

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row min-h-screen">
      
      {/* --- LEFT SIDE: LABELING (40%) --- */}
      <div className="w-full md:w-[40%] p-8 md:p-20 flex flex-col justify-between border-r border-white/5 relative overflow-hidden">
        
        {/* Background Decorative "02" */}
        <div className="absolute -bottom-10 -left-10 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
          02
        </div>

        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="h-[1px] w-12 bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Capabilities_Matrix</span>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none italic">
            CORE <br />
            <span className="text-zinc-800 not-italic">SERVICES.</span>
          </h2>
          
          <p className="mt-8 text-zinc-500 text-sm font-light leading-relaxed max-w-xs uppercase tracking-wider">
            Deploying high-performance logic across digital and physical domains.
          </p>
        </div>

        {/* System Load Mockup */}
        <div className="mt-20 space-y-4">
          <div className="flex justify-between font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
            <span>Server_Load</span>
            <span>Optimized</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={cn("h-1 flex-1 rounded-full", i < 6 ? "bg-blue-600" : "bg-zinc-900")} />
            ))}
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: MODULE GRID (60%) --- */}
      <div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2">
        
        <ServiceModule 
          icon={Code2}
          code="MOD_01"
          title="Full-Stack Web"
          description="Architecture of scalable Next.js ecosystems with industrial-grade TypeScript safety."
          features={['NEXT.JS', 'TYPESCRIPT', 'PRISMA', 'AWS']}
          status="READY"
        />

        <ServiceModule 
          icon={Layers}
          code="MOD_02"
          title="Startup Engine"
          description="From MVP to Scale. Building the backbone of Thecla and early-stage ventures."
          features={['SAAS', 'PRODUCT STRATEGY', 'SCALABILITY']}
          status="ACTIVE"
        />

        <ServiceModule 
          icon={Cpu}
          code="MOD_03"
          title="EEE Logic"
          description="Hardware-software interface systems using signal processing and logic board design."
          features={['MATLAB', 'DSP', 'CIRCUIT DESIGN']}
          status="STABLE"
        />

        <ServiceModule 
          icon={Globe}
          code="MOD_04"
          title="Digital Infra"
          description="Cloud-native deployment pipelines and automated DevOps protocols."
          features={['DOCKER', 'CI/CD', 'TERRAFORM']}
          status="ONLINE"
        />

        {/* BOTTOM FULL-WIDTH CTA MODULE */}
        <motion.div 
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
          className="md:col-span-2 p-12 flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer group"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-full bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <Terminal size={24} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white uppercase italic tracking-tighter">Need a custom system?</h4>
              <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest mt-1">[ Initiate_Handshake ]</p>
            </div>
          </div>
          <button className="px-8 py-4 border border-white/10 rounded-full text-[10px] font-mono text-white uppercase tracking-[0.3em] group-hover:border-blue-500 transition-all">
            Get_In_Touch
          </button>
        </motion.div>
      </div>

    </section>
  );
}