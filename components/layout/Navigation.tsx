"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { label: "Overture", href: "#overture" },
  { label: "The First Note", href: "#first-note" },
  { label: "The Art of Piano", href: "#piano-story" },
  { label: "Breaking the Score", href: "#crossover" },
  { label: "The Music", href: "#music" },
  { label: "The Stage", href: "#stage" },
  { label: "Inquiries", href: "#inquiries" },
];

export default function Navigation({ className = "" }: { className?: string }) {
  const [activeHash, setActiveHash] = useState("#overture");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveHash(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn("hidden lg:flex items-center gap-1 el-glass rounded-full px-3 py-1.5", className)}>
      {NAV_LINKS.map((item) => {
        const isActive = activeHash === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-300",
              isActive
                ? "bg-accent/15 text-accent font-medium shadow-[0_0_12px_rgba(201,184,154,0.2)]"
                : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04]"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
