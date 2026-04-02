"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Code, BookOpen, Microscope, Zap, Database } from "lucide-react";

export default function BioSection() {
  return (
    <section id="about" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 py-24 px-6 md:px-20 overflow-hidden">
      
      {/* Background Grid - Matching Hero */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />

      {/* HEADER: Section Title */}
      <div className="relative z-10 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-[1px] w-8 bg-blue-500" />
          <span className="text-[10px] font-mono tracking-[0.4em] text-blue-500 uppercase italic">Operator_Profile // 01</span>
        </motion.div>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
          THE <span className="text-zinc-800 not-italic">BIOMETRICS.</span>
        </h2>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: THE TIMELINE (3/12) */}
        <div className="md:col-span-3 space-y-12 border-l border-zinc-900 pl-6">
          <h3 className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-8">// Lifecycle_Events</h3>
          
          {[
            { year: "2023", event: "Founder @ Thecla", detail: "Ed-tech architecture design." },
            { year: "2024", event: "EEE Engineering", detail: "Signal Processing & Logic Boards." },
            { year: "2025", event: "Next.js Expert", detail: "High-scale full-stack systems." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-zinc-800 group-hover:bg-blue-500 transition-colors" />
              <span className="text-blue-500 font-mono text-[10px]">{item.year}</span>
              <h4 className="text-white text-sm font-bold mt-1 uppercase tracking-tight">{item.event}</h4>
              <p className="text-zinc-600 text-[10px] uppercase mt-1 leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* CENTER COLUMN: THE NARRATIVE (5/12) */}
        <div className="md:col-span-5 space-y-8">
           <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Microscope size={40} className="text-blue-500" />
              </div>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                "I view software like <span className="text-white font-medium italic">Electrical Circuits</span>. Every component must have a purpose, and every signal must reach its destination with zero noise."
              </p>
              <p className="text-zinc-500 text-sm mt-6 leading-relaxed">
                As an EEE student, my approach to the web is rooted in hardware precision. Whether I'm building <span className="text-blue-400">Thecla</span> to empower African talent or optimizing a database schema, I focus on the structural integrity of the code.
              </p>
              <div className="mt-10 flex gap-4">
                 <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                   Current: EEE_309_Research
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: THE SPECS (4/12) */}
        <div className="md:col-span-4 grid grid-cols-1 gap-4">
           
           <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/30 group hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                 <Code className="text-blue-500" size={18} />
                 <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Primary_Stack</span>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[9px] text-zinc-500">
                 {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'].map(s => (
                   <span key={s} className="px-2 py-1 bg-black rounded border border-white/5">{s}</span>
                 ))}
              </div>
           </div>

           <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/30 group hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                 <Database className="text-blue-500" size={18} />
                 <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Engineering_Tools</span>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[9px] text-zinc-500">
                 {['MATLAB', 'AWS', 'Docker', 'Prisma', 'Framer Motion'].map(s => (
                   <span key={s} className="px-2 py-1 bg-black rounded border border-white/5">{s}</span>
                 ))}
              </div>
           </div>

           {/* DOWNLOAD CV / ACTION */}
           <motion.div 
             whileHover={{ x: 5 }}
             className="p-6 rounded-2xl bg-blue-600 cursor-pointer flex items-center justify-between group"
           >
              <div className="text-white">
                 <h4 className="font-black italic uppercase tracking-tighter text-lg">Download Spec_Sheet</h4>
                 <p className="text-[9px] font-mono text-blue-100 uppercase tracking-[0.2em] opacity-70">Resume.pdf // v2024</p>
              </div>
              <Zap className="text-white fill-white group-hover:scale-125 transition-transform" />
           </motion.div>

        </div>

      </div>

      {/* Industrial Footer Label */}
      <div className="mt-32 border-t border-white/5 pt-8 flex justify-between items-center opacity-30 font-mono text-[8px] text-zinc-600 uppercase tracking-[0.6em]">
         <span>System_Andrew_Oche</span>
         <span>Protocol: Architecture_Dossier</span>
      </div>
    </section>
  );
}