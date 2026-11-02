"use client";

import React from "react";
import Image from "next/image";
import { 
  Download, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";

const STATS = [
  { value: "4+", label: "Years Experience", detail: "Full-stack & AI engineering" },
  { value: "10+", label: "Projects Shipped", detail: "From concept to production" },
  { value: "99.9%", label: "Uptime & Quality", detail: "Reliable modern architectures" },
  { value: "< 1h", label: "Response Time", detail: "Fast direct communication" }
];

export default function BioSection() {
  return (
    <section 
      id="about" 
      className="relative w-full bg-[#050506] py-28 px-4 sm:px-6 md:px-14 rounded-t-[40px] sm:rounded-t-[56px] md:rounded-t-[64px] border-t border-white/10 text-white shadow-[0_-25px_60px_rgba(0,0,0,0.6)] relative z-30 -mt-8 sm:-mt-12"
    >
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-cyan-500/10 blur-[180px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>About Me</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              BEHIND THE <span className="text-white/30 font-light">CODE.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-white/60 leading-relaxed">
            Get to know who I am, what drives my work, and how I help teams turn complex ideas into intuitive digital experiences.
          </p>
        </div>
      </div>

      {/* MAIN ABOUT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* LEFT COLUMN: PHOTO & QUICK INFO (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-[#090b12] border border-white/10 shadow-2xl space-y-6">
            
            {/* PORTRAIT PHOTO */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0d0d14] border border-white/10 group">
              <Image
                src="/my-photo.png"
                alt="Andrew Oche"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10">
                <span className="text-white font-semibold">Andrew Oche</span>
                <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Hire
                </span>
              </div>
            </div>

            {/* QUICK FACTS LIST */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">Role</span>
                <span className="text-white font-medium">Full-Stack &amp; AI Engineer</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">Startup</span>
                <span className="text-blue-400 font-semibold">Founder @ Thecla</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">Location</span>
                <span className="text-white/80 flex items-center gap-1">
                  <MapPin size={13} className="text-blue-400" />
                  Lagos, Nigeria
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">Education</span>
                <span className="text-white/80">Electrical Eng. (FUTA)</span>
              </div>
            </div>

            {/* DOWNLOAD RESUME BUTTON */}
            <a
              href="/Adakole_Andrew_Oche_Resume.pdf"
              download
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] group"
            >
              <span>Download Full Resume</span>
              <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </a>

          </div>
        </div>

        {/* RIGHT COLUMN: STORY & HIGHLIGHTS (8/12) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
          
          {/* PERSONAL STATEMENT */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#090b12] border border-white/10 shadow-xl space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              &ldquo;I believe the best software is simple, dependable, and a pleasure to use.&rdquo;
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              <p>
                Hi, I&apos;m Andrew. I am a product-focused Full-Stack Developer and AI Engineer who thrives at the intersection of clean user experience and robust engineering.
              </p>
              <p>
                Over the past 4+ years, I have built and shipped modern web applications using Next.js, React, and TypeScript, configured secure cloud backends with PostgreSQL and Supabase, and engineered practical machine learning and AI agent workflows with Python and modern LLMs.
              </p>
              <p>
                I prioritize clean code, honest communication, and simple solutions over unnecessary complexity. Alongside client work, I am currently building <strong className="text-blue-400 font-semibold">Thecla</strong>.
              </p>
            </div>

            {/* KEY STATS ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              {STATS.map((s) => (
                <div key={s.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="text-3xl font-extrabold text-blue-400 tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {s.label}
                  </p>
                  <p className="text-xs text-white/50">
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT I BRING TO YOUR TEAM */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#090b12] border border-white/10 shadow-xl">
            <h4 className="text-lg font-bold text-white mb-4">
              How I Can Help Your Product
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>End-to-end full-stack web and mobile application engineering</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Custom AI features, smart search &amp; automated workflow agents</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Clean API design, database modeling &amp; zero-downtime deployments</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Transparent collaboration and fast, iterative release cycles</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-white/60">
                Interested in working together?
              </p>
              <a
                href="#hire"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Send a Message</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
