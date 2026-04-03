"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Radio, Heart, MessageCircle, 
  Bookmark, Send, Cpu, Link2, Bell, MessageSquareQuote, Unlink, Link2Off
} from "lucide-react";
import { cn } from "@/components/lib/utils";
import NavBar from "@/components/navbar";

// --- TYPE DEFINITIONS ---
interface Post {
  id: string;
  platform: string;
  icon: React.ComponentType<{ size?: number }>;
  handle: string;
  timestamp: string;
  content: string;
  likes: number;
  replies: number;
  link: string;
}

// --- MOCK FEED DATA (Replace with actual API later) ---
const mockFeedData: Post[] = [
  {
    id: "FE_001",
    platform: "LINKEDIN",
    icon: Unlink,
    handle: "andrewoche",
    timestamp: "2 HOURS AGO",
    content: "Just finalized the new architecture for Thecla's deployment engine. Engineering for the global south requires a shift in mindset: performance isn't a feature, it's a requirement.",
    likes: 142,
    replies: 12,
    link: "https://linkedin.com/..."
  },
  {
    id: "FE_002",
    platform: "X-PLATFORM",
    icon: Link2Off,
    handle: "oche_dev",
    timestamp: "5 HOURS AGO",
    content: "Next.js 15 + EEE hardware logic is a lethal combination. Build systems that don't just scale, but endure. 🚀 #BuildingThecla",
    likes: 211,
    replies: 45,
    link: "https://twitter.com/..."
  },
  {
    id: "FE_003",
    platform: "THECLA_OS",
    icon: Cpu,
    handle: "system.protocol",
    timestamp: "1 DAY AGO",
    content: "[SYS_MSG] Internal module deployment complete. Thecla Ed-Tech protocols active. Scaling in West Africa...",
    likes: 98,
    replies: 3,
    link: "#"
  }
];

// --- INTERACTIVE POST COMPONENT ---
const InteractivePost = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const Icon = post.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
      className="relative flex flex-col p-6 border border-white/5 bg-[#0d0d0d] rounded-2xl transition-colors duration-500 overflow-hidden"
    >
      <NavBar />
      {/* HEADER: Identification & Status */}
      <div className="flex justify-between items-center mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-500">
            <Icon size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">{post.platform}</span>
            <span className="text-[11px] font-bold text-blue-500 uppercase tracking-tight">@{post.handle}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-800 uppercase italic">
          <Bell size={12} className="text-zinc-700"/>
          {post.timestamp}
        </div>
      </div>

      {/* CONTENT: Main Text */}
      <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light mb-8 z-10">
        "{post.content}"
      </p>

      {/* FOOTER: Interaction Layer */}
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-6">
          {/* LIKE BUTTON */}
          <button onClick={handleLike} className="group flex items-center gap-2 font-mono text-xs transition-colors">
            <Heart 
              size={18} 
              className={cn(
                "transition-colors",
                liked ? "text-red-500 fill-red-500" : "text-zinc-600 group-hover:text-red-400"
              )}
            />
            <span className={liked ? "text-white" : "text-zinc-600 group-hover:text-zinc-300"}>
              {likesCount}
            </span>
          </button>

          {/* COMMENT BUTTON */}
          <button className="group flex items-center gap-2 font-mono text-xs text-zinc-600 hover:text-blue-400 transition-colors">
            <MessageCircle size={18} />
            <span className="group-hover:text-zinc-300">{post.replies}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* BOOKMARK BUTTON */}
          <button onClick={() => setBookmarked(!bookmarked)} className="group text-zinc-700 hover:text-emerald-400 transition-colors">
            <Bookmark 
              size={16} 
              className={cn(
                "transition-colors",
                bookmarked ? "text-emerald-500 fill-emerald-500" : "text-zinc-700 group-hover:text-emerald-400"
              )}
            />
          </button>

          {/* SHARE/LINK BUTTON */}
          <a href={post.link} target="_blank" className="text-zinc-700 hover:text-white transition-colors">
            <Link2 size={16} />
          </a>
        </div>
      </div>

      {/* BACKGROUND DECOR (Blueprint grid) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
    </motion.div>
  );
};

// --- MAIN FEED PAGE COMPONENT ---
export default function AndrewFeedSpace() {
  return (
    <section id="feed" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row">
      
      {/* --- LEFT SIDE: SIGNAL COMMAND (40%) --- */}
      <div className="w-full md:w-[40%] p-8 md:p-20 flex flex-col justify-between border-r border-white/5 bg-[#0d0d0d] sticky top-0 md:h-screen">
        
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <Radio size={16} className="text-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Live_Transmission // Uplink_01</span>
          </motion.div>

          <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter text-white uppercase leading-[0.85] italic">
            SOCIAL <br />
            <span className="text-zinc-800 not-italic">SPACE.</span>
          </h2>
          
          <p className="mt-10 text-zinc-500 text-sm font-light leading-relaxed max-w-xs uppercase tracking-widest">
            Welcome to the <span className="text-white italic">Andrew Oche</span> social interface. Real-time updates on MY TECH journey and engineering paradigms. <span className="text-blue-500">Interact to initialize.</span>
          </p>
        </div>

        {/* FEED OPTICS MOCKUP */}
        <div className="mt-20 p-6 border border-white/5 bg-white/[0.02] rounded-2xl space-y-4">
          <div className="flex justify-between items-center font-mono text-[9px] uppercase">
            <span className="text-zinc-700 tracking-widest">Protocol_Uptime</span>
            <span className="text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]">99.98%</span>
          </div>
          <div className="flex justify-between items-center font-mono text-[9px] uppercase">
            <span className="text-zinc-700 tracking-widest">Active_Sessions</span>
            <span className="text-blue-500">23_Transmitting</span>
          </div>
          
          <div className="pt-4 border-t border-white/5 flex gap-2">
             {/* {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-800">
                  <Icon size={14}/>
                </div>
             ))} */}
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE INTERACTIVE STREAM (60%) --- */}
      <div className="w-full md:w-[60%] p-8 md:p-12 space-y-8 bg-black">
        
        {/* POST INPUT MOCKUP */}
        <div className="p-6 border border-white/5 bg-[#0d0d0d] rounded-2xl flex items-center gap-4">
           <div className="w-12 h-12 rounded-full border border-white/10 p-1 bg-[#121212]">
              <img src="/your-photo.jpg" alt="Andrew" className="w-full h-full object-cover rounded-full grayscale" />
           </div>
           <div className="flex-1 bg-zinc-900 border border-white/5 px-6 py-3 rounded-full text-zinc-600 text-sm font-mono tracking-wider italic">
              Awaiting user input_
           </div>
           <motion.button 
             whileTap={{ scale: 0.95 }}
             className="p-4 rounded-xl bg-blue-600 text-white"
           >
              <Send size={18} />
           </motion.button>
        </div>

        {/* THE SIGNAL FEED */}
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {mockFeedData.map((post) => (
              <InteractivePost key={post.id} post={post} />
            ))}
          </div>
        </AnimatePresence>

        {/* INDUSTRIAL FOOTER LABEL */}
        <div className="mt-16 border-t border-white/5 pt-8 text-center font-mono text-[9px] text-zinc-800 uppercase tracking-[0.5em] opacity-50 select-none">
           Andrew_Oche_Operating_System // Social_Kernel // v2024.9
        </div>

      </div>

    </section>
  );
}