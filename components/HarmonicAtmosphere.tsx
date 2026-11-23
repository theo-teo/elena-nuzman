"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: [number, number, number];
  pulsingSpeed: number;
  phase: number;
}

export default function HarmonicAtmosphere({
  soundActive = false,
  className = "",
}: {
  soundActive?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const soundRef = useRef(soundActive);
  soundRef.current = soundActive;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };

    // Warm radiant luxury palette: Amber Gold, Champagne, Rose Gold, Warm White
    const PALETTE: [number, number, number][] = [
      [212, 175, 55], // Gold
      [245, 230, 211], // Warm Ivory
      [232, 137, 58], // Amber glow
      [255, 215, 120], // Radiant Champagne
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 14000), 120);
      particles = Array.from({ length: count }, () => {
        const col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const baseAlpha = Math.random() * 0.45 + 0.15;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -(Math.random() * 0.5 + 0.15), // drifting upwards like concert hall dust
          size: Math.random() * 2.2 + 0.8,
          alpha: baseAlpha,
          baseAlpha,
          color: col,
          pulsingSpeed: Math.random() * 0.025 + 0.01,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const loop = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const energyBoost = soundRef.current ? 1.8 : 1.0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic upward drift
        p.x += p.vx + Math.sin(time * 0.001 + p.phase) * 0.25;
        p.y += p.vy * energyBoost;

        // Wrap around edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse acoustic repel / flare
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const maxDist = 180;
        if (distSq < maxDist * maxDist && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / maxDist) * 1.5;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
          p.alpha = Math.min(0.9, p.alpha + force * 0.4);
        }

        // Shimmering breathing glow
        p.alpha =
          p.baseAlpha *
          (0.7 + 0.3 * Math.sin(time * p.pulsingSpeed + p.phase)) *
          (soundRef.current ? 1.4 : 1.0);

        const [r, g, b] = p.color;

        // Render soft glowing particle
        ctx.beginPath();
        const rad = p.size * (soundRef.current ? 1.3 : 1.0);
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(p.alpha, 0.95)})`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
        ctx.shadowBlur = soundRef.current ? 12 : 6;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    initParticles();
    raf = requestAnimationFrame(loop);

    window.addEventListener("resize", initParticles);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", initParticles);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
