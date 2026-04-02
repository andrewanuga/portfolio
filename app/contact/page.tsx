"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, User, Mail, MessageSquare, 
  Calendar, ShieldCheck, MapPin, Clock, ArrowRight,
  ChevronDown
} from "lucide-react";
import { cn } from "@/components/lib/utils";

const InputWrapper = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 group w-full">
    <label className="flex items-center gap-2 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em] group-focus-within:text-blue-500 transition-colors">
      <div className="h-[1px] w-4 bg-zinc-800 group-focus-within:bg-blue-500 transition-all" />
      {label}
    </label>
    {children}
  </div>
);

export default function ContactPortal() {
  return (
    <section id="contact" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col xl:flex-row overflow-hidden">
      
      {/* --- COLUMN 1: SYSTEM_STATUS (25%) --- */}
      <div className="w-full xl:w-[25%] p-8 md:p-12 border-r border-white/5 bg-[#0d0d0d] flex flex-col justify-between">
        <div className="space-y-12 mt-15">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Available_24/7</span>
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none">INQUIRY_</h2>
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em] leading-relaxed">
              Standard response latency: <br /> 
              <span className="text-zinc-400">{"<"} 24 Hours</span>
            </p>
          </div>

          <div className="space-y-6 pt-12 border-t border-white/5">
             <div className="flex items-start gap-4">
                <MapPin size={14} className="text-blue-500 mt-1" />
                <div>
                   <p className="text-white text-[11px] font-bold uppercase tracking-wider">Base_Operations</p>
                   <p className="text-zinc-500 text-[10px] font-mono uppercase">Lagos, Nigeria</p>
                </div>
             </div>
             <div className="flex items-start gap-4">
                <Clock size={14} className="text-blue-500 mt-1" />
                <div>
                   <p className="text-white text-[11px] font-bold uppercase tracking-wider">Local_Time</p>
                   <p className="text-zinc-500 text-[10px] font-mono uppercase">GMT+1 (WAT)</p>
                </div>
             </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-600/10 hidden xl:block">
           <p className="text-[9px] font-mono text-blue-500/60 uppercase leading-relaxed italic">
              * Secure end-to-end transmission active. Data encrypted via RSA-2048 logic.
           </p>
        </div>
      </div>

      {/* --- COLUMN 2: INTAKE_TERMINAL (50%) --- */}
      <div className="w-full xl:w-[50%] p-8 md:p-20 bg-black flex flex-col justify-center border-r border-white/5">
        <form className="space-y-12 w-full max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <InputWrapper label="Identity_">
              <input 
                type="text" 
                placeholder="FULL NAME" 
                className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-800 text-sm tracking-wide" 
              />
            </InputWrapper>
            
            <InputWrapper label="Communication_">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-800 text-sm tracking-wide" 
              />
            </InputWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <InputWrapper label="Architecture_Type">
              <div className="relative">
                <select className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer text-xs font-mono uppercase tracking-widest">
                  <option className="bg-[#0a0a0a]">Full-Stack Project</option>
                  <option className="bg-[#0a0a0a]">Thecla Partnership</option>
                  <option className="bg-[#0a0a0a]">Hardware Consultation</option>
                  <option className="bg-[#0a0a0a]">Speaking / Panel</option>
                </select>
                <ChevronDown size={12} className="absolute right-0 top-4 text-zinc-700 pointer-events-none" />
              </div>
            </InputWrapper>

            <InputWrapper label="Project_Budget">
              <div className="relative">
                <select className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer text-xs font-mono uppercase tracking-widest">
                  <option className="bg-[#0a0a0a]">$5k - $10k</option>
                  <option className="bg-[#0a0a0a]">$10k - $25k</option>
                  <option className="bg-[#0a0a0a]">$25k+</option>
                  <option className="bg-[#0a0a0a]">Equity / Strategic</option>
                </select>
                <ChevronDown size={12} className="absolute right-0 top-4 text-zinc-700 pointer-events-none" />
              </div>
            </InputWrapper>
          </div>

          <InputWrapper label="System_Requirements_">
            <textarea 
              rows={4} 
              placeholder="DESCRIBE THE SCOPE OR CHALLENGE..." 
              className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-800 text-sm resize-none tracking-wide" 
            />
          </InputWrapper>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all group overflow-hidden relative"
          >
            <span className="relative z-10 italic">Initialize_Transmission</span>
            <Send size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.button>
        </form>
      </div>

      {/* --- COLUMN 3: DIRECT_UPLINKS (25%) --- */}
      <div className="w-full xl:w-[25%] p-8 md:p-12 bg-[#0d0d0d] flex flex-col gap-6">
        <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-4">Express_Channels_</h4>

        <a href="#" className="group p-8 border border-white/5 rounded-3xl hover:border-blue-500/40 hover:bg-blue-500/[0.02] transition-all duration-500">
          <Calendar size={24} className="text-blue-500 mb-6" />
          <p className="text-white text-sm font-bold uppercase italic group-hover:text-blue-500">Book_Strategy_Session</p>
          <p className="text-zinc-600 text-[10px] font-mono mt-2 uppercase tracking-tighter leading-relaxed">Direct 15-min sync for high-priority projects.</p>
          <div className="mt-8 flex items-center gap-2 text-zinc-800 group-hover:text-blue-500 transition-colors">
            <span className="text-[9px] font-mono uppercase tracking-widest">Open_Calendly</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
          </div>
        </a>

        <a href="mailto:hello@andrewoche.com" className="group p-8 border border-white/5 rounded-3xl hover:border-zinc-500/40 hover:bg-white/[0.01] transition-all duration-500">
          <Mail size={24} className="text-zinc-500 mb-6 group-hover:text-white" />
          <p className="text-white text-sm font-bold uppercase italic">Direct_Email</p>
          <p className="text-zinc-600 text-[10px] font-mono mt-2 uppercase tracking-tighter">hello@andrewoche.com</p>
        </a>

        <div className="mt-auto pt-12 space-y-4">
           <div className="flex items-center gap-2 opacity-30">
              <ShieldCheck size={12} className="text-blue-500" />
              <span className="text-[8px] font-mono uppercase tracking-widest text-white italic">Encrypted_Sequence</span>
           </div>
           <div className="h-[1px] w-full bg-zinc-900" />
           <p className="text-[8px] font-mono text-zinc-800 uppercase leading-loose tracking-tighter">
             This terminal is for professional partnerships. For recruitment, refer to the Archive_CV module.
           </p>
        </div>
      </div>

    </section>
  );
}