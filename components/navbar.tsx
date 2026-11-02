"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Navbar() {
  const time = useClock();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a
        href="#"
        aria-label="Back to Top"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#27272b] text-white shadow-lg transition hover:bg-[#333338]"
      >
        <Image src="/logo2.svg" alt="Andrew" width={22} height={22} className="rounded" />
      </a>

      <header className="fixed left-1/2 top-3 z-50 -translate-x-1/2">
        <nav className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1c1c20]/85 py-1.5 pl-2 pr-1.5 text-[11px] text-white/80 shadow-[0_8px_30px_rgba(0,0,0,.35)] backdrop-blur-xl sm:gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Navigation Menu"
            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 transition hover:bg-white/20 sm:hidden"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              {[0, 4.5, 9].flatMap((x) =>
                [0, 4.5, 9].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="2.2" height="2.2" rx=".5" />),
              )}
            </svg>
          </button>

          <span className="hidden tabular-nums font-mono text-white/70 sm:inline">{time}</span>

          <span className="hidden items-center gap-1.5 text-white/60 md:flex">
            <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span>Available for hire</span>
          </span>

          <span className="hidden h-4 w-px bg-white/15 md:block" />

          <div className="hidden items-center gap-3.5 text-white/65 md:flex">
            {[
              { label: "Projects", href: "#projects" },
              { label: "Skills", href: "#skills" },
              { label: "Services", href: "#services" },
              { label: "About", href: "#about" },
              { label: "Hire", href: "#hire" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <span className="hidden h-4 w-px bg-white/15 md:block" />

          <a
            href="/Adakole_Andrew_Oche_Resume.pdf"
            download
            className="rounded-lg bg-white/15 px-3 py-1.5 font-medium text-white/90 transition hover:bg-white/25 hidden xs:inline-block"
          >
            CV
          </a>
          <a
            href="#hire"
            className="rounded-lg bg-kin-lime px-3 py-1.5 font-semibold text-black shadow-[0_0_0_2px_rgba(0,0,0,.85)] transition hover:brightness-95"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="mt-2 flex flex-col gap-1 rounded-xl border border-white/10 bg-[#1c1c20]/95 p-3 text-[12px] shadow-2xl backdrop-blur-2xl sm:hidden">
            {[
              { label: "Projects", href: "#projects" },
              { label: "Skills", href: "#skills" },
              { label: "Services", href: "#services" },
              { label: "About", href: "#about" },
              { label: "Hire Me", href: "#hire" },
              { label: "Contact Form", href: "/contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Adakole_Andrew_Oche_Resume.pdf"
              download
              className="mt-1 flex items-center justify-center rounded-lg bg-white/10 py-2 text-white font-medium"
            >
              Download Resume
            </a>
          </div>
        )}
      </header>
    </>
  );
}

// Integrated live digital clock and responsive mobile navigation drawer
