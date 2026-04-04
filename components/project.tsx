"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Box, Zap, Cpu, Database, ArrowRight } from "lucide-react";
import { cn } from "@//components/lib/utils";

const ProjectEntry = ({ 
  id, 
  title, 
  description, 
  tags, 
  metric, 
  isFeatured = false 
}: { 
  id: string; 
  title: string; 
  description: string; 
  tags: string[]; 
  metric: string;
  isFeatured?: boolean;
}) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={cn(
      "group relative flex flex-col justify-between p-8 border-b border-white/5 transition-all duration-700",
      isFeatured ? "bg-blue-600/[0.03] md:col-span-2" : "hover:bg-white/[0.01]"
    )}
  >
    {/* PROJECT IDENTIFIER */}
    <div className="flex justify-between items-start mb-16">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] text-blue-500/50">[{id}]</span>
        <div className="h-[1px] w-8 bg-zinc-800 group-hover:w-12 group-hover:bg-blue-500 transition-all duration-500" />
      </div>
      <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest border border-zinc-800 px-2 py-1 rounded">
        {metric}
      </div>
    </div>

    {/* PROJECT INTEL */}
    <div>
      <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic group-hover:not-italic transition-all duration-500">
        {title}
      </h3>
      <p className="mt-4 text-zinc-500 text-sm leading-relaxed max-w-md group-hover:text-zinc-300 transition-colors">
        {description}
      </p>
    </div>

    {/* PROJECT SPECS & LINKS */}
    <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-[8px] font-mono text-zinc-500 border border-white/5 px-2 py-1 rounded-sm bg-black uppercase group-hover:border-blue-500/20 group-hover:text-zinc-400">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex gap-4 items-center">
        <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:border-blue-500/50 transition-all">
          {/* <Github size={16} /> */}
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all">
          Launch <ExternalLink size={12} />
        </a>
      </div>
    </div>

    {/* BACKGROUND GLOW (Subtle) */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

export default function ProjectSection() {
  return (
    <section id="projects" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row">
      
        {/* Background Decorative "04" */}
        <div className="absolute -bottom-10 -left-10 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
          04
        </div>
        
      {/* --- LEFT SIDE: THE REPOSITORY DATA (40%) --- */}
      <div className="w-full md:w-[40%] p-8 md:p-20 flex flex-col justify-between border-r border-white/5 bg-[#0d0d0d] sticky top-0 md:h-screen">
        
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <Box size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Production_Log // 04</span>
          </motion.div>

          <h2 className="text-5xl md:text-[2.9rem] lg:text-[4.7rem] xl:text-[6.5rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic">
            PROJECT <br />
            <span className="text-zinc-800 not-italic">ARCHIVE.</span>
          </h2>
          
          <p className="mt-10 text-zinc-500 text-sm font-light leading-relaxed max-w-xs uppercase tracking-widest">
            A verified collection of <span className="text-white italic">hardware logic</span> and <span className="text-white italic">full-stack infrastructure</span>.
          </p>
        </div>

        {/* SYSTEM STATS MOCKUP */}
        <div className="mt-20 space-y-6">
          <div className="p-4 border border-white/5 bg-white/[0.02] rounded-xl font-mono text-[9px] uppercase space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-600">Active_Nodes</span>
              <span className="text-blue-500">12_Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Total_Commits</span>
              <span className="text-blue-500">2.4k+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Uptime</span>
              <span className="text-blue-500">99.98%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-zinc-800">
             <Cpu size={24} />
             <Zap size={24} />
             <Database size={24} />
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE MANIFEST ENTRIES (60%) --- */}
      <div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 bg-black">
        
        <ProjectEntry 
          id="PROJ_001"
          isFeatured
          title="Omni-SaaS"
          description="Multi-tenant Enterprise Resource Planning platform. Features dynamic RBAC, real-time analytics, and automated multi-region deployment."
          tags={['Next.js', 'PostgreSQL', 'Prisma', 'Stripe']}
          metric="Scaling_Active"
        />

        <ProjectEntry 
          id="PROJ_002"
          title="Stream-Sync"
          description="Bi-directional WebSocket engine for collaborative environments. Handles 5k+ concurrent connections with sub-50ms latency."
          tags={['Node.js', 'Redis', 'Socket.io', 'Docker']}
          metric="v2.4_Stable"
        />

        <ProjectEntry 
          id="PROJ_003"
          title="Pay-Vault"
          description="Secure payment gateway integration layer. PCI-DSS compliant architecture with automated reconciliation and fraud detection."
          tags={['Go', 'GRPC', 'PostgreSQL', 'Kubernetes']}
          metric="Enterprise_Grade"
        />

        <ProjectEntry 
          id="PROJ_004"
          title="Cloud-Optic"
          description="Infrastructure monitoring dashboard. Aggregates AWS CloudWatch logs and visualizes system health metrics via custom D3.js hooks."
          tags={['TypeScript', 'AWS SDK', 'D3.js', 'Terraform']}
          metric="Internal_Tool"
        />

        {/* BOTTOM FULL-WIDTH LINK */}
        <motion.div 
          whileHover={{ x: 10 }}
          className="md:col-span-2 p-12 flex items-center justify-between group cursor-pointer border-b border-white/5"
        >
          <h4 className="text-2xl font-bold text-white uppercase italic tracking-tighter">View full repository_</h4>
          <div className="p-4 rounded-full bg-zinc-900 group-hover:bg-blue-600 transition-all">
             <ArrowRight size={24} className="text-white" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}