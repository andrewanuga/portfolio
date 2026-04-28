"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, Briefcase, MessageSquare, Terminal, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "./lib/supabase";

const FormField = ({ label, icon: Icon, children }: any) => (
  <div className="space-y-2 group">
    <label className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest group-focus-within:text-blue-500 transition-colors">
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
    }, 50);
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
      created_at: new Date().toISOString(),
    };

    try {
      console.log("Submitting payload:", payload);
      
      const { data, error } = await supabase
        .from("client_requests")
        .insert([payload])
        .select();

      if (error) {
        console.log("Supabase Insert Error:", error);
        setErrorMsg(`INSERT_ERROR: ${error.message}`);
        
        // Provide helpful error messages
        if (error.message.includes("row-level security")) {
          setErrorMsg(`⚠️ RLS POLICY ERROR: Please enable INSERT policy for client_requests table`);
        } else if (error.message.includes("relation") && error.message.includes("does not exist")) {
          setErrorMsg(`⚠️ TABLE ERROR: Table 'client_requests' doesn't exist. Please create it in Supabase.`);
        } else if (error.code === "42P01") {
          setErrorMsg(`⚠️ TABLE MISSING: Run the SQL script to create the client_requests table`);
        }
      } else {
        console.log("Insert successful:", data);
        setSubmitted(true);
        typeMessage("Message received. I will get back to you in 1 hour.");
        
        // Optional: Reset form after 5 seconds
        setTimeout(() => {
          // You could add form reset logic here
        }, 5000);
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setErrorMsg(`NETWORK_ERROR: ${err.message || "Failed to connect to Supabase. Check your internet connection."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hire" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT SIDE - Budget section */}
      <div className="w-full md:w-[40%] p-8 md:p-20 border-r border-white/5 bg-[#0d0d0d]">
        <div className="sticky top-20">
          <div className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-8 font-bold">
            Investment_Range
          </div>
          <div className="space-y-8">
            <motion.div 
              key={budget}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-white tracking-tighter"
            >
              ${budget.toLocaleString()}
            </motion.div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-zinc-600 text-xs font-mono">
              <span>$1K</span>
              <span>$50K+</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full md:w-[60%] p-8 md:p-20 bg-black flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form 
              key="contact-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit} 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl z-10"
            >
              <FormField label="Full_Identity" icon={User}>
                <input 
                  name="full_name" 
                  required 
                  type="text" 
                  placeholder="John Doe" 
                  disabled={loading}
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed" 
                />
              </FormField>

              <FormField label="Digital_Contact" icon={Mail}>
                <input 
                  name="email" 
                  required 
                  type="email" 
                  placeholder="john@system.com" 
                  disabled={loading}
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed" 
                />
              </FormField>

              <FormField label="Project_Type" icon={Briefcase}>
                <select 
                  name="project_type" 
                  disabled={loading}
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>FULL-STACK ARCHITECTURE</option>
                  <option>FRONT-END DEVELOPMENT</option>
                  <option>BACK-END ARCHITECTURE</option>
                  <option>MOBILE APP DEVELOPMENT</option>
                </select>
              </FormField>

              <FormField label="Priority_Level" icon={Terminal}>
                <select 
                  name="priority_level" 
                  disabled={loading}
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>NORMAL_DEPLOYMENT</option>
                  <option>CRITICAL_PATH (URGENT)</option>
                  <option>R&D_EXPLORATION</option>
                </select>
              </FormField>

              <div className="md:col-span-2">
                <FormField label="System_Requirements" icon={MessageSquare}>
                  <textarea 
                    name="requirements" 
                    required 
                    rows={5} 
                    placeholder="Describe the scope..." 
                    disabled={loading}
                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none transition-all placeholder:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed" 
                  />
                </FormField>
              </div>

              <div className="md:col-span-2 space-y-4">
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-mono"
                  >
                    <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-bold mb-1">SYSTEM_ALERT:</div>
                      <div>{errorMsg}</div>
                      {errorMsg.includes("TABLE") && (
                        <button
                          onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                          className="mt-2 text-blue-500 hover:text-blue-400 underline"
                        >
                          Open Supabase Dashboard →
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                <motion.button 
                  type="submit"
                  disabled={loading}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  animate={loading ? { scale: 1 } : {}}
                  className={`group w-full rounded-2xl py-5 font-black uppercase tracking-[0.4em] text-[10px] italic flex items-center justify-center gap-3 transition-all ${
                    loading 
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                      : "bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      TRANSMITTING_DATA...
                    </>
                  ) : (
                    <>
                      Transmit_Data 
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success-message"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md font-mono text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="text-[10px] uppercase tracking-[0.5em] mb-4 text-emerald-600 font-bold"
              >
                ✓ Handshake_Complete
              </motion.div>
              <p className="text-3xl font-black italic uppercase leading-tight text-white tracking-tighter">
                {statusMsg}
                {!typingComplete && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-8 bg-blue-600 ml-2 align-middle"
                  />
                )}
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => {
                  setSubmitted(false);
                  setStatusMsg("");
                  setTypingComplete(false);
                  // Reset form
                  const form = document.querySelector('form');
                  if (form) form.reset();
                  setBudget(5000);
                }}
                className="mt-8 text-[10px] uppercase tracking-[0.3em] text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Send Another Request →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}