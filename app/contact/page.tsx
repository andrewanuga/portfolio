"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { 
  Send, User, Mail, MessageSquare, 
  ShieldCheck, MapPin, Clock, ArrowRight,
  ChevronDown,
  Phone,
  Loader2 // Added Loader icon
} from "lucide-react";
import NavBar from "@/components/navbar";
import { supabase } from "@/components/lib/supabase"; // Ensure this path is correct

const InputWrapper = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 group w-full">
    <label className="flex items-center gap-2 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em] group-focus-within:text-blue-500 transition-colors">
      <div className="h-px w-4 bg-zinc-800 group-focus-within:bg-blue-500 transition-all" />
      {label}
    </label>
    {children}
  </div>
);

export default function ContactPortal() {
  // Logic states
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Extract the numeric value from the budget string (e.g., "$1k - $5k" -> 1000)
    const budgetRaw = formData.get("budget") as string;
    const budgetNumeric = parseInt(budgetRaw.replace(/[^0-9]/g, "")) || 0;

    const payload = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      project_type: formData.get("project_type"),
      requirements: formData.get("requirements"),
      budget: budgetNumeric,
      priority_level: "NORMAL_DEPLOYMENT", // Default for this form
    };

    const { error } = await supabase.from("client_requests").insert([payload]);

    if (!error) {
      setSubmitted(true);
      typeMessage("Message received. I will get back to you in 1 hour.");
    } else {
      console.error("Transmission Error:", error.message);
      alert("Transmission failed. Check console for details.");
    }
    setLoading(false);
  };

  const typeMessage = (text: string) => {
    let i = 0;
    const interval = setInterval(() => {
      setStatusMsg(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col xl:flex-row overflow-hidden">
      <NavBar />
      
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
      <div className="w-full xl:w-[50%] p-8 md:p-20 bg-black flex flex-col justify-center border-r border-white/5 relative">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form 
              key="form"
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-12 w-full max-w-2xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <InputWrapper label="Identity_">
                  <input 
                    name="full_name"
                    required
                    type="text" 
                    placeholder="FULL NAME" 
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-800 text-sm tracking-wide" 
                  />
                </InputWrapper>
                
                <InputWrapper label="Communication_">
                  <input
                    name="email"
                    required
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-800 text-sm tracking-wide" 
                  />
                </InputWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <InputWrapper label="Architecture_Type">
                  <div className="relative">
                    <select name="project_type" className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none appearance-none cursor-pointer text-xs font-mono uppercase tracking-widest">
                      <option className="bg-[#0a0a0a]">Full-Stack Project</option>
                      <option className="bg-[#0a0a0a]">FRONT-END</option>
                      <option className="bg-[#0a0a0a]">BACK-END</option>
                      <option className="bg-[#0a0a0a]">Mobile Application</option>
                      <option className="bg-[#0a0a0a]">Partnership</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-0 top-4 text-zinc-700 pointer-events-none" />
                  </div>
                </InputWrapper>

                <InputWrapper label="Project_Budget">
                  <div className="relative">
                    <select name="budget" className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none appearance-none cursor-pointer text-xs font-mono uppercase tracking-widest">
                      <option className="bg-[#0a0a0a]">$100 - $1k</option>
                      <option className="bg-[#0a0a0a]">$1k - $5k</option>
                      <option className="bg-[#0a0a0a]">$5k - $10k</option>
                      <option className="bg-[#0a0a0a]">$10k - $25k</option>
                      <option className="bg-[#0a0a0a]">$25k+</option>
                      <option className="bg-[#0a0a0a]">0 (Equity / Strategic)</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-0 top-4 text-zinc-700 pointer-events-none" />
                  </div>
                </InputWrapper>
              </div>

              <InputWrapper label="System_Requirements_">
                <textarea 
                  name="requirements"
                  required
                  rows={4} 
                  placeholder="DESCRIBE THE SCOPE OR CHALLENGE..." 
                  className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-800 text-sm resize-none tracking-wide" 
                />
              </InputWrapper>

              <motion.button 
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all group overflow-hidden relative"
              >
                <span className="relative z-10 italic">
                  {loading ? "Transmitting..." : "Initialize_Transmission"}
                </span>
                {loading ? (
                  <Loader2 size={14} className="animate-spin relative z-10" />
                ) : (
                  <Send size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                )}
                <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto font-mono text-blue-500 text-center xl:text-left"
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-4 text-zinc-600">// Handshake_Complete</div>
              <p className="text-3xl font-black italic uppercase leading-tight text-white tracking-tighter">
                {statusMsg}<span className="inline-block w-2 h-8 bg-blue-600 ml-2 align-middle animate-pulse" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- COLUMN 3: DIRECT_UPLINKS (25%) --- */}
      <div className="w-full xl:w-[25%] p-8 md:p-12 bg-[#0d0d0d] flex flex-col gap-6">
        <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-4">Express_Channels_</h4>

        <a href="https://wa.link/wquc8d" className="group p-8 border border-white/5 rounded-3xl hover:border-blue-500/40 hover:bg-blue-500/[0.02] transition-all duration-500">
          <Phone size={24} className="text-blue-500 mb-6" />
          <p className="text-white text-sm font-bold uppercase italic group-hover:text-blue-500">SEND A DM</p>
          <p className="text-zinc-600 text-[10px] font-mono mt-2 uppercase tracking-tighter leading-relaxed">Direct message on my whatsapp</p>
          <div className="mt-8 flex items-center gap-2 text-zinc-800 group-hover:text-blue-500 transition-colors">
            <span className="text-[9px] font-mono uppercase tracking-widest">MESSAGE</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
          </div>
        </a>

        <a href="mailto:adakoleandrew21@gmail.com" className="group p-8 border border-white/5 rounded-3xl hover:border-zinc-500/40 hover:bg-white/[0.01] transition-all duration-500">
          <Mail size={24} className="text-zinc-500 mb-6 group-hover:text-white" />
          <p className="text-white text-sm font-bold uppercase italic">Direct_Email</p>
          <p className="text-zinc-600 text-[10px] font-mono mt-2 uppercase tracking-tighter">adakoleandrew21@gmail.com</p>
        </a>

        <div className="mt-auto pt-12 space-y-4">
           <div className="flex items-center gap-2 opacity-30">
              <ShieldCheck size={12} className="text-blue-500" />
              <span className="text-[8px] font-mono uppercase tracking-widest text-white italic">Encrypted_Sequence</span>
           </div>
           <div className="h-px w-full bg-zinc-900" />
           <p className="text-[8px] font-mono text-zinc-800 uppercase leading-loose tracking-tighter">
             This terminal is for professional partnerships. For recruitment, refer to the Archive_CV module.
           </p>
        </div>
      </div>
    </section>
  );
}