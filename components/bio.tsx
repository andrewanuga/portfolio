"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Code, BookOpen, Microscope, Zap, Database, Download } from "lucide-react";

export default function BioSection() {
  return (
    <section id="about" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 py-24 px-6 md:px-20 overflow-hidden">
      
      {/* Background Decorative "01" */}
        <div className="absolute -bottom-10 -left-10 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
          01
        </div>

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
          <span className="text-[10px] font-mono tracking-[0.4em] text-blue-500 uppercase italic">Operator_Profile // 02</span>
        </motion.div>
        <h2 className="text-6xl md:text-[4.6rem] lg:text-[6.7rem] xl:text-[10rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic">
          MY <span className="text-zinc-800 not-italic">BIO.</span>
        </h2>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: THE TIMELINE (3/12) */}
        <div className="md:col-span-3 space-y-12 border-l border-zinc-900 pl-6">
          <h3 className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-8">// Lifecycle_Events</h3>
          
          {[
            { year: "since 2023", event: "Full Stack Web Developer", detail: "4 years experienced with building scalable web application." },
            { year: "2026", event: "Mobile App Developer", detail: "Building Mobile application with React Native" },
            { year: "2026", event: "Founder @ Thecla", detail: "Currently trying to build a startup." },
            { year: "2023-2027", event: "Electrical Engineering Student", detail: "Studying at Federal University of Technology Akure." }
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
                "Building <span className="text-white font-medium italic">high-fidelity</span> full-stack systems: where every component has a purpose and every signal reaches the user with zero noise."
              </p>
              <p className="text-zinc-500 text-sm mt-6 leading-relaxed">
                I’m a Full-Stack Developer who actually enjoys the bridge between a messy database and a pixel-perfect UI. To me, coding isn't just about making things work—it's about making things work well for the people using them.

                I spend my days (and sometimes nights) navigating the logic of Node and Express Js and crafting responsive, snappy interfaces with React Js/ Next JS. Whether I'm optimizing a complex API or fine-tuning a CSS transition, I’m driven by the challenge of building tools that feel intuitive and effortless.

                When I’m not in my IDE, I’m usually exploring [A Secondary Interest: e.g., cloud architecture, UX psychology, or open-source projects]. I’m a big believer in clean code, honest communication, and the idea that the best solution is usually the simplest one. <span className="text-blue-400">Thecla</span>.
              </p>
              <div className="mt-10 flex gap-4">
                 <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                   Current: Learning Web3 and building
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
                 {['React', 'Next.js', 'TypeScript','Express JS', 'Framer Motion', 'Node.js','React Native' , 'PostgreSQL', 'Mongo DB'].map(s => (
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
                 {['MATLAB', 'AWS', 'Docker', 'Prisma', 'Python', 'Javascript'].map(s => (
                   <span key={s} className="px-2 py-1 bg-black rounded border border-white/5">{s}</span>
                 ))}
              </div>
           </div>

           {/* DOWNLOAD CV / ACTION */}
          <motion.a 
            href="/Adakole_Andrew_Oche_Resume.pdf"
            download
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-between w-full max-w-xs p-6 rounded-2xl bg-blue-600 text-white overflow-hidden transition-all shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-70">Curriculum_Vitae</span>
              <h3 className="text-xl font-black italic uppercase tracking-tighter mt-1">Download_CV</h3>
            </div>
            <div className="relative z-10 p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
              <Download size={20} />
            </div>
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.a>

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