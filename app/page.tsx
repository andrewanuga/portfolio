"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Hero from "@/components/hero";
import Noise from "@/components/Noise";
import NavBar from "@/components/navbar";
import RippleGrid from "@/components/RippleGrid";
import BioSection from "@/components/bio";
import ServicesSection from "@/components/services";
import ProjectSection from "@/components/project";
import SocialSection from "@/components/socialSection ";
import HireMeSection from "@/components/hireMe";
import FooterSection from "@/components/footer";


export default function MainPage() {
  return (
    // THE OUTER CONTAINER (8px Padding from screen edge)
    <div className="h-auto w-full bg-[#0a0a0a] p-2 overflow-hidden flex flex-col relative">
      <NavBar />
      <main className="main-content overflow-y-scroll overflow-x-hidden relative flex-1 bg-[#121212]/80 backdrop-blur-[20px] rounded-2xl border border-white/10 ring-1 ring-white/5 ring-offset-[5px] ring-offset-[#0a0a0a]">
        <Hero />
        <BioSection />
        <ServicesSection />
        <ProjectSection />
        <SocialSection />
        <HireMeSection />
        <FooterSection />
        <Noise
          patternSize={150}
          patternScaleX={2}
          patternScaleY={2}
          patternRefreshInterval={10}
          patternAlpha={10}
        />
      </main>
    </div>
  );
}