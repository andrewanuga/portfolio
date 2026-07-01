"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Code, BookOpen, Microscope, Zap, Database, Download, Cpu } from "lucide-react";

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
            { year: "2026", event: "AI / ML Engineer", detail: "Building ML pipelines and models with Python, PyTorch & TensorFlow." },
            { year: "2026", event: "Agentic AI Engineer", detail: "Designing autonomous, tool-using AI agents with LLMs and LangGraph." },
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
                "Building <span className="text-white font-medium italic">high-fidelity</span> systems where full-stack engineering meets applied AI — every component with a purpose, every signal reaching the user with zero noise."
              </p>
              <p className="text-zinc-500 text-sm mt-6 leading-relaxed">
                I&apos;m a Full-Stack &amp; AI Engineer who lives at the bridge between a messy database, a pixel-perfect UI, and a model that actually ships. To me, engineering isn&apos;t just about making things work — it&apos;s about making them work well for the people using them.
              </p>
              <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                Day to day I architect scalable web platforms with Next.js, Node and TypeScript, and design ML pipelines and agentic AI systems with Python, PyTorch and LLMs — RAG, tool-using agents and autonomous workflows. Whether I&apos;m optimizing an API, fine-tuning a model, or orchestrating a multi-agent system, I&apos;m driven by building tools that feel intuitive and effortless.
              </p>
              <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                I believe in clean code, honest communication, and the idea that the best solution is usually the simplest one. Currently building <span className="text-blue-400">Thecla</span>.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                 <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                   Current: Building Agentic AI systems
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
                 <Cpu className="text-blue-500" size={18} />
                 <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">AI_/_ML_Stack</span>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[9px] text-zinc-500">
                 {['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'OpenAI', 'Anthropic', 'Hugging Face', 'RAG'].map(s => (
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
                 {['MATLAB', 'AWS', 'Docker', 'Prisma', 'Vector DBs', 'Javascript'].map(s => (
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