# IMPLEMENTATION ARCHITECTURE — ELENA NUZMAN

## 1. Technischer Stack
- **Framework:** Next.js 14.2.35 (App Router, React 18, Strict TypeScript 5.5)
- **Styling:** Tailwind CSS mit massgeschneiderten Konzertsaal-Tokens
- **Animation Engine:** GSAP 3.15.1 mit `@gsap/react` und `ScrollTrigger`
- **Smooth Scroll:** `@studio-freight/lenis` (v1.3.27), synchronisiert im GSAP RequestAnimationFrame-Ticker
- **Icons:** `lucide-react` (Lightweight Stroke Icons)
- **Audio:** Web Audio API (Konzert-Kammerton-Generator 432 Hz / 440 Hz)

---

## 2. Komponentenstruktur
```
app/
├── globals.css                # Konzertsaal-Farbvariablen, Lenis-Klassen, Utility-Styles
├── layout.tsx                 # Root-Layout, Cormorant Garamond & Inter, FilmGrain, Lenis Provider
├── page.tsx                   # Master-Scrollytelling Page (Kapitel 1 bis 7)
├── robots.ts                  # Diskrete Suchmaschinen-Konfiguration
└── sitemap.ts                 # XML-Sitemap mit ISO-Metadaten
components/
├── layout/
│   ├── Header.tsx             # Fixierte minimale Navigation mit Live-Audio-Schalter
│   ├── Navigation.tsx         # Vollbild-Drawer für Mobile & Desktop
│   └── Footer.tsx             # Diskretes Footer-Colophon
├── motion/
│   ├── SmoothScrollProvider.tsx # Lenis + GSAP ScrollTrigger Integration
│   ├── ScrollProgress.tsx     # Goldene Lesefortschrittslinie
│   └── TextReveal.tsx         # Scrollgetriebene Typografie-Animation
├── sections/
│   ├── HeroSection.tsx        # Chapter 01: The Overture
│   ├── BiographySection.tsx   # Chapter 02: The First Note
│   ├── PianoStorySection.tsx  # Chapter 03: The Art of Piano (Pinned Timeline)
│   ├── CrossoverSection.tsx   # Chapter 04: Breaking the Score (4-Oktaven-Kompass)
│   ├── MusicSection.tsx       # Chapter 05: The Music (Verifizierte Diskografie)
│   ├── StageSection.tsx       # Chapter 06: The Stage (Brandenburger Tor, Tourplan)
│   └── FinaleSection.tsx      # Chapter 07: The Finale & Buchungsanfrage
└── ui/
    ├── SectionLabel.tsx       # Standardisiertes Kapitel-Label mit Ziffer
    ├── AnimatedHeading.tsx    # Sanft einblendende Überschriften
    └── MagneticButton.tsx     # Subtiler haptischer Button
content/
├── artist.ts                  # Verifizierte biografische Daten & Zitate
├── albums.ts                  # Offizielle Diskografie mit Album-Artworks
└── concerts.ts                # Auftrittsarchiv & Buchungslogik
lib/
├── gsap.ts                    # SSR-sichere Registrierung von ScrollTrigger
└── utils.ts                   # cn-Utility und Audio-Frequenz-Helfer
```

---

## 3. Scrollytelling-Mechanismus in Chapter 03
`PianoStorySection.tsx` implementiert einen 4-Phasen-Scrub via GSAP ScrollTrigger:
- **Pinning:** Die Sektion wird für `300%` der Viewport-Höhe fixiert.
- **Timeline:** Die 4 Phasen wechseln simultan Bild-Opazität, Scale (Kamerabewegung 1.0 -> 1.08 -> 1.0) und Text-Positionen via `timeline.to(..., { scrub: 1 })`.
- **Cleanup:** `ScrollTrigger.getAll().forEach(t => t.kill())` beim Verlassen der Komponente, um Memory Leaks zu verhindern.
- **Barrierefreiheit:** Bei aktiviertem `prefers-reduced-motion` wird das Pinning deaktiviert und die Phasen werden als ruhige, sequenzielle Galerie dargestellt.
