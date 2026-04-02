"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Briefcase, 
  MessageSquare, 
  Terminal, 
  Activity, 
  FlaskConical,
  MessageSquareMore,
  BookText,
  SquareUser
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "About", icon: User, href: "#about" },
  { name: "Projects", icon: Briefcase, href: "#projects" },
];

const pageNav=[
  { name: "Home", icon: <Home />, to: "/" },
  { name: "Lab", icon : <FlaskConical />, to: "/lab"},
  { name: "Connect", icon: <MessageSquareMore />, to: "/connect" },
  { name: "Blog", icon: <BookText />, to: "/blog" },
  { name: "Project", icon: <Terminal />, to: "/project" },
  { name: "Contact", icon: <SquareUser />, to: "/contact" },
]

export default function NavBar() {

  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 px-4">
      {/* THE DOCK CONTAINER */}
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
        className="flex items-center gap-2 p-2 bg-[#121212]/70 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
      >
        
        {/* SYSTEM STATUS INDICATOR (Left Side) */}
        <div className="flex items-center gap-2 px-4 border-r border-white/10 mr-2 group cursor-help">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden md:block">
            Available for Hire
          </span>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className="relative p-3 rounded-full text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <item.icon size={20} strokeWidth={1.5} />
              
              {/* TOOLTIP */}
              <AnimatePresence>
                {hovered === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-tighter rounded-md shadow-lg pointer-events-none"
                  >
                    {item.name}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTIVE GLOW (Optional logic for active state) */}
              {hovered === item.name && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* TERMINAL SHORTCUT (Right Side) */}
        {pageNav.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.name}
              href={item.to}
              className={cn(
                "ml-2 p-3 rounded-full border transition-all duration-500",
                isActive
                  ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                  : "bg-blue-600/10 border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white"
              )}
            >
              {item.icon}
            </Link>
          );
        })}
      </motion.nav>
    </nav>
  );
}