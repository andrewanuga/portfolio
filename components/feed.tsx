"use client"

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Cpu, Rocket } from "lucide-react";
import { cn } from "@/components/lib/utils"; // Standard Shadcn utility

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    whileHover={{ scale: 1.01, rotate: 0.5 }}
    className={cn(
      "bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-hidden group",
      className
    )}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 grain-bg font-sans">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        
        {/* Profile Card */}
        <BentoCard className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-zinc-900 to-black">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden">
               {/* Add your photo here */}
               <div className="w-full h-full bg-blue-500/20 flex items-center justify-center text-blue-400">AO</div>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">Andrew Oche</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Full-Stack Developer & Founder of <span className="text-blue-400 font-semibold">Thecla</span>. 
              Engineering the gap between hardware precision and software scale.
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            {/* <Linkedin className="text-zinc-500 hover:text-blue-400 transition-colors cursor-pointer" />
            <Twitter className="text-zinc-500 hover:text-white transition-colors cursor-pointer" />
            <Github className="text-zinc-500 hover:text-white transition-colors cursor-pointer" /> */}
          </div>
        </BentoCard>

        {/* Startup Card */}
        <BentoCard className="md:col-span-2 bg-blue-600/5 border-blue-500/20">
          <div className="flex items-start justify-between">
            <Rocket className="text-blue-400" size={32} />
            <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20">Building</div>
          </div>
          <div>
            <h3 className="text-xl font-bold">Thecla</h3>
            <p className="text-zinc-400 text-sm">Empowering the next gen of African developers.</p>
          </div>
        </BentoCard>

        {/* Current Status / Exam Stress */}
        <BentoCard className="md:col-span-1 bg-zinc-900/80">
          <div className="flex flex-col h-full justify-between">
            <Cpu className="text-emerald-400" />
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Status</p>
              <p className="text-sm font-medium">Post-MATLAB Exams 🧠</p>
            </div>
          </div>
        </BentoCard>

        {/* Skills Card */}
        <BentoCard className="md:col-span-1 border-white/5 bg-zinc-950">
           <Code2 className="text-purple-400" />
           <div className="flex flex-wrap gap-1 mt-2">
              {['Next.js', 'React', 'TS', 'Tailwind'].map(s => (
                <span key={s} className="text-[10px] bg-white/5 px-2 py-0.5 rounded-md border border-white/10">{s}</span>
              ))}
           </div>
        </BentoCard>

        {/* Hire Me / Contact Form Trigger */}
        <BentoCard className="md:col-span-2 flex-row items-center justify-between cursor-pointer group hover:bg-white hover:text-black transition-all duration-500">
          <div>
            <h2 className="text-2xl font-bold italic">Let's build.</h2>
            <p className="opacity-60 group-hover:opacity-100">Send a direct message to my Telegram.</p>
          </div>
          <motion.div 
            whileHover={{ x: 5 }}
            className="p-4 bg-zinc-800 rounded-full group-hover:bg-black group-hover:text-white"
          >
            <ExternalLink size={24} />
          </motion.div>
        </BentoCard>

        {/* Latest Post Teaser */}
        <BentoCard className="md:col-span-2 bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/30">
           <div className="flex justify-between items-center w-full">
              <span className="text-xs text-zinc-500">Latest from LinkedIn</span>
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
           </div>
           <p className="text-sm italic mt-2 text-zinc-300 line-clamp-2">
             "Crashing into a Next.js repo right after an EEE 309 paper is a wild mental shift..."
           </p>
        </BentoCard>

      </div>
    </div>
  );
}