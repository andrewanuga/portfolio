"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Cpu, Menu, X, ExternalLink, Terminal, Zap, Layers 
} from "lucide-react";
import { cn } from "@/components/lib/utils";
import NavBar from "@/components/navbar";

// --- TYPING ANIMATION COMPONENT ---
const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}<span className="animate-pulse">_</span></span>;
};

export default function ProjectShowcase() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");

  // The 90-Day Challenge Narrative
  const challengeManifesto = "PROTOCOL: FRESH_START. All legacy nodes have been archived. This repository is now dedicated to my 90-Day Challenge. Every new project built within this sprint will be deployed here as a live node. Standby for Day 01 deployment.";

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <NavBar />
      
      {/* --- MINIMALIST PROJECT SWITCHER (Locked for Challenge) --- */}
      <div className="fixed bottom-8 left-8 z-[200]">
        <button 
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex items-center gap-3 bg-zinc-900 border border-white/10 text-white px-5 py-3 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest hover:border-blue-500 transition-all shadow-2xl"
        >
          {isNavOpen ? <X size={16} /> : <Terminal size={16} />}
          {isNavOpen ? "Close_System" : "System_Status"}
        </button>

        <AnimatePresence>
          {isNavOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full mb-4 left-0 w-80 bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                 <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                 <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Repository_Log</span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase italic">
                {systemStatus === "INITIALIZING" ? (
                  <TypewriterText text="Wiping legacy data... Setting up 90-day environment... Ready." />
                ) : "Ready for Day 01."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- TOP NAVIGATION --- */}
      <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <button onClick={() => window.history.back()} className="group flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-white transition-all uppercase">
          <ArrowLeft size={14} className="text-blue-500" /> Back_to_Origin
        </button>
        <div className="text-[10px] font-mono text-blue-500 animate-pulse tracking-[0.3em]">
          CHALLENGE_MODE_ACTIVE
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        
        {/* --- LEFT SIDE: TRACKER (Static for now) --- */}
        <aside className="w-full md:w-[35%] p-8 md:p-12 md:sticky md:top-20 md:h-[calc(100vh-80px)] border-r border-white/5 bg-[#0d0d0d]">
          <div className="mb-12">
            <span className="text-[9px] font-mono text-blue-500 uppercase tracking-[0.4em] block mb-4">Current_Phase: 00</span>
            <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-[0.8] mb-2">90_DAYS<br/><span className="text-zinc-800 not-italic">SPRINT.</span></h1>
            <p className="text-[10px] font-mono text-zinc-600 uppercase mt-4 max-w-[200px]">The journey of a thousand nodes begins with Day One.</p>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-mono text-blue-500 uppercase">Sprint_Progress</span>
                    <span className="text-2xl font-black italic">0%</span>
                </div>
                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "2%" }} className="h-full bg-blue-500" />
                </div>
            </div>
          </div>
        </aside>

        {/* --- RIGHT SIDE: TYPING MANIFESTO --- */}
        <main className="w-full md:w-[65%] p-8 md:p-24 bg-black flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="mb-12 inline-flex items-center gap-4 px-4 py-2 border border-white/10 rounded-full bg-white/5 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
               <Zap size={12} className="text-blue-500" /> System_Broadcast_Incoming
            </div>

            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-12 leading-tight">
               Everything new starts <span className="text-zinc-800 not-italic">Here.</span>
            </h2>

            <div className="min-h-[150px] font-mono text-lg md:text-xl text-zinc-500 leading-relaxed uppercase">
               <TypewriterText text={challengeManifesto} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
               <div className="p-8 border border-white/5 bg-[#0d0d0d] rounded-3xl group">
                  <Layers size={32} className="text-zinc-800 group-hover:text-blue-500 transition-colors mb-6" />
                  <h3 className="font-bold uppercase text-white mb-2 tracking-tighter">Clean Slate Policy</h3>
                  <p className="text-xs text-zinc-600 uppercase leading-relaxed">Previous works moved to legacy storage. Focus is exclusively on 2026 sprint output.</p>
               </div>
               <div className="p-8 border border-blue-600/30 bg-blue-600/5 rounded-3xl">
                  <div className="flex justify-between items-start mb-6">
                    <Cpu size={32} className="text-blue-500" />
                    <span className="bg-blue-600 text-[8px] font-bold px-2 py-1 rounded">LIVE</span>
                  </div>
                  <h3 className="font-bold uppercase text-white mb-2 tracking-tighter">Next Deployment</h3>
                  <p className="text-xs text-zinc-500 uppercase leading-relaxed font-mono animate-pulse text-blue-400">Awaiting Day_01 project input...</p>
               </div>
            </div>
          </div>
        </main>
      </div>

      {/* Decorative BG Text */}
      <div className="fixed bottom-10 right-10 opacity-[0.03] font-mono text-[15vw] font-black pointer-events-none uppercase tracking-tighter italic leading-none select-none">
        SPRINT
      </div>
    </section>
  );
}