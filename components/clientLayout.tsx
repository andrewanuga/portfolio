"use client";

import { useState } from "react";
import Image from "next/image";
import Loader from "@/components/loader";
import type React from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        <div className="fixed backdrop-blur-md px-3 py-2 rounded-md flex z-1000 left-5 top-5 justify-center items-center gap-3">
          <Image src="/logo2.svg" alt="Andrew Oche" width={50} height={50} className="rounded-lg"/>
          <p className="text-xl md:text-[rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic">Andrew</p>
        </div>
        {children}
      </div>
    </>
  );
}