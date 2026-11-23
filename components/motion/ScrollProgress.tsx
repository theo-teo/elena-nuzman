"use client";

import { useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        gsap.to(el, {
          scaleX: self.progress,
          duration: 0.1,
          ease: "none",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-accent shadow-[0_0_8px_rgba(201,184,154,0.6)]"
      />
    </div>
  );
}
