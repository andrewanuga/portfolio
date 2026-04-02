"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Zap, ArrowUpRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col md:flex-row items-stretch bg-[#0a0a0a] overflow-hidden">
      
      {/* --- LEFT SIDE: THE BLUEPRINT --- */}
      <div className="relative w-full md:w-[60%] flex flex-col justify-center px-8 md:px-20 py-20 z-10 border-r border-white/5">
        
        {/* Background Engineering Grid */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-[1px] w-12 bg-blue-500" />
          <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">System_Active // 2026</span>
        </motion.div>

        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[9rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic"
          >
            ANDREW <br />
            <span className="text-transparent border-t-zinc-800" style={{ WebkitTextStroke: '1px #27272a' }}>OCHE.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -left-4 top-1/2 w-1 h-32 bg-blue-600 origin-top"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col md:flex-row gap-12 items-start"
        >
          <div className="max-w-xs space-y-4">
             <p className="text-zinc-500 text-sm font-light leading-relaxed uppercase tracking-wider">
               Bridging the gap between <span className="text-white italic">Hardware Logic</span> and <span className="text-white italic">Web Scale</span>. 
               Founder at Thecla.
             </p>
             <div className="flex gap-4">
                {/* <Linkedin size={18} className="text-zinc-700 hover:text-blue-500 cursor-pointer transition-colors" />
                <Twitter size={18} className="text-zinc-700 hover:text-white cursor-pointer transition-colors" />
                <Github size={18} className="text-zinc-700 hover:text-white cursor-pointer transition-colors" /> */}
             </div>
          </div>

          <button className="group relative flex items-center gap-4 px-8 py-4 bg-transparent border border-white/10 rounded-full text-white overflow-hidden transition-all hover:border-blue-500/50">
             <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold">Initialize Project</span>
             <ArrowUpRight size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </button>
        </motion.div>
      </div>

      {/* --- RIGHT SIDE: THE HARDWARE --- */}
      <div className="relative w-full md:w-[40%] bg-[#0d0d0d] flex items-center justify-center p-8 overflow-hidden">
        
        {/* Subtle Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%]" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative w-full h-[70vh] max-w-[450px]"
        >
          {/* Main Photo Frame */}
          <div className="w-full h-full rounded-2xl border border-white/10 bg-[#121212] overflow-hidden grayscale group hover:grayscale-0 transition-all duration-1000">
             <img 
               src="/your-photo.jpg" 
               className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
               alt="Andrew"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating Data Card 1: System Specs */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-12 p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md z-30 hidden lg:block"
          >
            <div className="flex items-center gap-3 mb-2">
              <Cpu size={14} className="text-blue-500" />
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Logic_Board</span>
            </div>
            <div className="space-y-1 font-mono text-[10px] text-zinc-500">
              <p>&gt; EEE_309_PASS</p>
              <p>&gt; NEXT_15_STABLE</p>
              <p>&gt; THECLA_OS_DEPLOYED</p>
            </div>
          </motion.div>

          {/* Floating Data Card 2: Status */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 -right-8 p-4 rounded-xl border border-blue-500/30 bg-blue-600/5 backdrop-blur-md z-30"
          >
            <div className="flex items-center gap-3">
              <Zap size={14} className="text-blue-400 fill-blue-400" />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest">Power_State</span>
                <span className="text-[10px] font-bold text-white">READY_FOR_HIRE</span>
              </div>
            </div>
          </motion.div>

          {/* Corner Decors */}
          <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-zinc-800">
            [ 09.00 GMT ]<br />
            [ LAGOS_NG ]
          </div>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

    </section>
  );
};

export default Hero;