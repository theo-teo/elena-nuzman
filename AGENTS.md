# AGENTS.md · Elena Nuzman — Between Silence & Sound

Dieses Dokument definiert die verbindlichen Arbeitsregeln für alle KI-Agenten im Projekt `elena-nuzman`.

---

## 1. Leitbild & Ästhetik
- **Konzertante Exzellenz:** «Between Silence & Sound». Das digitale Äquivalent eines Steinway-Flügels im abgedunkelten Konzertsaal.
- **Künstlerische Authentizität:** Keine erfundenen Konzerte, Zahlen, Preise oder Auszeichnungen. Alle biografischen Fakten (Robert Schumann Hochschule, IMPALA Silver Award, RTL Album des Jahres, 4-Oktaven-Stimme) sind verbürgt.
- **Ton & Sprache:** Höchste Diskretion, Schweizer Hochdeutsch («ss» statt «ß», formelle Anrede) oder britisches/internationales Englisch. Ruhig, präzise, keine Ausrufezeichen, keine billigen SaaS-Versprechungen.

---

## 2. Architektonische Isolation
- **Strikte Trennung:** Alle Entwicklungen für Elena Nuzman verbleiben ausschliesslich in `/Users/jonkay/Projects/elena-nuzman`.
- **Keine Beeinträchtigung anderer Repositories:** Das Repository `private-studio` darf unter keinen Umständen berührt, verändert oder mit Assets von Elena Nuzman vermischt werden.
- **Eigenständige Identität:** Kein Kopieren von Agentur-Templates, generischen Karten oder schwebenden 3D-Partikeln. Die visuelle DNA ist eigens für Konzertpianistik und Gesang komponiert.

---

## 3. Technische Standards
- **Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, GSAP 3 (ScrollTrigger), Lenis Smooth Scroll.
- **Design Tokens:**
  - Background: `#09090b` (Deep Concert Black)
  - Surface: `#151416` (Steinway Lacquer)
  - Foreground: `#f3efe6` (Warm Ivory)
  - Muted: `#a8a5a1` (Tuned Platinum)
  - Accent: `#c9b89a` (Brushed Champagne Gold)
  - Burgundy: `#431e2c` (Acoustic Resonance)
- **Performance & Barrierefreiheit:**
  - 0 TypeScript- und Konsolenfehler.
  - Vollständige Responsivität auf 1440 px, 1024 px, 768 px und 390 px.
  - `prefers-reduced-motion`: Alle Animationen müssen ohne Scrubbing und ruckelfrei lesbar bleiben.
- **Audio:** Kein Autoplay ohne Nutzerinteraktion. Authentische harmonische Synthese (A4 = 432 Hz / 440 Hz Konzertstimmung) via Web Audio API.
