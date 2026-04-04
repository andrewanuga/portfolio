"use client";

import React, { useState, useEffect } from "react";
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
  SquareUser,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "About", icon: User, href: "#about" },
  { name: "Projects", icon: Briefcase, href: "#projects" },
];

const pageNav = [
  { name: "Home", icon: Home, to: "/" },
  { name: "Lab", icon: FlaskConical, to: "/lab" },
  { name: "Connect", icon: MessageSquareMore, to: "/connect" },
  { name: "Blog", icon: BookText, to: "/blog" },
  { name: "Project", icon: Terminal, to: "/project" },
  { name: "Contact", icon: SquareUser, to: "/contact" },
];

export default function NavBar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Desktop Navigation (Original Design)
  if (!isMobile) {
    return (
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4">
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
                      className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-tighter rounded-md shadow-lg pointer-events-none whitespace-nowrap"
                    >
                      {item.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>

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

          {/* PAGE NAVIGATION LINKS (Right Side) */}
          <div className="flex items-center gap-1">
            {pageNav.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.name}
                  href={item.to}
                  className={cn(
                    "p-3 rounded-full border transition-all duration-500",
                    isActive
                      ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                      : "bg-blue-600/10 border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white"
                  )}
                >
                  <item.icon size={20} strokeWidth={1.5} />
                </Link>
              );
            })}
          </div>
        </motion.nav>
      </nav>
    );
  }

  // Mobile Navigation (Bottom Dock + Slide-out Menu)
  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pt-2">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-[#121212]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">
                Available
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-full bg-blue-600/20 text-blue-400"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Quick Action Icons */}
          <div className="flex items-center justify-around p-3">
            {pageNav.slice(0, 4).map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.name}
                  href={item.to}
                  className={cn(
                    "p-2 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <item.icon size={20} strokeWidth={1.5} />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-[#121212] border-l border-white/10 shadow-2xl z-[200] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <span className="text-[8px] font-mono text-blue-500 uppercase tracking-[0.3em]">Menu</span>
                  <h3 className="text-lg font-bold text-white mt-1">Navigation</h3>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Page Navigation Section */}
                <div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider block mb-3">Pages</span>
                  <div className="space-y-1">
                    {pageNav.map((item) => {
                      const isActive = pathname === item.to;
                      return (
                        <Link
                          key={item.name}
                          href={item.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                            isActive
                              ? "bg-blue-600/20 text-blue-500 border border-blue-500/30"
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <item.icon size={18} strokeWidth={1.5} />
                          <span className="text-sm font-medium">{item.name}</span>
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Scroll Section */}
                <div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider block mb-3">Scroll To</span>
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all duration-300"
                      >
                        <item.icon size={18} strokeWidth={1.5} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-emerald-500 uppercase tracking-wider">Ready_For_Work</p>
                    <p className="text-[8px] text-zinc-600 mt-0.5">Available for freelance & contracts</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}