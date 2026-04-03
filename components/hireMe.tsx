"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Briefcase, DollarSign, MessageSquare, Terminal, ShieldCheck } from "lucide-react";
import { cn } from "@/components/lib/utils";

const FormField = ({ label, icon: Icon, children }: { label: string; icon: any; children: React.ReactNode }) => (
  <div className="space-y-2 group">
    <label className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest group-focus-within:text-blue-500 transition-colors">
      <Icon size={12} />
      {label}
    </label>
    {children}
  </div>
);

export default function HireMeSection() {
  const [budget, setBudget] = useState(5000);

  return (
    <section id="hire" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row">
        {/* Background Decorative "06" */}
        <div className="absolute -bottom-10 -left-10 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
          06
        </div>
      {/* --- LEFT SIDE: CONTRACT PARAMETERS (40%) --- */}
      <div className="w-full md:w-[40%] p-8 md:p-20 flex flex-col justify-between border-r border-white/5 bg-[#0d0d0d] sticky top-0 md:h-screen">
        
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <ShieldCheck size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Secure_Handshake // v2.0</span>
          </motion.div>

          <h2 className="text-5xl md:text-[2.9rem] lg:text-[4.7rem] xl:text-[7rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic">
            INITIATE <br />
            <span className="text-zinc-800 not-italic">BUILD.</span>
          </h2>
          
          <p className="mt-10 text-zinc-500 text-sm font-light leading-relaxed max-w-xs uppercase tracking-widest">
            Define your system requirements. Let's engineer something <span className="text-white italic">extraordinary</span> together.
          </p>
        </div>

        {/* LIVE BUDGET VISUALIZER */}
        <div className="mt-20 p-6 border border-blue-500/10 bg-blue-500/[0.02] rounded-2xl space-y-6">
          <div className="flex justify-between items-end">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest italic">Est_Allocation</span>
            <span className="text-md lg:text-2xl xl:text-4xl font-black text-white italic tracking-tighter">${budget.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="100000" 
            step="100"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between font-mono text-[8px] text-zinc-700 uppercase tracking-widest">
            <span>MIN_LOGIC</span>
            <span>ENTERPRISE_SCALE</span>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: DATA INPUT TERMINAL (60%) --- */}
      <div className="w-full md:w-[60%] p-8 md:p-20 bg-black flex flex-col justify-center">
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          
          <FormField label="Full_Identity" icon={User}>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all font-light"
            />
          </FormField>

          <FormField label="Digital_Contact" icon={Mail}>
            <input 
              type="email" 
              placeholder="john@system.com" 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all font-light"
            />
          </FormField>

          <FormField label="Project_Type" icon={Briefcase}>
            <select className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all font-light appearance-none">
              <option>FULL-STACK ARCHITECTURE</option>
              <option>FRONT-END DEVELOPMENT</option>
              <option>BACK-END ARCHITECTURE</option>
              <option>MOBLIE APP DEVELOPMENT</option>
              <option>WEB3 DEVELOPMENT</option>
              <option>THECLA PARTNERSHIP</option>
              <option>HARDWARE LOGIC / EEE</option>
              <option>CONSULTATION</option>
            </select>
          </FormField>

          <FormField label="Priority_Level" icon={Terminal}>
            <select className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all font-light appearance-none">
              <option>NORMAL_DEPLOYMENT</option>
              <option>CRITICAL_PATH (URGENT)</option>
              <option>R&D_EXPLORATION</option>
            </select>
          </FormField>

          <div className="md:col-span-2">
            <FormField label="System_Requirements" icon={MessageSquare}>
              <textarea 
                rows={5}
                placeholder="Describe the scope of the project..." 
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all font-light resize-none"
              />
            </FormField>
          </div>

          <div className="md:col-span-2 mt-4">
            <motion.button 
              whileHover={{ scale: 0.99 }}
              whileTap={{ scale: 0.97 }}
              className="group relative w-full overflow-hidden rounded-2xl bg-blue-600 py-5 text-center transition-all hover:bg-blue-500"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-white italic">
                  Transmit_Data
                </span>
                <Send size={16} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            <p className="mt-6 text-center font-mono text-[8px] text-zinc-700 uppercase tracking-widest">
              By clicking transmit, you agree to established communication protocols.
            </p>
          </div>

        </form>

        {/* DECORATIVE BACKGROUND TEXT */}
        <div className="absolute top-20 right-20 opacity-[0.02] pointer-events-none select-none">
          <Terminal size={400} className="text-white" />
        </div>
      </div>

    </section>
  );
}