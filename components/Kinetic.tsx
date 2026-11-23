"use client";

import { useEffect, useRef, type ElementType } from "react";

// Kinetische Schrift (Idee aus youth_elixir KinetischerText.tsx, ohne split-type und GSAP):
// jeder Buchstabe steigt einzeln aus der Tiefe, sobald die Zeile ins Bild kommt. Text bleibt fuer Screenreader ganz.
export default function Kinetic({ text, as: Tag = "span", className = "", step = 22 }: { text: string; as?: ElementType; className?: string; step?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } }, { rootMargin: "0px 0px -12% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  let k = 0;
  return (
    <Tag ref={ref} aria-label={text} className={`kin ${className}`}>
      {text.split(" ").map((w, wi) => (
        <span key={wi} aria-hidden className="kin-w">
          {w.split("").map((c, ci) => <span key={ci} className="kin-c" style={{ transitionDelay: `${(k++) * step}ms` }}>{c}</span>)}
          {" "}
        </span>
      ))}
    </Tag>
  );
}
