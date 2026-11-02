"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, Briefcase, MessageSquare, Terminal, AlertTriangle, Loader2 } from "lucide-react";

const FormField = ({ label, icon: Icon, children }: any) => (
  <div className="space-y-2 group">
    <label className="flex items-center gap-2 font-mono text-[10px] text-white/50 uppercase tracking-widest group-focus-within:text-kin-lime transition-colors">
      <Icon size={12} /> {label}
    </label>
    {children}
  </div>
);

export default function HireMeSection() {
  const [budget, setBudget] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  const typeMessage = (text: string) => {
    let i = 0;
    setTypingComplete(false);
    const interval = setInterval(() => {
      setStatusMsg(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 40);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg("");
    setStatusMsg("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      project_type: formData.get("project_type") as string,
      priority_level: formData.get("priority_level") as string,
      requirements: formData.get("requirements") as string,
      budget: budget,
    };

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message: string = result.error || `Request failed (${res.status})`;
        setErrorMsg(`INSERT_ERROR: ${message}`);
      } else {
        setSubmitted(true);
        typeMessage("Message received. I will get back to you within 1 hour.");
      }
    } catch (err: any) {
      setErrorMsg(`NETWORK_ERROR: ${err.message || "Failed to transmit. Please check connection."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hire" className="relative min-h-screen w-full bg-[#050506] py-28 px-6 md:px-14 border-t border-white/10">
      
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/60 uppercase tracking-[0.4em] mb-4">
          <Terminal className="text-kin-lime" size={14} />
          <span>Handshake_Protocol // Hire &amp; Contract</span>
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
          TRANSMIT <span className="text-white/30 not-italic">REQUEST.</span>
        </h2>
        <p className="mt-4 text-white/50 text-xs md:text-sm font-mono max-w-xl">
          Ready to deploy intelligent web platforms, production ML models, or custom agentic workflows? Transmit your project requirements.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* BUDGET SELECTOR (4 cols) */}
        <div className="lg:col-span-4 glass p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50 mb-8 font-bold">
              Investment_Target
            </div>
            <div className="space-y-6">
              <motion.div 
                key={budget}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl sm:text-6xl font-black text-white tracking-tighter"
              >
                ${budget.toLocaleString()}
                <span className="text-sm font-mono text-blue-400 ml-2">USD</span>
              </motion.div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
              />
              <div className="flex justify-between text-white/40 text-xs font-mono">
                <span>$1K (Sprint MVP)</span>
                <span>$50K+ (Enterprise)</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 font-mono text-[10px] text-white/45 space-y-2">
            <p>✓ Direct engineer communication</p>
            <p>✓ NDA &amp; IP ownership guaranteed</p>
            <p>✓ Response time &lt; 1 hour</p>
          </div>
        </div>

        {/* TRANSMIT FORM (8 cols) */}
        <div className="lg:col-span-8 glass p-8 sm:p-10 rounded-2xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onSubmit={handleSubmit} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <FormField label="Full_Identity" icon={User}>
                  <input 
                    name="full_name" 
                    required 
                    type="text" 
                    placeholder="Ada Lovelace" 
                    disabled={loading}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-blue-500 outline-none transition-all placeholder:text-white/20 disabled:opacity-50" 
                  />
                </FormField>

                <FormField label="Digital_Contact" icon={Mail}>
                  <input 
                    name="email" 
                    required 
                    type="email" 
                    placeholder="ada@domain.com" 
                    disabled={loading}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-blue-500 outline-none transition-all placeholder:text-white/20 disabled:opacity-50" 
                  />
                </FormField>

                <FormField label="Project_Type" icon={Briefcase}>
                  <select 
                    name="project_type" 
                    disabled={loading}
                    className="w-full bg-[#1c1c20] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-blue-500 outline-none appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option>FULL-STACK WEB ARCHITECTURE</option>
                    <option>AGENTIC AI &amp; MULTI-AGENT SYSTEMS</option>
                    <option>MACHINE LEARNING &amp; MODEL PIPELINES</option>
                    <option>MOBILE APP DEVELOPMENT (REACT NATIVE)</option>
                    <option>STARTUP MVP DEVELOPMENT</option>
                  </select>
                </FormField>

                <FormField label="Priority_Level" icon={Terminal}>
                  <select 
                    name="priority_level" 
                    disabled={loading}
                    className="w-full bg-[#1c1c20] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-blue-500 outline-none appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option>NORMAL_DEPLOYMENT (2-4 WEEKS)</option>
                    <option>CRITICAL_PATH (URGENT SPRINT)</option>
                    <option>LONG_TERM_CONTRACT</option>
                    <option>R&amp;D_EXPLORATION</option>
                  </select>
                </FormField>

                <div className="md:col-span-2">
                  <FormField label="System_Requirements" icon={MessageSquare}>
                    <textarea 
                      name="requirements" 
                      required 
                      rows={4} 
                      placeholder="Outline system goals, deliverables, timeline, or architecture requirements..." 
                      disabled={loading}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-blue-500 outline-none resize-none transition-all placeholder:text-white/20 disabled:opacity-50" 
                    />
                  </FormField>
                </div>

                <div className="md:col-span-2 space-y-4">
                  {errorMsg && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono">
                      <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                      <div>{errorMsg}</div>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full rounded-xl py-4 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 transition-all ${
                      loading 
                        ? "bg-white/10 text-white/50 cursor-not-allowed" 
                        : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.99]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        TRANSMITTING_DATA...
                      </>
                    ) : (
                      <>
                        Transmit Project Request 
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}
                className="py-12 font-mono text-center max-w-lg mx-auto"
              >
                <div className="text-xs uppercase tracking-[0.5em] mb-4 text-blue-400 font-bold">
                  ✓ Handshake_Complete
                </div>
                <p className="text-2xl sm:text-3xl font-black italic uppercase leading-tight text-white tracking-tight">
                  {statusMsg}
                  {!typingComplete && (
                    <span className="inline-block w-2 h-6 bg-blue-500 ml-2 align-middle animate-pulse" />
                  )}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStatusMsg("");
                    setTypingComplete(false);
                    setBudget(5000);
                  }}
                  className="mt-8 text-xs font-mono uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
                >
                  Send Another Transmission →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
