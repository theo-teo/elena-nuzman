"use client";

import { useEffect, useRef, type ElementType } from "react";
import { registerGSAP } from "@/lib/gsap";

export default function TextReveal({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { gsap } = registerGSAP();
    const words = el.querySelectorAll(".tr-word");

    gsap.fromTo(
      words,
      {
        y: "115%",
        opacity: 0,
        rotateX: -30,
      },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.04,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay]);

  const words = text.split(" ");

  return (
    <Tag ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.26em] last:mr-0">
          <span className="tr-word inline-block will-change-transform">{w}</span>
        </span>
      ))}
    </Tag>
  );
}
