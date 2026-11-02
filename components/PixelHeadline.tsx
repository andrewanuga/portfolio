"use client";

import { useMemo } from "react";
import { useStageEffect } from "@/lib/useStage";

/** 5×7 pixel glyphs — rendered as SVG cells so the edges stay blocky at any size. */
const GLYPHS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10011", "01111"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "01010", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
  X: ["10001", "01010", "00100", "00100", "00100", "01010", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  "'": ["1", "1", "1", "0", "0", "0", "0"],
  ".": ["0", "0", "0", "0", "0", "1", "1"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
};

const TEXT = "HELLO I'M ANDREW";

export default function PixelHeadline() {
  const { cells, width } = useMemo(() => {
    const out: { x: number; y: number; delay: number }[] = [];
    let cursor = 0;
    let n = 0;
    for (const ch of TEXT) {
      if (ch === " ") {
        cursor += 3;
        continue;
      }
      const rows = GLYPHS[ch] || GLYPHS[" "];
      if (!rows) {
        cursor += 4;
        continue;
      }
      rows.forEach((row, y) => {
        [...row].forEach((v, x) => {
          if (v === "1") {
            // deterministic pseudo-random so server and client markup match
            const rnd = ((n++ * 9301 + 49297) % 233280) / 233280;
            out.push({ x: cursor + x, y, delay: 0.25 + (cursor + x) * 0.015 + rnd * 0.5 });
          }
        });
      });
      cursor += rows[0].length + 1;
    }
    return { cells: out, width: cursor - 1 };
  }, []);

  const ref = useStageEffect<HTMLDivElement>((el, s) => {
    el.style.opacity = String(s.hero);
    el.style.transform = `translate3d(0,${s.heroShift}px,0)`;
  });

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-[-2vw] top-[21%] select-none will-change-transform"
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${width} 7`}
        className="block w-[106vw] max-w-none"
        shapeRendering="crispEdges"
      >
        {cells.map((c, i) => (
          <rect
            key={i}
            className="px"
            x={c.x + 0.03}
            y={c.y + 0.03}
            width={0.94}
            height={0.94}
            fill="#c6c6cc"
            style={{ animationDelay: `${c.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
