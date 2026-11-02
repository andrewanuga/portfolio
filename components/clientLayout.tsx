"use client";

import { useState } from "react";
import Loader from "@/components/loader";
import type React from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div className="w-full min-h-screen">
        {children}
      </div>
    </>
  );
}
