# ASSET MANIFEST — ELENA NUZMAN

Dieses Manifest dokumentiert alle verwendeten Bild-, Ton- und Medienressourcen im Projekt `elena-nuzman`.

---

## 1. Echte Fotografien (Quelle: elena-nuzman.com)
Alle Bilddaten wurden direkt aus dem verifizierten Künstlerarchiv bezogen und in `/public/images/real/` bereitgestellt:

| Dateiname | Auflösung / Grösse | Motiv / Verwendungszweck |
|---|---|---|
| `elena-grand-1.jpg` | 1.3 MB (High-Res) | Chapter 01 Hero & Chapter 03 Pinned Stage I (Konzertflügel Frontalperspektive) |
| `elena-grand-2.jpg` | 1.5 MB (High-Res) | Chapter 03 Pinned Stage II (88 Tasten, Reflexion im Flügeldeckel) |
| `elena-grand-3.jpg` | 1.0 MB (High-Res) | Chapter 03 Pinned Stage III (Klavierhände, Virtuosität im Detail) |
| `elena-grand-4.jpg` | 1.4 MB (High-Res) | Chapter 03 Pinned Stage IV (Künstlerisches Vollporträt am Flügel) |
| `elena-grand-5.jpg` | 1.1 MB (High-Res) | Chapter 07 Finale (The Music Continues, Epilog) |
| `elena-portrait-schloss.jpg` | 1.1 MB (High-Res) | Chapter 02 The First Note (Porträt Schloss Burg) |
| `elena-impala-award.jpg` | 74 KB | Chapter 04 Breaking The Score (Elena mit IMPALA Silver Award) |
| `elena-brandenburger-tor.jpg` | 92 KB | Chapter 06 The Stage (Silvester-Live-Konzert am Brandenburger Tor vor Millionen Zuschauern) |
| `album-my-piano-and-i.jpg` | 98 KB | Chapter 05 The Music (Original-Cover Studioalbum 2025) |
| `album-liebestraum.jpg` | 27 KB | Chapter 05 The Music (Original-Cover Crossover-Erfolg Liszt Liebestraum) |
| `elena-stage-live.jpg` | 64 KB | Chapter 06 The Stage (Live-Impression) |
| `elena-press-portrait.jpg` | 60 KB | Presse- und Metadaten (OG-Image) |

---

## 2. Akustische Resonanz (Web Audio API Synthese)
Um Ladezeiten minimal zu halten und keine urheberrechtlichen Konflikte bei automatischer Wiedergabe zu erzeugen:
- **Konzert-Kammerton A4:** Umschaltbar zwischen `432.0 Hz` (Verdi-Stimmung) und `440.0 Hz` (Standard-Konzertsaal).
- **Harmonische Obertöne:** Steinway-Kammerton-Akkord (A4, E5, C#6) mit natürlicher Dämpfungskurve (Exponential Decay).
- **Nutzersteuerung:** Nur auf explizite Benutzerinteraktion (Toggle im Header und in Chapter 05).
