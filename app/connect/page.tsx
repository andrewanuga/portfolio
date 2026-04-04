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
    id: "FE_000",
    platform: "LINKEDIN",
    icon: Unlink,
    handle: "andrew adakole",
    timestamp: "JUST NOW",
    content: "Ninety days is a long time, but it’s the small, daily bricks that build the skyscraper. Today, for Day 3 of my 90-day challenge, I’m diving deep into a project that feels incredibly personal: My Professional Portfolio. It’s easy to get caught up in building solutions for others, but there is something uniquely challenging about building for yourself. Your portfolio isn't just a website; it’s a digital handshake, a resume that breathes, and a testament to every late night spent debugging. I choose this project as a start because it gives my goal a definition and also help me align my progress The Stack 🛠️ I wanted this to be fast, type-safe, and visually sleek. Here’s how I’m bringing it to life, then I choose this: - Next.js: For that seamless, lightning-fast performance and SEO-friendly structure. - TypeScript: Because undefined is not a function is a ghost I’d rather not see. Type safety keeps the logic solid. - Tailwind CSS: For the freedom to craft unique UI without the bloat. The 'Why' Behind the Code ❤️ When I started coding, a blank screen was intimidating. Now, it’s a canvas. Building this portfolio is a reminder of how far I’ve come from building my portfolio many times already but I never finished because of one major hindrance, it's not perfect enough, It was tricky because I wanted perfection and also clearity in my portfolio then I took time to see what I actually wanted, then unto creativity, this process actually made me understand the difference between the perfect project and production ready project. I then learnt It’s about more than just showing off projects; it’s about documenting the journey, the failures, and the growth. Majorly all my for my past projects were not uploaded into the portfolio but all my new projects would be uploaded to it. If you’re a creator, you know the feeling—that mix of 'This is amazing' and 'I need to tweak this one pixel' that keeps us up until 2 AM. 😅 Let’s Interact! 👇 I want to hear from my fellow devs and creatives: First : What was the hardest part of building your own portfolio? Second : Are you a minimalist design person or do you love 'bold and flashy'? If you're on a growth challenge too, drop your Day # below! Let’s keep pushing. The best version of our work is always the next one. 🚀#90DaysOfCode #BuildInPublic #NextJS #WebDevelopment #TypeScript #TailwindCSS #SoftwareEngineering #CareerGrowth",
    likes: 0,
    replies: 0,
    link: "https://www.linkedin.com/posts/andrew-adakole-63462227a_90daysofcode-buildinpublic-webdevelopment-activity-7445872845982679041-ydn5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQUWwgBJT22zy0L6T4igjf1c3HCHa3iTqA"
  },
  {
    id: "FE_001",
    platform: "LINKEDIN",
    icon: Unlink,
    handle: "andrew adakole",
    timestamp: "1 DAY AGO",
    content: "It’s Day 3 of my 90-day challenge, and things are moving. But instead of jumping into a brand-new app, I’ve decided to stop and finally finish something that has been sitting on my to-do list for way too long: My Portfolio. I wanted to share exactly why I’m starting here, because it’s a lot more personal than just needing a website. For a long time, I’ve been a bit of a serial restarter. I’ve begun building my portfolio dozens of times, but I always hit a wall. I’d get obsessed with a minor thing, or I’d tell myself it wasn't perfect enough to represent me yet. That perfectionism didn't make me better—it just kept me stuck. I’m building this now because I need a home for my growth. I’ve realized that a portfolio shouldn't just be a trophy case for finished things; it needs to be a digital mirror of the journey itself. I’m using Next.js, Tailwind, and TypeScript to build something fast and sleek, but the real goal is to build something real. I’m moving away from the perfect project mindset and stepping into the production-ready world. I want a place where my failures, my late-night debug sessions, and my wins all have a seat at the table. It’s not quite ready for the world to see yet—I'm still polishing the edges—but for the first time, I’m not letting the fear of not good enough stop me. I’m building the foundation today so I can build the future tomorrow. Let's be real for a second: Have you ever left a project unfinished because you were afraid it wouldn’t be perfect? How did you break out of that loop? I’d love to hear your stories in the comments. Let’s keep pushing. #90DaysOfCode #BuildInPublic #WebDevelopment #NextJS #SoftwareEngineering #GrowthMindset #PersonalGrowth #day003",
    likes: 2,
    replies: 0,
    link: "https://www.linkedin.com/posts/andrew-adakole-63462227a_90daysofcode-buildinpublic-webdevelopment-activity-7445872845982679041-ydn5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQUWwgBJT22zy0L6T4igjf1c3HCHa3iTqA"
  },
  {
    id: "FE_002",
    platform: "LINKEDIN",
    icon: Unlink,
    handle: "andrew adakole",
    timestamp: "2 DAYS AGO",
    content: "Happy New Month! Most people wait until January to reset, but the real work starts on April 1st. Reflecting on the last quarter, it was a massive learning curve. Quatar 1 was about laying the foundation, testing new strategies, and finding my rhythm in 2026’s fast-moving landscape. But now? It’s time to shift from planning to execution. For the next 3 months, I’m locking in. I am officially starting a 90-day streak. No excuses, no 'waiting for the right time,' just consistent, daily action toward my biggest goals for the first half of this year. My goal is to look back on June 30th and know that I didn't just participate in Q2—I dominated it. Who else is entering this Sprint Phase this month? Whether it’s a fitness goal, a professional milestone, or a personal project—drop a Locked in below if you’re joining me in making these next 90 days count.",
    likes: 5,
    replies: 3,
    link: "https://www.linkedin.com/posts/andrew-adakole-63462227a_newmonth-q2-90daychallenge-activity-7445357797107535872-YTnt?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQUWwgBJT22zy0L6T4igjf1c3HCHa3iTqA"
  },
  {
    id: "FE_003",
    platform: "INSTAGRAM",
    icon: Cpu,
    handle: "andrew_phiip_neri",
    timestamp: "02 DAYS AGO",
    content: "Happy New Month Who's locked in with me this second quarter of the year April 1st - June 30 Drop 🔒 below if u are I am Locked In 👨🏾‍💻          #Q2 #90DaySprints #FullStack #BuildInPublic #lockedin🔐",
    likes: 3,
    replies: 0,
    link: "https://www.instagram.com/p/DWnpjEcjFIM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
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