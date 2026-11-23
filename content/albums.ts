export interface Album {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  genre: string;
  accolade: string;
  coverImage: string;
  fundamentalFreq: number; // Hz for Web Audio preview
  duration: string;
  streamingUrl?: string;
  description: string;
  tracks: {
    number: string;
    title: string;
    timing: string;
  }[];
}

export const ALBUMS: Album[] = [
  {
    id: "liebestraeume",
    title: "Liebesträume",
    subtitle: "Franz Liszt No. 3 · Vocal & Orchestral Crossover",
    year: "2016 / 2021",
    genre: "Romantic Classical Crossover",
    accolade: "IMPALA Silver Award · Over 5M Global Streams",
    coverImage: "/images/real/album-liebestraum.jpg",
    fundamentalFreq: 207.65, // Ab3
    duration: "4:12",
    streamingUrl: "https://open.spotify.com/artist/elena-nuzman",
    description:
      "Her international breakthrough masterwork. Elena adapts Franz Liszt's immortal Liebestraum No. 3 into a vocal tour-de-force, accompanying herself live on the Steinway grand.",
    tracks: [
      { number: "01", title: "Liebestraum No. 3 (Vocal Crossover)", timing: "4:12" },
      { number: "02", title: "Dream of Love (English Adaption)", timing: "4:15" },
      { number: "03", title: "Liebesträume (Instrumental Concert Grand)", timing: "4:28" },
    ],
  },
  {
    id: "my-piano-and-i",
    title: "My Piano And I",
    subtitle: "Pure Acoustic Grand Piano & Intimate Vocals",
    year: "2025 Release",
    genre: "Acoustic Solo Grand & Voice",
    accolade: "Featured Studio Album 2025",
    coverImage: "/images/real/album-my-piano-and-i.jpg",
    fundamentalFreq: 174.61, // F3
    duration: "3:48",
    streamingUrl: "https://open.spotify.com/artist/elena-nuzman",
    description:
      "Recorded in pure acoustic intimacy without synthesis, quantizing, or artificial layers. Just Elena, the concert grand, and a studio microphone in dialogue.",
    tracks: [
      { number: "01", title: "My Piano And I", timing: "3:48" },
      { number: "02", title: "I Go Ahead", timing: "3:52" },
      { number: "03", title: "Love Theme", timing: "4:05" },
    ],
  },
  {
    id: "here-i-go-again",
    title: "Here I Go Again",
    subtitle: "Symphonic Rock Live at the Brandenburg Gate",
    year: "Live Broadcast",
    genre: "Symphonic Stadium Rock",
    accolade: "Broadcast Live to Millions on National Television",
    coverImage: "/images/real/elena-brandenburger-tor.jpg",
    fundamentalFreq: 293.66, // D4
    duration: "4:35",
    streamingUrl: "https://open.spotify.com/artist/elena-nuzman",
    description:
      "Elena's legendary Whitesnake adaptation performed live before an audience of millions at Berlin's Brandenburg Gate on New Year's Eve.",
    tracks: [
      { number: "01", title: "Here I Go Again (Symphonic Arena Mix)", timing: "4:35" },
      { number: "02", title: "Brandenburg Gate Live Capture", timing: "4:50" },
    ],
  },
  {
    id: "i-believe-in-you",
    title: "I Believe In You",
    subtitle: "Debut Studio Album & Breakthrough Ballads",
    year: "Debut Release",
    genre: "Classical Crossover & Pop",
    accolade: "RTL Album of the Year · Top 10 German Newcomer Charts",
    coverImage: "/images/real/elena-press-portrait.jpg",
    fundamentalFreq: 261.63, // C4
    duration: "3:56",
    streamingUrl: "https://open.spotify.com/artist/elena-nuzman",
    description:
      "The album that launched Elena Nuzman onto the international radar. Awarded Album of the Year by RTL and rocketing directly into the Top 10 of Germany's newcomer charts.",
    tracks: [
      { number: "01", title: "I Believe In You", timing: "3:56" },
      { number: "02", title: "You've Lost That Lovin' Feelin'", timing: "4:10" },
      { number: "03", title: "Kannst du die Sonne sehn", timing: "3:45" },
    ],
  },
  {
    id: "sieger-im-licht",
    title: "Nur die Sieger steh'n im Licht",
    subtitle: "The Winner Takes It All · Official German Adaption",
    year: "Special Release",
    genre: "Dramatic Chamber Grand",
    accolade: "Personally Authorized by Benny Andersson & Björn Ulvaeus (ABBA)",
    coverImage: "/images/real/elena-stage-live.jpg",
    fundamentalFreq: 220.0, // A3
    duration: "4:24",
    streamingUrl: "https://open.spotify.com/artist/elena-nuzman",
    description:
      "A monumental and rare honor: the legendary ABBA founders granted their direct personal clearance for Elena Nuzman's German translation and grand piano interpretation.",
    tracks: [
      { number: "01", title: "Nur die Sieger steh'n im Licht", timing: "4:24" },
      { number: "02", title: "Chamber Grand Solo Version", timing: "4:18" },
    ],
  },
];
