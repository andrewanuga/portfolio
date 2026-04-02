"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Hash, Clock, ArrowLeft, Share2, Bookmark, Terminal, ChevronRight } from "lucide-react";
import { cn } from "@/components/lib/utils";
import NavBar from "@/components/navbar";

// --- MOCK BLOG DATA ---
const blogPosts = [
  {
    id: "LOG_001",
    title: "Building Thecla: Engineering for the Global South",
    excerpt: "Why high-performance web architecture isn't a luxury, but a necessity for low-bandwidth environments.",
    date: "02.APR.2026",
    readTime: "8 MIN",
    tags: ["STARTUP", "ARCHITECTURE", "THECLA"],
    category: "STRATEGY"
  },
  {
    id: "LOG_002",
    title: "From EEE to Full-Stack: The Logic of Circuits in Code",
    excerpt: "Mapping electrical signal processing principles to modern React state management.",
    date: "28.MAR.2026",
    readTime: "12 MIN",
    tags: ["ENGINEERING", "REACT", "MATLAB"],
    category: "TECHNICAL"
  }
];

export default function BlogSpace() {
  const [activeTab, setActiveTab] = useState("ALL_LOGS");

  return (
    <section id="blog" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row">
      <NavBar />
      {/* --- LEFT SIDE: THE ARCHIVE INDEX (30%) --- */}
      <div className="w-full md:w-[30%] p-8 md:p-12 border-r border-white/5 bg-[#0d0d0d] md:sticky md:top-0 md:h-screen flex flex-col justify-between">
        
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <BookOpen size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Archive_System</span>
          </motion.div>

          <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none mb-12">
            ENGINEERING <br />
            <span className="text-zinc-800 not-italic font-bold">LOGS.</span>
          </h2>

          {/* Navigation/Filters */}
          <nav className="space-y-2">
            {["ALL_LOGS", "TECHNICAL", "STRATEGY", "THECLA_UPDATES"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-[10px] font-mono tracking-widest uppercase",
                  activeTab === tab 
                    ? "bg-blue-600/10 border-blue-500/30 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                    : "bg-transparent border-transparent text-zinc-600 hover:text-zinc-300 hover:border-white/5"
                )}
              >
                <span>{tab}</span>
                {activeTab === tab && <ChevronRight size={12} />}
              </button>
            ))}
          </nav>
        </div>

        {/* STATS FOOTER */}
        <div className="mt-20 p-4 rounded-xl border border-white/5 bg-black/40 font-mono text-[9px] text-zinc-700 space-y-2">
          <div className="flex justify-between uppercase">
            <span>Total_Entries</span>
            <span className="text-blue-500">24</span>
          </div>
          <div className="flex justify-between uppercase">
            <span>Last_Update</span>
            <span className="text-blue-500">02.04.2026</span>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE CONTENT FEED (70%) --- */}
      <div className="w-full md:w-[70%] p-6 md:p-20 bg-black flex flex-col items-center">
        
        <div className="w-full max-w-3xl space-y-20">
          {blogPosts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* Post Metadata */}
              <div className="flex items-center gap-6 mb-6">
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.2em]">{post.id}</span>
                <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-blue-500/30 transition-colors" />
                <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-600 uppercase">
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Title & Excerpt */}
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-tight italic group-hover:text-blue-500 transition-colors mb-6">
                {post.title}
              </h3>
              <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-mono px-2 py-1 rounded bg-zinc-900 text-zinc-500 border border-white/5 uppercase tracking-widest">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-zinc-700">
                  <button className="hover:text-blue-500 transition-colors"><Bookmark size={16} /></button>
                  <button className="hover:text-white transition-colors"><Share2 size={16} /></button>
                </div>
              </div>

              {/* Hover Blueprint Decor */}
              <div className="absolute -left-10 top-0 h-full w-[2px] bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
            </motion.article>
          ))}

          {/* PAGINATION / LOAD MORE */}
          <div className="pt-20 border-t border-white/5 flex justify-center">
             <button className="group flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] hover:border-blue-500 hover:text-white transition-all">
                Access_Deep_Archive <Terminal size={14} className="group-hover:text-blue-500" />
             </button>
          </div>
        </div>

        {/* Background Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
      </div>

    </section>
  );
}