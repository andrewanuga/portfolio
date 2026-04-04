"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Globe, Cpu, Layout, Zap, Layers, 
  ChevronRight, Database, Terminal, Menu, X, ExternalLink 
} from "lucide-react";
import { cn } from "@/components/lib/utils";
import NavBar from "@/components/navbar";

// --- PROJECT DATA (centralized) ---
const projectsData = {
  thecla: {
    id: "001",
    name: "Thecla",
    tag: "EdTech / Next.js",
    title: "THECLA",
    subtitle: "INFRA.",
    description: "Most platforms struggle with payload size. My approach for Thecla was to treat every network request like a circuit signal. By utilizing **React Server Components** and **Streaming SSR**, we cut initial load times by 60%, ensuring the education engine runs smoothly even on 3G connections.",
    quote: '"Building for high-efficiency, low-latency environments."',
    metrics: { performance: "99%", latency: "24ms_Avg" },
    techStack: [
      { icon: <Cpu size={24} />, label: "Compute", val: "Next.js Edge" },
      { icon: <Database size={24} />, label: "Persistence", val: "PostgreSQL / Redis" },
      { icon: <Terminal size={24} />, label: "Interface", val: "Tailwind / Framer" }
    ],
    lessons: [
      "Minimize hydrated state for mobile nodes.",
      "Global CDNs are non-negotiable for reach."
    ]
  },
  omniSaas: {
    id: "002",
    name: "Omni-SaaS",
    tag: "ERP / PostgreSQL",
    title: "OMNI-SAAS",
    subtitle: "ERP.",
    description: "Built a comprehensive ERP system with real-time inventory tracking, automated billing workflows, and role-based access control. The system handles 10k+ concurrent users with sub-100ms response times.",
    quote: '"Enterprise-grade reliability meets modern UX."',
    metrics: { performance: "99.9%", latency: "45ms_Avg" },
    techStack: [
      { icon: <Database size={24} />, label: "Database", val: "PostgreSQL" },
      { icon: <Cpu size={24} />, label: "Backend", val: "Node.js" },
      { icon: <Layout size={24} />, label: "Frontend", val: "React" }
    ],
    lessons: [
      "Schema design is critical for scale.",
      "Caching strategies prevent bottlenecks."
    ]
  },
  streamSync: {
    id: "003",
    name: "Stream-Sync",
    tag: "WebSockets / Go",
    title: "STREAM-SYNC",
    subtitle: "REALTIME.",
    description: "Real-time synchronization platform handling 50k+ concurrent WebSocket connections. Built with Go for performance and deployed across multiple regions.",
    quote: '"Instant data sync at global scale."',
    metrics: { performance: "99.5%", latency: "12ms_Avg" },
    techStack: [
      { icon: <Zap size={24} />, label: "Protocol", val: "WebSockets" },
      { icon: <Terminal size={24} />, label: "Language", val: "Golang" },
      { icon: <Database size={24} />, label: "Cache", val: "Redis" }
    ],
    lessons: [
      "Connection pooling reduces overhead.",
      "Message batching improves throughput."
    ]
  },
  cloudOptic: {
    id: "004",
    name: "Cloud-Optic",
    tag: "DevOps / Terraform",
    title: "CLOUD-OPTIC",
    subtitle: "DEVOPS.",
    description: "Infrastructure as Code solution using Terraform and AWS. Automated deployment pipelines reduced provisioning time from hours to minutes.",
    quote: '"Infrastructure that evolves with your needs."',
    metrics: { performance: "99.99%", latency: "32ms_Avg" },
    techStack: [
      { icon: <Layers size={24} />, label: "IaC", val: "Terraform" },
      { icon: <Cpu size={24} />, label: "Cloud", val: "AWS" },
      { icon: <Terminal size={24} />, label: "CI/CD", val: "GitHub Actions" }
    ],
    lessons: [
      "Immutable infrastructure prevents drift.",
      "Monitoring is not optional."
    ]
  }
};

// --- QUICK NAVIGATION COMPONENT (Uses state instead of links) ---
const ProjectSwitcher = ({ 
  isOpen, 
  setIsOpen, 
  onProjectSelect 
}: { 
  isOpen: boolean; 
  setIsOpen: (v: boolean) => void;
  onProjectSelect: (projectId: string) => void;
}) => {
  const otherProjects = [
    { id: "omniSaas", name: "Omni-SaaS", tag: "ERP / PostgreSQL" },
    { id: "streamSync", name: "Stream-Sync", tag: "WebSockets / Go" },
    { id: "cloudOptic", name: "Cloud-Optic", tag: "DevOps / Terraform" },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-[200]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-blue-600 text-white px-5 py-3 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
        {isOpen ? "Close_Repository" : "Project_Menu"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-full mb-4 left-0 w-72 bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
          >
            <span className="text-[9px] font-mono text-zinc-600 uppercase mb-4 block border-b border-white/5 pb-2">Jump_To_Node</span>
            <div className="space-y-1">
              {otherProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onProjectSelect(p.id);
                    setIsOpen(false);
                  }}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-blue-600/10 cursor-pointer transition-all border border-transparent hover:border-blue-500/20 w-full text-left"
                >
                  <div>
                    <div className="text-[10px] font-mono text-blue-500 group-hover:text-blue-400">[{p.id === "omniSaas" ? "002" : p.id === "streamSync" ? "003" : "004"}]</div>
                    <div className="text-sm font-bold text-zinc-300 group-hover:text-white uppercase">{p.name}</div>
                    <div className="text-[9px] text-zinc-600 group-hover:text-zinc-400 font-mono mt-1">{p.tag}</div>
                  </div>
                  <ChevronRight size={14} className="text-zinc-800 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BuildStep = ({ number, title, description, active = false }: any) => (
  <div className={cn(
    "relative pl-8 border-l pb-12 transition-colors",
    active ? "border-blue-500" : "border-zinc-800"
  )}>
    <div className={cn(
      "absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 bg-black transition-all",
      active ? "border-blue-500 shadow-[0_0_10px_#3b82f6]" : "border-zinc-800"
    )} />
    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Phase_{number}</span>
    <h4 className={cn("text-sm font-bold uppercase mt-1", active ? "text-white" : "text-zinc-600")}>{title}</h4>
    <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed uppercase">{description}</p>
  </div>
);

export default function ProjectShowcase() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<keyof typeof projectsData>("thecla");

  const project = projectsData[currentProject];

  // Define build steps based on current project
  const buildSteps = {
    thecla: [
      { number: "01", title: "Node Discovery", description: "Network analysis of low-latency educational needs.", active: true },
      { number: "02", title: "Infrastructure", description: "Next.js 15 Edge deployment & Vercel KV integration.", active: true },
      { number: "03", title: "UI Integration", description: "Implementing industrial high-contrast design systems.", active: true },
      { number: "04", title: "Validation", description: "Global CDN cache warming and TTFB optimization.", active: false }
    ],
    omniSaas: [
      { number: "01", title: "Schema Design", description: "Multi-tenant database architecture with Row Level Security.", active: true },
      { number: "02", title: "API Gateway", description: "Rate limiting and request validation layer.", active: true },
      { number: "03", title: "Dashboard UI", description: "Real-time analytics and reporting interface.", active: true },
      { number: "04", title: "Optimization", description: "Query optimization and connection pooling.", active: false }
    ],
    streamSync: [
      { number: "01", title: "Protocol Design", description: "Custom WebSocket handshake and message framing.", active: true },
      { number: "02", title: "Backend Engine", description: "Go-based server with goroutine pool management.", active: true },
      { number: "03", title: "Client SDK", description: "TypeScript client with automatic reconnection.", active: true },
      { number: "04", title: "Load Testing", description: "50k concurrent connection simulation.", active: false }
    ],
    cloudOptic: [
      { number: "01", title: "Infrastructure", description: "Terraform modules for VPC, subnets, and security groups.", active: true },
      { number: "02", title: "CI/CD Pipeline", description: "GitHub Actions workflow with automated testing.", active: true },
      { number: "03", title: "Monitoring Stack", description: "CloudWatch dashboards and alerting rules.", active: true },
      { number: "04", title: "Disaster Recovery", description: "Multi-region failover configuration.", active: false }
    ]
  };

  const steps = buildSteps[currentProject];

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-blue-500 selection:text-white">
      <NavBar />
      <ProjectSwitcher 
        isOpen={isNavOpen} 
        setIsOpen={setIsNavOpen}
        onProjectSelect={(projectId) => setCurrentProject(projectId as keyof typeof projectsData)}
      />

      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-white transition-all uppercase"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-blue-500" /> 
          Archive_Reference
        </button>
        <div className="flex gap-4">
          <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-[10px] font-bold text-white uppercase transition-all shadow-lg shadow-blue-600/20">
            LAUNCH_LIVE <ExternalLink size={12} />
          </a>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        
        {/* --- LEFT SIDE: THE BLUEPRINT TRACKER --- */}
        <aside className="w-full md:w-[30%] p-8 md:p-12 md:sticky md:top-20 md:h-[calc(100vh-80px)] overflow-y-auto border-r border-white/5 bg-[#0d0d0d]">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
               <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
               <span className="text-[9px] font-mono text-blue-500 uppercase tracking-[0.4em]">Node_Active</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-[0.8]">{project.title}<br/><span className="text-zinc-800 not-italic">{project.subtitle}</span></h1>
          </div>

          <div className="space-y-0">
            {steps.map((step, idx) => (
              <BuildStep key={idx} {...step} />
            ))}
          </div>

          {/* DYNAMIC METRICS BLOCK */}
          <div className="mt-12 space-y-3">
             <div className="p-4 rounded-xl border border-white/5 bg-black font-mono text-[9px] text-zinc-600">
                <div className="flex justify-between mb-2 uppercase"><span>System_Performance</span> <span className="text-white">{project.metrics.performance}</span></div>
                <div className="w-full h-1 bg-zinc-900 overflow-hidden rounded-full">
                  <motion.div 
                    key={currentProject}
                    initial={{ width: 0 }} 
                    animate={{ width: project.metrics.performance }} 
                    transition={{ duration: 0.8 }} 
                    className="h-full bg-blue-500" 
                  />
                </div>
             </div>
             <div className="p-4 rounded-xl border border-white/5 bg-black font-mono text-[9px] text-zinc-500 flex justify-between uppercase">
                <span>Latency</span> <span className="text-emerald-500">{project.metrics.latency}</span>
             </div>
          </div>
        </aside>

        {/* --- RIGHT SIDE: THE STORYTELLING VIEWPORT --- */}
        <main className="w-full md:w-[70%] p-8 md:p-24 space-y-40 bg-black">
          
          {/* SECTION 1: VISUAL EVIDENCE */}
          <motion.div 
            key={`visual-${currentProject}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group aspect-video rounded-3xl overflow-hidden border border-white/10 bg-zinc-900"
          >
             <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800 text-[10px] font-mono uppercase tracking-[1em]">
               [ {project.name}_Asset ]
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
             <div className="absolute bottom-8 left-8 flex items-center gap-3">
                <span className="text-[10px] font-mono text-blue-500 px-3 py-1 border border-blue-500/20 bg-blue-500/5 rounded">MOD_{project.id}</span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Fig_01: {project.name}_Architecture</span>
             </div>
          </motion.div>

          {/* SECTION 2: TECH STACK GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {project.techStack.map((item, i) => (
               <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl hover:bg-white/[0.03] transition-colors group">
                  <div className="text-zinc-700 group-hover:text-blue-500 transition-colors mb-4">{item.icon}</div>
                  <div className="text-[9px] font-mono text-zinc-600 uppercase mb-1 tracking-tighter">{item.label}</div>
                  <div className="text-lg font-bold uppercase text-zinc-300">{item.val}</div>
               </div>
             ))}
          </div>

          {/* SECTION 3: THE NARRATIVE */}
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.5em] mb-8">// The_Logic</h2>
            <p className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] text-white uppercase italic">
              {project.quote}
            </p>
            <p className="mt-12 text-zinc-500 leading-relaxed text-lg font-light">
              {project.description}
            </p>
          </div>

          {/* SECTION 4: THE LESSONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-12 rounded-[40px] border border-white/5 bg-[#0d0d0d] flex flex-col justify-between min-h-[300px]">
               <div>
                  <h2 className="text-xl font-black italic uppercase text-white mb-6">Engineering_Log_</h2>
                  <ul className="space-y-4 text-zinc-600 text-[10px] uppercase font-mono tracking-widest">
                    {project.lessons.map((lesson, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span className="text-blue-500">0{idx + 1}_</span> 
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
               </div>
               <Layers size={40} className="text-zinc-800 self-end" />
            </div>

            {/* CALL TO ACTION: NEXT PROJECT */}
            <motion.div 
              whileHover={{ x: 10 }}
              className="p-12 rounded-[40px] bg-blue-600 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              onClick={() => {
                const projectKeys = Object.keys(projectsData);
                const currentIndex = projectKeys.indexOf(currentProject);
                const nextIndex = (currentIndex + 1) % projectKeys.length;
                setCurrentProject(projectKeys[nextIndex] as keyof typeof projectsData);
              }}
            >
               <div className="z-10">
                  <span className="text-[10px] font-mono text-white/50 uppercase">Initialize_Next</span>
                  <h3 className="text-5xl font-black italic uppercase text-white mt-4">
                    {Object.values(projectsData)[(Object.keys(projectsData).indexOf(currentProject) + 1) % Object.keys(projectsData).length]?.name}_
                  </h3>
               </div>
               <div className="z-10 flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest mt-8">
                  Open Repository <ChevronRight size={16} />
               </div>
               <Cpu size={180} className="absolute -bottom-10 -right-10 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
            </motion.div>
          </div>

        </main>
      </div>

      {/* Decorative Background Text */}
      <div className="fixed bottom-10 right-10 opacity-[0.02] font-mono text-[12vw] font-black pointer-events-none uppercase tracking-tighter italic leading-none select-none">
        ARCHITECT
      </div>
    </section>
  );
}