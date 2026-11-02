"use client";

import { useEffect, useRef } from "react";
import { startStage } from "@/lib/stage";
import { useStageEffect } from "@/lib/useStage";
import Frame from "./Frame";
import FloatingUI from "./FloatingUI";
import { MemoryPanel, TimePanel } from "./Panels";

/**
 * A tall scroll track with one sticky 100vh stage inside it. Scroll position
 * drives every scene — nothing here uses React state for animation.
 */
export default function Stage() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => startStage(() => track.current), []);

  const stageRef = useStageEffect<HTMLDivElement>((el, s) => {
    el.style.backgroundColor = s.bg;
  });

  return (
    <div ref={track} className="relative h-[900vh]">
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <Frame />
        <FloatingUI />
        <MemoryPanel />
        <TimePanel />
      </div>
    </div>
  );
}
