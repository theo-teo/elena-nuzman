# Elena Nuzman · The Concert Experience
> A Concert Grand. Four Octaves. Pure Gravity.

Massgeschneiderte, filmische Scroll-Telling-Inszenierung für die internationale Diplom-Konzertpianistin, Komponistin und Vier-Oktaven-Crossover-Sängerin **Elena Nuzman**.

Entworfen und realisiert nach dem **Private Studio / Hidden Story** Codex.

---

## 1. Architektur & Scroll-Telling-Mechanismen (6 Akte)

1. **Prolog · `EmotionHero` (`components/EmotionHero.tsx`):**
   * Vier geschichtete 100svh-Kinoszenen mit echten Identitäts-Stills (`fal-ai/flux-pro/kontext` aus Elenas Originalporträts) und bedarfsgesteuerten 5-Sekunden-Kino-Kurzvideos (`fal-ai/kling-video/v2.5-turbo/pro/image-to-video`).
   * Responsive `<picture>`-Kette (`-m.webp` ab 11 KB für Mobilgeräte, `.webp` für Desktop) sowie separate Mobile- (`-m.mp4` ab 144 KB) und Desktop-Kurzfilme (`.mp4`).
   * Zweisprachige Echtzeit-Umschaltung (`DE` / `EN`), Liszt-Akkord-Synthesizer (Web Audio API), runde Vorschaubilder und schwebender Anfrage-Knopf (`.eh-ask`).
2. **Akt I · `Kinetic` Manifest (`components/Kinetic.tsx`):**
   * Buchstabe für Buchstabe aufsteigende 3D-Typografie (`rotateX(-55deg)`) mit IntersectionObserver und `prefers-reduced-motion`-Respektierung.
3. **Akt II · `ScrollStage` (`components/ScrollStage.tsx`):**
   * Gepinnte `320vh`-Bühne mit einzelbildgenauem Scroll-Scrubbing (`-g 1` Keyframe-Kodierung von `cinema-keys.mp4` + iOS-Touch-Freigabe) über drei biografische Kapitel und echte Archivaufnahmen aus Schloss Burg.
4. **Akt III · `StageDoors` (`components/StageDoors.tsx`):**
   * Fünf interaktive Bühnentore nebeneinander (`flex-grow: 6.5` in 1200 ms `cubic-bezier`, goldener Lichtstoss `.wl-flash` und laufender Kurzfilm im aktiven Tor; auf Mobilgeräten vertikal gestapelt mit `IntersectionObserver`-Autoplay).
5. **Akt IV · `VoiceLab` (`components/VoiceLab.tsx` & `components/VoiceWave.tsx`):**
   * Interaktives Vier-Oktaven-Frequenzlabor (`E3 · 164.8 Hz` bis `E7 · 1046+ Hz`) gekoppelt an die 60fps-Canvas-Stimmkurve und mehrstimmige Steinway-Obertöne.
   * Vier echte Live-Konzert- und Musikfilme (*Konzert Löwenpalais Berlin*, *Showreel 2025*, *Liebesträume Official*, *Live am Brandenburger Tor*) mit Konzertsaal-Lightbox-Modal.
6. **Akt V & VI · Diskographie, `PressArchive` (`components/PressArchive.tsx`) & `/api/inquiry`:**
   * Sechs verifizierte Alben & Singles (*My Piano And I* 2025, *Liebesträume* IMPALA Silver, *I Go Ahead* 2025, *Here I Go Again*, *I Believe In You* RTL Album des Jahres, *Nur die Sieger steh'n im Licht* ABBA-autorisiert).
   * Fünf echte internationale Magazin-Cover (**Rolling Stone USA**, **Harper's Bazaar USA**, **Vogue Miami**, **Vogue Athens**, **Cosmopolitan UK**) mit mausfolgendem Radiallicht (`--x`, `--y` auf `.ag-card`) und Cover-Reader-Modal.
   * Diskreter VIP-Buchungs-Concierge (`/api/inquiry`) mit Honeypot-Schutz und Dossier-Referenznummer.

---

## 2. Start & Medien-Pipeline

```bash
# Entwicklungsserver auf Port 3031 starten (http://localhost:3031)
npm run dev

# Produktions-Build prüfen (First Load JS ~115 kB)
npm run build

# Medien-Pipeline (Echte Fotos/Cover -> WebP, Flux Kontext Stills, Kling 2.5 Kurzvideos)
node scripts/master_media_pipeline.mjs real
node scripts/master_media_pipeline.mjs stills
node scripts/master_media_pipeline.mjs videos
```
