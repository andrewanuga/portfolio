"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Stage from "@/components/Stage";
import BioSection from "@/components/bio";
import ServicesSection from "@/components/services";
import ProjectSection from "@/components/project";
import HireMeSection from "@/components/hireMe";
import FooterSection from "@/components/footer";
import SkillSection from "@/components/skills";

export default function MainPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#050506] text-white selection:bg-blue-600/30 selection:text-white">
      <Navbar />
      <Stage />
      <ProjectSection />
      <SkillSection />
      <ServicesSection />
      <BioSection />
      <HireMeSection />
      <FooterSection />
    </main>
  );
}
