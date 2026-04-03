"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  ArrowUpRight, 
  Terminal, 
  Download 
} from "lucide-react";
import { SocialIcon } from 'react-social-icons'

const SocialLink = ({ icon: Icon, label, href }: { icon: any; label: string; href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-blue-500/30 transition-all duration-500"
  >
    <div className="flex items-center gap-6">
      <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-zinc-600 group-hover:text-blue-500 group-hover:border-blue-500/20 transition-all">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <span className="text-xl md:text-2xl font-bold text-zinc-500 group-hover:text-white group-hover:italic transition-all uppercase tracking-tighter">
        {label}
      </span>
    </div>
    <ArrowUpRight className="text-zinc-800 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
  </a>
);

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0a0a0a] border-t border-white/10 pt-24 pb-10 px-6 md:px-20 overflow-hidden">
        {/* Background Decorative "07" */}
        <div className="absolute -bottom-10 -left-10 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
          07
        </div>
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none select-none">
        <Terminal size={400} className="text-white" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
        
        {/* --- LEFT: BRANDING & CV (5/12) --- */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-12 bg-blue-600 shadow-[0_0_8px_#3b82f6]" />
              <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Export_Data // 07</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none mb-10">
              STAY <br />
              <span className="text-zinc-800 not-italic">CONNECTED.</span>
            </h2>

            <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs uppercase tracking-widest mb-12">
              Ready to <span className="text-white">collaborate</span> on high-performance systems or hire me? 
            </p>
          </div>

          {/* DOWNLOAD CV BUTTON */}
          <motion.a 
            href="/Andrew_Oche_CV.pdf"
            download
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-between w-full max-w-xs p-6 rounded-2xl bg-blue-600 text-white overflow-hidden transition-all shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-70">Curriculum_Vitae</span>
              <h3 className="text-xl font-black italic uppercase tracking-tighter mt-1">Download_CV</h3>
            </div>
            <div className="relative z-10 p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
              <Download size={20} />
            </div>
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.a>
        </div>

        {/* --- RIGHT: SOCIAL LINKS (7/12) --- */}
        <div className="md:col-span-7 flex flex-col justify-end">
          <div className="grid grid-cols-1 gap-3">
            <SocialIcon url="https://linkedin.com" label="LinkedIn" href="https://www.linkedin.com/in/andrew-adakole-63462227a" />
            <SocialIcon url="https://twitter.com" label="Twitter / X" href="https://x.com/adakole56andrew" />
            <SocialIcon url="https://instagram.com" label="Instagram" href="https://www.instagram.com/andrew_phiip_neri/" />
            <SocialIcon url="https://github.com" label="GitHub" href="https://github.com/andrewanuga" />
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR: COPYRIGHT & METADATA --- */}
      <div className="relative z-10 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo/Copy */}
        <div className="flex items-center gap-6">
          <span className="text-white font-black italic tracking-tighter text-lg uppercase">
            Andrew_Oche<span className="text-blue-600">.SYS</span>
          </span>
          <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
            &copy; Andrew_2026. ALL_RIGHTS_RESERVED
          </span>
        </div>

        {/* System Details */}
        <div className="hidden lg:flex items-center gap-12 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.4em]">
          <span>Lagos_NG // 6.5244° N, 3.3792° E</span>
          <span>Latency: 24ms</span>
          <span>Status: Online</span>
        </div>

        {/* Back to Top */}
        <button 
          onClick={scrollToTop}
          className="group flex items-center gap-3 text-[10px] font-mono text-zinc-500 hover:text-blue-500 transition-colors uppercase tracking-widest"
        >
          Return_To_Top 
          <div className="p-2 rounded-full border border-zinc-800 group-hover:border-blue-500 group-hover:-translate-y-1 transition-all">
            <ArrowUpRight className="-rotate-45" size={12} />
          </div>
        </button>
      </div>

      {/* Final Industrial Marker */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[90%] h-[1px] bg-gradient-to-r from-transparent via-zinc-900 to-transparent" />
    </footer>
  );
}