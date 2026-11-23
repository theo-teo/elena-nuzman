'use client';

/**
 * FilmGrain — die Kornschicht ueber allem.
 *
 * Aus Jons Konzept vom November 2025 (VISUAL_STYLE_GUIDE.md):
 * "Every page must have a fixed noise overlay. The site must NOT look like a
 *  flat digital screen. It must look like a projected film or a deep ocean void."
 *
 * Als SVG-Filter gerechnet, nicht als Bilddatei — nichts zu laden, keine
 * zweite Anfrage, und es skaliert auf jedem Bildschirm sauber.
 */

import { useEffect, useState } from 'react';

export interface FilmGrainProps {
  /** Staerke des Korns. 0.035 ist ruhig, 0.08 deutlich sichtbar. */
  staerke?: number;
  /** Korn wandert leicht — wie bei echtem Film. */
  bewegt?: boolean;
  className?: string;
}

export default function FilmGrain({
  staerke = 0.05,
  bewegt = true,
  className = '',
}: FilmGrainProps) {
  const [ruhig, setRuhig] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setRuhig(m.matches);
    const zu = (e: MediaQueryListEvent) => setRuhig(e.matches);
    m.addEventListener('change', zu);
    return () => m.removeEventListener('change', zu);
  }, []);

  const wandert = bewegt && !ruhig;

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[9999] ${
          wandert ? 'film-grain-bewegt' : ''
        } ${className}`}
        style={{
          opacity: staerke,
          mixBlendMode: 'overlay',
          // Der Filter erzeugt das Korn im Browser — keine Bilddatei noetig.
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='k'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23k)'/%3E%3C/svg%3E\")",
          // etwas groesser als der Bildschirm, damit die Wanderung keine Kante zeigt
          backgroundSize: '240px 240px',
          willChange: wandert ? 'transform' : 'auto',
        }}
      />
      <style jsx global>{`
        /* Acht Sprunge pro Zyklus — wie die Bildfolge eines Projektors.
           Weiche Bewegung wuerde nach Nebel aussehen, nicht nach Film. */
        @keyframes film-grain-versatz {
          0%   { transform: translate(0, 0); }
          12%  { transform: translate(-3%, -4%); }
          25%  { transform: translate(-6%, 2%); }
          37%  { transform: translate(2%, -5%); }
          50%  { transform: translate(-2%, 6%); }
          62%  { transform: translate(-6%, -2%); }
          75%  { transform: translate(4%, 3%); }
          87%  { transform: translate(-4%, -6%); }
          100% { transform: translate(0, 0); }
        }
        .film-grain-bewegt {
          /* Flaeche vergroessern, damit beim Versatz nie ein Rand auftaucht */
          inset: -12% !important;
          animation: film-grain-versatz 0.9s steps(1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .film-grain-bewegt {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
