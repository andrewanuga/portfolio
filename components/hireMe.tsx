"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Mail, 
  Briefcase, 
  Clock, 
  MessageSquare,
  Loader2
} from "lucide-react";

export default function HireMeSection() {
  const [budget, setBudget] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      project_type: formData.get("project_type"),
      timeline: formData.get("timeline"),
      budget: budget,
      requirements: formData.get("requirements")
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
        setErrorMsg(message);
      } else {
        setSubmitted(true);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hire" className="relative w-full bg-[#050506] py-28 px-4 sm:px-6 md:px-14 border-t border-white/10 text-white">
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-cyan-500/10 blur-[180px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              LET&apos;S WORK <span className="text-white/30 font-light">TOGETHER.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-white/60 leading-relaxed">
            Have a project in mind, need technical advice, or looking to build a new platform? Send me a message and let&apos;s start a conversation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* BUDGET & GUARANTEES (4 cols) */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-[#090b12] border border-white/10 shadow-xl flex flex-col justify-between space-y-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-6">
              Estimated Budget
            </div>
            <div className="space-y-6">
              <div className="text-5xl font-extrabold text-white tracking-tight">
                ${budget.toLocaleString()}
                <span className="text-sm font-semibold text-blue-400 ml-2">USD</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-white/40 text-xs font-medium">
                <span>$1K (Quick Sprint)</span>
                <span>$50K+ (Large Platform)</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-white/60 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-blue-400" />
              <span>Direct communication with the engineer</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-blue-400" />
              <span>Clear milestones, upfront estimates &amp; transparency</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-blue-400" />
              <span>Fast response time in less than 24 hours</span>
            </div>
          </div>
        </div>

        {/* CONTACT FORM (8 cols) */}
        <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-[#090b12] border border-white/10 shadow-xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form 
                onSubmit={handleSubmit} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-white/70">
                    <User size={14} className="text-blue-400" />
                    <span>Your Name</span>
                  </label>
                  <input 
                    name="full_name" 
                    required 
                    type="text" 
                    placeholder="Sarah Connor" 
                    disabled={loading}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-all placeholder:text-white/20 disabled:opacity-50" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-white/70">
                    <Mail size={14} className="text-blue-400" />
                    <span>Email Address</span>
                  </label>
                  <input 
                    name="email" 
                    required 
                    type="email" 
                    placeholder="sarah@company.com" 
                    disabled={loading}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-all placeholder:text-white/20 disabled:opacity-50" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-white/70">
                    <Briefcase size={14} className="text-blue-400" />
                    <span>Project Type</span>
                  </label>
                  <select 
                    name="project_type" 
                    disabled={loading}
                    className="w-full bg-[#141622] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 outline-none cursor-pointer disabled:opacity-50"
                  >
                    <option>Web Application Development</option>
                    <option>AI &amp; Machine Learning Integration</option>
                    <option>AI Agents &amp; Workflow Automation</option>
                    <option>Mobile App (iOS &amp; Android)</option>
                    <option>Startup MVP or Consultation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-white/70">
                    <Clock size={14} className="text-blue-400" />
                    <span>Desired Timeline</span>
                  </label>
                  <select 
                    name="timeline" 
                    disabled={loading}
                    className="w-full bg-[#141622] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 outline-none cursor-pointer disabled:opacity-50"
                  >
                    <option>As soon as possible (1-2 weeks)</option>
                    <option>Within the next month</option>
                    <option>Flexible / Exploring options</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-white/70">
                    <MessageSquare size={14} className="text-blue-400" />
                    <span>Project Details</span>
                  </label>
                  <textarea 
                    name="requirements" 
                    required 
                    rows={4} 
                    placeholder="Tell me about your project, goals, or what you'd like to build together..." 
                    disabled={loading}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 outline-none resize-none transition-all placeholder:text-white/20 disabled:opacity-50" 
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  {errorMsg && (
                    <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl py-4 font-bold text-sm flex items-center justify-center gap-2.5 transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center max-w-md mx-auto space-y-4"
              >
                <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Thank you for reaching out. I have received your message and will review it and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
