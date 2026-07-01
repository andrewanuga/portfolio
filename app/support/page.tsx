"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  HeartHandshake,
  Coffee,
  Sparkles,
  Zap,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Star,
} from "lucide-react";
import NavBar from "@/components/navbar";

const MYHAPPR_URL = "https://myhappr.com/andrew_the_dev";

const supportReasons = [
  {
    icon: Coffee,
    title: "Fuel_The_Grind",
    desc: "Every late-night debug session runs on caffeine. A small tip keeps the terminal warm.",
  },
  {
    icon: Zap,
    title: "Open_Source_Work",
    desc: "Support the free tools, experiments and write-ups I ship for the community.",
  },
  {
    icon: Sparkles,
    title: "New_Builds",
    desc: "Help fund the next side project, lab experiment and engineering log.",
  },
];

const perks = [
  "Direct shout-out on my socials",
  "Priority replies to your questions",
  "Early access to new experiments",
  "My genuine, sleep-deprived gratitude",
];

export default function SupportPortal() {
  return (
    <section
      id="support"
      className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col xl:flex-row overflow-hidden"
    >
      <NavBar />

      {/* --- COLUMN 1: SIGNAL (35%) --- */}
      <div className="w-full xl:w-[35%] p-8 md:p-16 border-r border-white/5 bg-[#0d0d0d] flex flex-col justify-between">
        <div className="space-y-12 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Heart size={16} className="text-blue-500 fill-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em]">
              Support_Channel // MyHappr
            </span>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
              BACK <br />
              <span className="text-zinc-800 not-italic">THE_WORK.</span>
            </h2>
            <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs uppercase tracking-widest">
              If my code, write-ups or experiments have helped you, you can{" "}
              <span className="text-white italic">fuel the next build</span> through my
              MyHappr page.
            </p>
          </div>

          <div className="space-y-6 pt-10 border-t border-white/5">
            {perks.map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-blue-600/10 border border-blue-500/20 text-blue-500 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-zinc-400 text-[11px] font-mono uppercase tracking-wider leading-relaxed">
                  {perk}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-4 rounded-xl bg-blue-600/5 border border-blue-600/10 hidden xl:flex items-center gap-3">
          <ShieldCheck size={14} className="text-blue-500" />
          <p className="text-[9px] font-mono text-blue-500/60 uppercase leading-relaxed italic">
            Payments processed securely via MyHappr. No account required to tip.
          </p>
        </div>
      </div>

      {/* --- COLUMN 2: THE OFFER (65%) --- */}
      <div className="w-full xl:w-[65%] p-8 md:p-20 bg-black flex flex-col justify-center gap-12">
        {/* Primary CTA card */}
        <motion.a
          href={MYHAPPR_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group relative w-full max-w-3xl mx-auto p-10 md:p-14 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.25)]"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <HeartHandshake size={24} />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-80">
                  Tip_Andrew_The_Dev
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                Support <br /> On MyHappr
              </h3>
              <p className="text-white/70 text-xs font-mono uppercase tracking-wider max-w-sm">
                One tap. Any amount. It genuinely keeps this whole system running.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-center gap-4">
              <div className="p-5 rounded-2xl bg-white/10 group-hover:bg-white/20 transition-colors">
                <Coffee size={36} />
              </div>
              <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] italic">
                Open_Page
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </span>
            </div>
          </div>

          {/* Glossy sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 0.5px, transparent 0.5px)",
              backgroundSize: "22px 22px",
            }}
          />
        </motion.a>

        {/* Reasons grid */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Star size={14} className="text-blue-500" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
              Where_Your_Support_Goes
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportReasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="group p-6 border border-white/5 bg-[#0d0d0d] rounded-2xl hover:border-blue-500/30 hover:bg-blue-500/[0.02] transition-all duration-500"
              >
                <reason.icon
                  size={22}
                  className="text-blue-500 mb-6 group-hover:scale-110 transition-transform"
                />
                <p className="text-white text-sm font-bold uppercase italic mb-2">
                  {reason.title}
                </p>
                <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-tight leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-center text-[9px] font-mono text-zinc-800 uppercase tracking-[0.4em] select-none">
            Andrew_Oche_Operating_System // Support_Kernel // v2026.7
          </p>
        </div>
      </div>
    </section>
  );
}
