"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Box, Zap, Cpu, Database, Terminal, Lock } from "lucide-react";
import { cn } from "@/components/lib/utils"; // Fixed the double slash in your import

// --- TYPEWRITER COMPONENT ---
const Typewriter = ({ text, delay = 40 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setCurrentText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);
  return <span>{currentText}</span>;
};

const EmptyNode = ({ id }: { id: string }) => (
  <div className="group relative flex flex-col justify-center items-center p-12 border-b border-r border-white/5 bg-black/40 min-h-[350px]">
    <div className="absolute top-6 left-8 font-mono text-[10px] text-zinc-800">[{id}]</div>
    <Lock size={20} className="text-zinc-900 group-hover:text-blue-500/20 transition-colors duration-500" />
    <div className="mt-4 font-mono text-[9px] text-zinc-800 uppercase tracking-[0.3em]">Node_Locked</div>
    <div className="mt-2 h-[1px] w-0 bg-blue-500/20 group-hover:w-12 transition-all duration-700" />
  </div>
);

export default function ProjectSection() {
  return (
    <section id="projects" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row overflow-hidden">
      
      {/* Background Decorative "01" */}
      <div className="absolute -bottom-10 -left-10 text-[20rem] font-black text-white/[0.01] select-none pointer-events-none italic">
        01
      </div>

      {/* --- LEFT SIDE: THE MANIFESTO (40%) --- */}
      <div className="w-full md:w-[40%] p-8 md:p-20 flex flex-col justify-between border-r border-white/5 bg-[#0d0d0d] sticky top-0 md:h-screen z-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <Terminal size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">System_Reboot // 2026</span>
          </motion.div>

          <h2 className="text-5xl md:text-[2.9rem] lg:text-[4.7rem] xl:text-[6.2rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic">
            FRESH <br />
            <span className="text-zinc-800 not-italic">START.</span>
          </h2>
          
          <div className="mt-10 max-w-xs">
            <p className="text-zinc-500 text-xs font-mono leading-relaxed uppercase tracking-widest italic">
              <Typewriter text="Legacy projects purged. Initiating 90-day production sprint. Every new build will be logged here in real-time." />
            </p>
          </div>
        </div>

        {/* LIVE SPRINT STATS */}
        <div className="mt-20 space-y-6">
          <div className="p-6 border border-blue-500/20 bg-blue-500/[0.02] rounded-xl font-mono text-[9px] uppercase space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-600">Current_Sprint</span>
              <span className="text-blue-500">90_Day_Challenge</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Status</span>
              <span className="text-emerald-500 animate-pulse italic">Waiting_for_Day_01</span>
            </div>
            <div className="w-full h-[2px] bg-zinc-900 mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "2%" }} 
                  className="h-full bg-blue-600 shadow-[0_0_10px_#2563eb]" 
                />
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-zinc-800">
             <Cpu size={20} className="hover:text-blue-500/40 transition-colors" />
             <Zap size={20} className="hover:text-blue-500/40 transition-colors" />
             <Database size={20} className="hover:text-blue-500/40 transition-colors" />
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE VOID GRID (60%) --- */}
      <div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 bg-black relative">
        
        {/* HERO ENTRY: THE ANNOUNCEMENT */}
        <div className="md:col-span-2 p-12 md:p-20 border-b border-white/5 flex flex-col justify-center bg-gradient-to-br from-blue-600/[0.02] to-transparent">
           <span className="text-[10px] font-mono text-blue-500 uppercase mb-4 tracking-[0.5em]">Upcoming_Production</span>
           <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
             Day 01 Deployment <br/>
             <span className="text-zinc-800 not-italic">Pending_Signal</span>
           </h3>
           <p className="mt-6 text-zinc-600 text-sm font-mono uppercase max-w-md">
             The repository is currently empty to facilitate a clean architectural slate. check back within 24 hours for the first node initialization.
           </p>
        </div>

        {/* LOCKED NODES */}
        <EmptyNode id="NODE_01" />
        <EmptyNode id="NODE_02" />
        <EmptyNode id="NODE_03" />
        <EmptyNode id="NODE_04" />

        {/* BOTTOM FULL-WIDTH LINK */}
        <motion.div 
          whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.05)" }}
          className="md:col-span-2 p-12 flex items-center justify-between group cursor-wait border-b border-white/5"
        >
          <h4 className="text-2xl font-bold text-zinc-800 uppercase italic tracking-tighter group-hover:text-white transition-colors">
            Awaiting instructions_
          </h4>
          <div className="p-4 rounded-full border border-zinc-900 group-hover:border-blue-600 transition-all">
              <ArrowRight size={24} className="text-zinc-900 group-hover:text-blue-600" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}