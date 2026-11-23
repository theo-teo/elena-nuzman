"use client";
import { useEffect, useRef } from "react";
import { getAnalyser, getSource } from "@/lib/audio";

// Stimmkurve im Geist von KITT: drei Säulen aus Lichtbalken, die Mitte am höchsten,
// darüber eine Herzschlag-Linie. Glut für Nazar, Türkis für den Menschen am Mikrofon.
export default function VoiceWave({
  fallback = 0,
  height = 72,
  active,
}: {
  fallback?: number;
  height?: number;
  active?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const fb = useRef(fallback);
  fb.current = fallback;

  useEffect(() => {
    const c = ref.current!;
    const g = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let raf = 0;
    const freq = new Uint8Array(512);
    const wave = new Uint8Array(1024);
    const smooth = new Float32Array(15);

    const draw = (now: number) => {
      const W = c.clientWidth, H = c.clientHeight;
      if (c.width !== W * dpr) { c.width = W * dpr; c.height = H * dpr; }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      const an = getAnalyser();
      const src = getSource();
      const live = !!an && !!src;
      const mic = src === "mic";
      const [r, gr, b] = mic ? [245, 230, 211] : [212, 175, 55]; // Ivory / Gold

      // Bänder: tiefe, mittlere, hohe Frequenzen je Säule
      const bands = new Float32Array(15);
      if (live) {
        an!.getByteFrequencyData(freq);
        for (let i = 0; i < 15; i++) {
          const lo = Math.floor(Math.pow(i / 15, 1.6) * 180) + 2;
          const hi = Math.floor(Math.pow((i + 1) / 15, 1.6) * 180) + 3;
          let s = 0;
          for (let k = lo; k < hi; k++) s += freq[k];
          bands[i] = s / (hi - lo) / 255;
        }
      } else {
        const e = fb.current;
        for (let i = 0; i < 15; i++) bands[i] = e * (0.35 + 0.65 * Math.abs(Math.sin(now / (90 + i * 13) + i)));
      }
      for (let i = 0; i < 15; i++) smooth[i] += (bands[i] - smooth[i]) * 0.35;

      // Drei Säulen, Mitte am höchsten
      const cols = [0.7, 1, 0.7];
      const colW = Math.min(18, W * 0.05);
      const gap = colW * 0.9;
      const total = colW * 3 + gap * 2;
      const seg = 7;
      const segH = (H * 0.86) / (seg * 2 - 1);
      for (let col = 0; col < 3; col++) {
        const e = (smooth[col * 5] + smooth[col * 5 + 1] + smooth[col * 5 + 2] + smooth[col * 5 + 3] + smooth[col * 5 + 4]) / 5;
        const lit = Math.round(Math.min(1, e * 1.8) * cols[col] * seg);
        const x = W / 2 - total / 2 + col * (colW + gap);
        for (let s = -seg + 1; s < seg; s++) {
          const on = Math.abs(s) < lit;
          const y = H / 2 + s * segH - segH * 0.35;
          g.fillStyle = on ? `rgba(${r},${gr},${b},${0.95 - Math.abs(s) * 0.08})` : `rgba(${r},${gr},${b},0.07)`;
          if (on) { g.shadowColor = `rgba(${r},${gr},${b},0.8)`; g.shadowBlur = 10; } else g.shadowBlur = 0;
          g.fillRect(x, y, colW, segH * 0.7);
        }
      }
      g.shadowBlur = 0;

      // Herzschlag-Linie links und rechts der Säulen
      g.lineWidth = 1.2;
      g.strokeStyle = `rgba(${r},${gr},${b},0.7)`;
      g.shadowColor = `rgba(${r},${gr},${b},0.6)`;
      g.shadowBlur = 6;
      for (const side of [-1, 1]) {
        g.beginPath();
        const x0 = W / 2 + side * (total / 2 + 14);
        const x1 = side < 0 ? 8 : W - 8;
        const n = 120;
        if (live) an!.getByteTimeDomainData(wave);
        for (let i = 0; i <= n; i++) {
          const t = i / n;
          const x = x0 + (x1 - x0) * t;
          let v: number;
          if (live) v = (wave[Math.floor(t * 900)] - 128) / 128;
          else v = fb.current * Math.sin(t * 40 + now / 80) * Math.exp(-Math.pow((t - 0.5) * 3, 2));
          const y = H / 2 + v * H * 0.45 * (1 - t * 0.6);
          if (i === 0) g.moveTo(x, y);
          else g.lineTo(x, y);
        }
        g.stroke();
      }
      g.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} style={{ height }} className="block w-full" aria-hidden="true" />;
}
