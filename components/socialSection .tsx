"use client";

import React from "react";
import { motion } from "framer-motion";
import {  Share2, Radio, Link2, ExternalLink } from "lucide-react";
import { cn } from "@/components/lib/utils";

const SocialSignal = ({ 
  platform, 
  icon: Icon, 
  handle, 
  content, 
  date, 
  link 
}: { 
  platform: "LINKEDIN" | "X-PLATFORM" | "INSTAGRAM"; 
  icon: any; 
  handle: string; 
  content: string; 
  date: string;
  link: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="group relative flex flex-col justify-between p-6 border border-white/5 bg-[#0d0d0d] rounded-2xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
  >
    {/* Scanline Effect for "Live" feel */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px]" />

    <div className="relative z-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-500 group-hover:text-blue-500 transition-colors">
            <Icon size={16} />
          </div>
          <span className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">{platform}</span>
        </div>
        <span className="text-[8px] font-mono text-zinc-800">{date}</span>
      </div>

      <p className="text-sm text-zinc-400 leading-relaxed font-light line-clamp-4 group-hover:text-zinc-200 transition-colors">
        "{content}"
      </p>
    </div>

    <div className="relative z-10 mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
      <span className="text-[10px] font-mono text-blue-500/50 uppercase tracking-tighter">@{handle}</span>
      <a 
        href={link} 
        target="_blank" 
        className="text-zinc-700 hover:text-white transition-colors"
      >
        <Link2 size={14} />
      </a>
    </div>

    {/* Hover Glow */}
    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-600/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

export default function SocialSection() {
  return (
    <section id="social" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row">
       {/* Background Decorative "05" */}
        <div className="absolute -bottom-10 -left-10 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
          05
        </div>
      {/* --- LEFT SIDE: SIGNAL CONTROL (40%) --- */}
      <div className="w-full md:w-[40%] p-8 md:p-20 flex flex-col justify-between border-r border-white/5 bg-[#0a0a0a] sticky top-0 md:h-screen">
        
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <Radio size={16} className="text-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Live_Broadcast // Uplink // 05</span>
          </motion.div>

          <h2 className="text-5xl md:text-[2.9rem] lg:text-[4.7rem] xl:text-[7rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic">
            SIGNAL <br />
            <span className="text-zinc-800 not-italic">STREAM.</span>
          </h2>
          
          <p className="mt-10 text-zinc-500 text-sm font-light leading-relaxed max-w-xs uppercase tracking-widest">
            Cross-platform data synchronization. Tracking my <span className="text-white">Tech </span> journey and <span className="text-white">Thecla</span>.
          </p>
        </div>

        {/* CONNECTION STATUS MOCKUP */}
        <div className="mt-20 space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-mono text-[9px] text-zinc-700 uppercase">
              <span>Bandwidth_Usage</span>
              <span>89%</span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "89%" }}
                className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-600 uppercase italic">
            <span className="animate-pulse text-emerald-500">●</span>
            Transmitting_Lagos_NG
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE FEED GRID (60%) --- */}
      <div className="w-full md:w-[60%] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40">
        
        {/* LINKEDIN POST */}
        <SocialSignal 
          platform="LINKEDIN"
          icon={ExternalLink}
          handle="andrewoche"
          date="02.APR.26"
          content="Happy New Month! Most people wait until January to reset, but the real work starts on April 1st.

Reflecting on the last quarter, it was a massive learning curve. Quatar 1 was about laying the foundation, testing new strategies, and finding my rhythm in 2026’s fast-moving landscape. But now? It’s time to shift from planning to execution.
For the next 3 months, I’m locking in. I am officially starting a 90-day streak. No excuses, no 'waiting for the right time,' just consistent, daily action toward my biggest goals for the first half of this year. My goal is to look back on June 30th and know that I didn't just participate in Q2—I dominated it.
Who else is entering this Sprint Phase this month? Whether it’s a fitness goal, a professional milestone, or a personal project—drop a Locked in below if you’re joining me in making these next 90 days count."
          link="https://www.linkedin.com/posts/andrew-adakole-63462227a_newmonth-q2-90daychallenge-activity-7445357797107535872-YTnt?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQUWwgBJT22zy0L6T4igjf1c3HCHa3iTqA"
        />

        {/* X POST */}
        <SocialSignal 
          platform="LINKEDIN"
          icon={ExternalLink}
          handle="oche_dev"
          date="01.APR.26"
          content="The shift from an engineering exam hall to a development environment is a trip. One minute you’re staring at a paper, manually calculating matrix transformations for EEE 309 (MATLAB), and the next, you’re back at your desk trying to remember why you left a Next.js component half-finished three weeks ago. 
It’s officially Day 3 of exams, and honestly, MATLAB logic just primes the brain for more. Instead of crashing into bed, I found myself crashing straight back into my terminal. There’s a specific kind of exam season adrenaline that makes you want to build something real the second you hand in your script.
But the reality of the grind isn't always smooth.
But in the end it is worth it

#FullStackDeveloper #EEELife #MATLAB #Thecla #BuildInPublic #EngineeringStudent #NextJS #StartupLife #FUTA"
          link="https://www.linkedin.com/posts/andrew-adakole-63462227a_fullstackdeveloper-eeelife-matlab-activity-7443330136843935745-51yZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQUWwgBJT22zy0L6T4igjf1c3HCHa3iTqA"
        />

        {/* INSTAGRAM POST */}
        <SocialSignal 
          platform="INSTAGRAM"
          icon={ExternalLink}
          handle="andrew_design"
          date="28.MAR.26"
          content="Who's locked in with me this second quarter of the year April 1st - June 30

Drop 🔒 below if u are

I am Locked In 👨🏾‍💻

#Q2 #90DaySprints #FullStack #BuildInPublic #lockedin🔐"
          link="https://www.instagram.com/p/DWnpjEcjFIM/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA=="
        />

        {/* CTA MODULE */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-zinc-800 hover:border-blue-500/50 transition-all text-center"
        >
          <Share2 className="text-zinc-800 mb-4 group-hover:text-blue-500" size={32} />
          <h4 className="text-white font-bold uppercase italic tracking-tighter">Join the network_</h4>
          <p className="text-[9px] font-mono text-zinc-600 uppercase mt-2">Follow for real-time updates</p>
        </motion.div>

        {/* DECORATIVE TERMINAL TEXT */}
        <div className="md:col-span-2 mt-12 opacity-10 font-mono text-[8px] text-zinc-500 uppercase leading-loose">
          {">"} sync_protocol_initiate... <br />
          {">"} fetching_linkedIn_api_v2.4... success <br />
          {">"} x_api_status_online... success <br />
          {">"} instagram_media_cache_stable...
        </div>
      </div>

    </section>
  );
}