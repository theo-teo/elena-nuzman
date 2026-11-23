export type Lang = "en" | "de";

export interface HeroSlide {
  id: string;
  img: string;
  film: string;
  thumb: string;
  freq: number;
  title: Record<Lang, string>;
  location: Record<Lang, string>;
  tag: Record<Lang, string>;
  quote: Record<Lang, string>;
  year: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "grand",
    img: "/media/cinema-grand",
    film: "/media/cinema-grand",
    thumb: "/media/cinema-grand-m.webp",
    freq: 207.65, // Ab3 (Liszt Liebestraum No. 3)
    title: {
      en: "Steinway Concert Grand & Vocal Radiance",
      de: "Steinway Konzertflügel & Vier Oktaven",
    },
    location: {
      en: "Düsseldorf · Robert Schumann Hochschule",
      de: "Düsseldorf · Robert Schumann Hochschule",
    },
    tag: {
      en: "Master Concert Pianist",
      de: "Diplom-Konzertpianistin",
    },
    quote: {
      en: "«A concert grand is not merely an instrument. It is an extension of bone, thought, and breath.»",
      de: "«Ein Konzertflügel ist nicht bloss ein Instrument. Er ist die Verlängerung von Gedanken, Atem und Seele.»",
    },
    year: "Master Diplom",
  },
  {
    id: "vocal",
    img: "/media/cinema-vocal",
    film: "/media/cinema-vocal",
    thumb: "/media/cinema-vocal-m.webp",
    freq: 261.63, // C4
    title: {
      en: "The Four-Octave Metamorphosis",
      de: "Die Vier-Oktaven-Metamorphose",
    },
    location: {
      en: "Live Vocal & Solo Concert Grand",
      de: "Live-Gesang & Solo-Konzertflügel",
    },
    tag: {
      en: "E3 — E7 Vocal Register",
      de: "E3 — E7 Stimmumfang",
    },
    quote: {
      en: "«When classical piano virtuosity ignites with four full octaves of rock and operatic vocal power.»",
      de: "«Wenn klassische Klaviervirtuosität mit vier vollen Oktaven Stimmgewalt am offenen Flügel verschmilzt.»",
    },
    year: "4 Octaves",
  },
  {
    id: "keys",
    img: "/media/cinema-keys",
    film: "/media/cinema-keys",
    thumb: "/media/cinema-keys-m.webp",
    freq: 174.61, // F3
    title: {
      en: "88 Keys · Twelve Thousand Parts",
      de: "88 Tasten · Zwölftausend Teile",
    },
    location: {
      en: "IMPALA Silver Award · Liebesträume",
      de: "IMPALA Silver Award · Liebesträume",
    },
    tag: {
      en: "Franz Liszt Adaptation",
      de: "Franz Liszt Adaption",
    },
    quote: {
      en: "«Twelve thousand mechanical parts calibrated to dissolve into pure human vulnerability.»",
      de: "«Zwölftausend mechanische Teile, kalibriert, um in reine menschliche Emotion zu schmelzen.»",
    },
    year: "IMPALA Silver",
  },
  {
    id: "stage",
    img: "/media/cinema-stage",
    film: "/media/cinema-stage",
    thumb: "/media/cinema-stage-m.webp",
    freq: 293.66, // D4
    title: {
      en: "Live at the Brandenburg Gate",
      de: "Live am Brandenburger Tor",
    },
    location: {
      en: "Berlin NYE · 2 Million Live Audience",
      de: "Berlin Silvester · 2 Millionen Publikum",
    },
    tag: {
      en: "Symphonic Stadium Rock",
      de: "Symphonic Stadium Rock",
    },
    quote: {
      en: "«From intimate chamber recitals to two million spectators at Berlin’s Brandenburg Gate.»",
      de: "«Vom intimen Kammerkonzert bis vor zwei Millionen Menschen am Brandenburger Tor in Berlin.»",
    },
    year: "Berlin · NYC",
  },
];

export const SCROLL_BEATS = {
  en: {
    eyebrow: "01 / Scroll-Telling · Anatomy of Mastery",
    beats: [
      {
        num: "ACT I · 88 KEYS",
        l1: "TWELVE THOUSAND PARTS.",
        l2: "One unmistakable touch.",
        body: "Born in Moldova to concert pianist Nina Kvasowa and violin virtuoso Josef Nuzman. At age two, Elena replicated complex classical melodies strictly by ear. By seven, she entered the elite academy for gifted prodigies; by seventeen, she toured Russia, France, and the United States.",
        img: "/media/real-schloss-strings",
        caption: "Schloss Burg · Steinway Soundboard & Strings",
      },
      {
        num: "ACT II · SCHUMANN CONSERVATORY",
        l1: "CLASSICAL RIGOR.",
        l2: "Master Diploma in Düsseldorf.",
        body: "At the world-renowned Robert Schumann University of Music in Düsseldorf, Elena earned her Master Degree and State Diploma as a Concert Pianist (Diplom-Konzertpianistin). Every phrasing carries the architectural discipline of the Russian and German piano school.",
        img: "/media/real-schloss-grand",
        caption: "Robert Schumann Hochschule · Master Graduate",
      },
      {
        num: "ACT III · THE DUAL PHENOMENON",
        l1: "WHEN THE GRAND",
        l2: "begins to sing in four octaves.",
        body: "During her classical conservatory years, an unexpected vocal competition revealed a four-octave voice (E3 to E7). Won first prize immediately—becoming one of the few artists worldwide to perform classical piano virtuosity and rock-operatic vocals simultaneously live at the grand.",
        img: "/media/real-portrait-gold",
        caption: "Four-Octave Crossover Virtuoso",
      },
    ],
  },
  de: {
    eyebrow: "01 / Scroll-Telling · Anatomie der Meisterschaft",
    beats: [
      {
        num: "AKT I · 88 TASTEN",
        l1: "ZWÖLFTAUSEND TEILE.",
        l2: "Ein unverwechselbarer Anschlag.",
        body: "Geboren in Moldawien als Tochter der Konzertpianistin Nina Kvasowa und des Geigenvirtuosen Josef Nuzman. Mit zwei Jahren spielte Elena komplexe Melodien nach Gehör. Mit sieben wurde sie ans Elite-Lyzeum für Hochbegabte aufgenommen, mit siebzehn tourte sie durch Russland, Frankreich und die USA.",
        img: "/media/real-schloss-strings",
        caption: "Schloss Burg · Steinway-Resonanzboden & Saiten",
      },
      {
        num: "AKT II · ROBERT SCHUMANN HOCHSCHULE",
        l1: "KLASSISCHE STRENGE.",
        l2: "Meisterdiplom in Düsseldorf.",
        body: "An der weltberühmten Robert Schumann Hochschule Düsseldorf schloss Elena ihr Studium mit dem Staatsexamen und Meisterdiplom als Konzertpianistin ab. Jede Phrasierung trägt die architektonische Präzision der großen europäischen Klavierschule.",
        img: "/media/real-schloss-grand",
        caption: "Robert Schumann Hochschule · Diplom-Konzertpianistin",
      },
      {
        num: "AKT III · DAS DOPPEL-PHÄNOMEN",
        l1: "WENN DER FLÜGEL",
        l2: "in vier Oktaven zu singen beginnt.",
        body: "Während des Studiums offenbarte ein nationaler Gesangswettbewerb ihren außergewöhnlichen Vier-Oktaven-Stimmumfang (E3 bis E7). Sie gewann auf Anhieb den ersten Preis – und vereint seither meisterhafte Klaviervirtuosität und kraftvollen Live-Gesang gleichzeitig am Flügel.",
        img: "/media/real-portrait-gold",
        caption: "Vier Oktaven Crossover-Virtuosität",
      },
    ],
  },
};

export interface StageDoor {
  id: string;
  img: string;
  film?: string;
  freq: number;
  field: Record<Lang, string>;
  location: Record<Lang, string>;
  line: Record<Lang, string>;
  detail: Record<Lang, string>;
}

export const STAGE_DOORS: StageDoor[] = [
  {
    id: "dusseldorf",
    img: "/media/cinema-grand",
    film: "/media/cinema-grand",
    freq: 207.65,
    field: { en: "Düsseldorf · Master Diploma", de: "Düsseldorf · Meisterdiplom" },
    location: { en: "Robert Schumann Conservatory", de: "Robert Schumann Hochschule" },
    line: {
      en: "State Diploma Concert Pianist — Classical Perfection on 88 Keys.",
      de: "Diplom-Konzertpianistin — Klassische Vollendung auf 88 Tasten.",
    },
    detail: {
      en: "Trained from age seven at elite academies across Eastern Europe, France, and Germany, culminating in her Master Degree in Concert Piano in Düsseldorf.",
      de: "Ausgebildet ab dem siebten Lebensjahr an Spezialakademien für Hochbegabte bis zum Meisterdiplom für Konzertklavier in Düsseldorf.",
    },
  },
  {
    id: "brandenburg",
    img: "/media/cinema-stage",
    film: "/media/cinema-stage",
    freq: 293.66,
    field: { en: "Berlin · 2 Million Live", de: "Berlin · 2 Millionen Live" },
    location: { en: "Brandenburg Gate NYE", de: "Brandenburger Tor Silvester" },
    line: {
      en: "Headlining Berlin's Brandenburg Gate before two million spectators.",
      de: "Live vor zwei Millionen Besuchern am Brandenburger Tor in Berlin.",
    },
    detail: {
      en: "Her symphonic rock rendition of Whitesnake’s 'Here I Go Again' electrified Germany’s largest open-air broadcast at the Brandenburg Gate.",
      de: "Ihre symphonische Rock-Adaption von Whitesnakes «Here I Go Again» begeisterte zur Silvestergala ein Millionenpublikum am Brandenburger Tor.",
    },
  },
  {
    id: "impala",
    img: "/media/cinema-keys",
    film: "/media/cinema-keys",
    freq: 174.61,
    field: { en: "IMPALA Silver Award", de: "IMPALA Silver Award" },
    location: { en: "Franz Liszt · Liebesträume", de: "Franz Liszt · Liebesträume" },
    line: {
      en: "Over 5 million streams for her vocal adaptation of Franz Liszt.",
      de: "Über 5 Millionen Streams für ihre Vokal-Adaption von Franz Liszt.",
    },
    detail: {
      en: "Honored with the European IMPALA Silver Award for transforming Franz Liszt’s Liebestraum No. 3 into an international classical crossover phenomenon.",
      de: "Ausgezeichnet mit dem europäischen IMPALA Silver Award für ihre gefeierte Crossover-Neuinterpretation von Franz Liszts Liebestraum Nr. 3.",
    },
  },
  {
    id: "broadway",
    img: "/media/cinema-vocal",
    film: "/media/cinema-vocal",
    freq: 261.63,
    field: { en: "New York · Broadway", de: "New York · Broadway" },
    location: { en: "Manhattan & Löwenpalais", de: "Manhattan & Löwenpalais" },
    line: {
      en: "From Manhattan's Broadway stages to historic European salons.",
      de: "Vom New Yorker Broadway bis zum Berliner Löwenpalais.",
    },
    detail: {
      en: "Commanding standing ovations from New York's Broadway showcases to Berlin's Löwenpalais with simultaneous solo grand piano and four-octave vocal mastery.",
      de: "Standing Ovations von New Yorker Broadway-Showcases bis zum historischen Löwenpalais in Berlin – live am Konzertflügel.",
    },
  },
  {
    id: "abba",
    img: "/media/real-portrait-noir",
    freq: 220.0,
    field: { en: "ABBA Authorization & RTL Award", de: "ABBA-Autorisierung & RTL Award" },
    location: { en: "Stockholm · RTL Album of the Year", de: "Stockholm · RTL Album des Jahres" },
    line: {
      en: "Personally authorized by ABBA's Benny Andersson & Björn Ulvaeus.",
      de: "Persönlich autorisiert von den ABBA-Komponisten Andersson & Ulvaeus.",
    },
    detail: {
      en: "Granted rare personal permission by ABBA founders to release 'Nur die Sieger steh'n im Licht' (The Winner Takes It All), alongside winning RTL Album of the Year.",
      de: "Direkte Freigabe von Benny Andersson und Björn Ulvaeus für «Nur die Sieger steh'n im Licht» sowie ausgezeichnet mit dem RTL Album des Jahres.",
    },
  },
];

export interface OctaveNote {
  id: string;
  note: string;
  freq: number;
  energy: number;
  register: Record<Lang, string>;
  work: Record<Lang, string>;
  desc: Record<Lang, string>;
}

export const FOUR_OCTAVES: OctaveNote[] = [
  {
    id: "e3",
    note: "E3 · 164.8 Hz",
    freq: 164.81,
    energy: 0.55,
    register: { en: "Deep Chest Alto", de: "Tiefer Brustton (Alt)" },
    work: { en: "My Piano And I (Intimate Intro)", de: "My Piano And I (Intimes Intro)" },
    desc: {
      en: "Warm, velvety contralto resonance matching the bronze bass strings of the Steinway Model D.",
      de: "Warme, dunkle Alt-Resonanz im Einklang mit den kupferumsponnenen Basssaiten des Steinway D.",
    },
  },
  {
    id: "ab3",
    note: "A♭3 · 207.7 Hz",
    freq: 207.65,
    energy: 0.72,
    register: { en: "Lyric Mezzo-Soprano", de: "Lyrischer Mezzosopran" },
    work: { en: "Liebesträume (Franz Liszt No. 3)", de: "Liebesträume (Franz Liszt Nr. 3)" },
    desc: {
      en: "The signature key of Franz Liszt’s Liebestraum No. 3—where romantic nocturne phrasing turns into vocal poetry.",
      de: "Die Originaltonart As-Dur von Franz Liszts Liebestraum Nr. 3 – wo romantisches Nocturne in Gesangspoesie übergeht.",
    },
  },
  {
    id: "d4",
    note: "D4 — A5 · 587.3 Hz",
    freq: 293.66,
    energy: 0.88,
    register: { en: "Dramatic Rock Belting", de: "Dramatischer Rock-Belt" },
    work: { en: "Here I Go Again (Brandenburg Gate)", de: "Here I Go Again (Brandenburger Tor)" },
    desc: {
      en: "Unbridled stadium-rock projection cutting effortlessly across symphonic orchestration and open-air arenas.",
      de: "Ungebändigte Stadion-Rock-Kraft, die mühelos symphonische Orchester und Open-Air-Arenen überstrahlt.",
    },
  },
  {
    id: "e7",
    note: "C6 — E7 · 1046+ Hz",
    freq: 523.25,
    energy: 1.0,
    register: { en: "Operatic Soprano & Bell Register", de: "Opern-Sopran & Pfeifregister" },
    work: { en: "Liebesträume Climax & Cadenza", de: "Liebesträume Finale & Kadenz" },
    desc: {
      en: "Soaring crystalline high C and fourth-octave overtones vibrating in pure sympathy with the upper piano harp.",
      de: "Strahlende Sopran-Höhen bis in die vierte Oktave, die mit den höchsten Diskantsaiten des Flügels verschmelzen.",
    },
  },
];

export interface VideoReel {
  id: string;
  ytId: string;
  thumb: string;
  badge: string;
  duration: string;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
}

export const VIDEO_REELS: VideoReel[] = [
  {
    id: "loewenpalais",
    ytId: "YvgN-TUAfcY",
    thumb: "/media/cinema-grand",
    badge: "LIVE CONCERT · BERLIN",
    duration: "Live Performance",
    title: {
      en: "Concert at the Historic Löwenpalais",
      de: "Konzert im historischen Löwenpalais Berlin",
    },
    subtitle: {
      en: "Elena Nuzman live at the grand piano — solo piano & four-octave vocal showcase",
      de: "Elena Nuzman live am Konzertflügel — Solo-Piano & Vier-Oktaven-Gesang",
    },
  },
  {
    id: "showreel-2025",
    ytId: "yYAkLE3S3Dk",
    thumb: "/media/cinema-vocal",
    badge: "OFFICIAL SHOWREEL 2025",
    duration: "3:42",
    title: {
      en: "Elena Nuzman · Official Showreel 2025",
      de: "Elena Nuzman · Offizielles Showreel 2025",
    },
    subtitle: {
      en: "Highlights across classical concert halls, television broadcasts, and crossover stages",
      de: "Highlights aus klassischen Konzertsälen, TV-Galas und Crossover-Bühnen",
    },
  },
  {
    id: "liebestraum-video",
    ytId: "0MWWTors92o",
    thumb: "/media/cinema-keys",
    badge: "IMPALA SILVER AWARD",
    duration: "4:12",
    title: {
      en: "Liebesträume · Franz Liszt Crossover",
      de: "Liebesträume · Franz Liszt Crossover",
    },
    subtitle: {
      en: "Filmed at Stuttgart's historic Marmorsaal — over 5 million streams across Europe",
      de: "Gedreht im historischen Marmorsaal Stuttgart — über 5 Millionen Streams europaweit",
    },
  },
  {
    id: "brandenburger-tor-live",
    ytId: "U_nMQkL8XY0",
    thumb: "/media/cinema-stage",
    badge: "BERLIN NYE · MILLIONS LIVE",
    duration: "4:35",
    title: {
      en: "Live at the Brandenburg Gate Berlin",
      de: "Live am Brandenburger Tor Berlin",
    },
    subtitle: {
      en: "Open-air New Year's Eve performance before millions at the Brandenburg Gate",
      de: "Der legendäre Silvester-Auftritt vor Millionenpublikum in Berlin",
    },
  },
];

export interface Track {
  id: string;
  title: string;
  year: string;
  duration: string;
  fundamentalFreq: number;
  cover: string;
  ytId: string;
  subtitle: Record<Lang, string>;
  genre: Record<Lang, string>;
  accolade: Record<Lang, string>;
  description: Record<Lang, string>;
}

export const DISCOGRAPHY: Track[] = [
  {
    id: "my-piano-and-i",
    title: "My Piano And I",
    year: "2025",
    duration: "3:48",
    fundamentalFreq: 174.61,
    cover: "/media/album-my-piano-and-i",
    ytId: "YvgN-TUAfcY",
    subtitle: {
      en: "2025 Studio Album · Pure Acoustic Steinway Grand & Voice",
      de: "Studioalbum 2025 · Reiner Konzertflügel & Gesang",
    },
    genre: {
      en: "Intimate Grand & Vocal",
      de: "Konzertflügel & Stimme",
    },
    accolade: {
      en: "2025 Signature Studio Release",
      de: "Meisterwerk-Album 2025",
    },
    description: {
      en: "Her most intimate and mature statement to date: Elena returns to the pure relationship that started at age two—just her voice and the concert grand piano.",
      de: "Ihr persönlichstes und reifstes Werk: Elena kehrt zurück zum Ursprung ihrer Kunst – nur ihre Vier-Oktaven-Stimme und der reine Klang des Konzertflügels.",
    },
  },
  {
    id: "liebestraeume",
    title: "Liebesträume (Dreams of Love)",
    year: "2016 / 2021",
    duration: "4:12",
    fundamentalFreq: 207.65,
    cover: "/media/album-liebestraeume",
    ytId: "0MWWTors92o",
    subtitle: {
      en: "Franz Liszt No. 3 · Vocal & Symphonic Crossover",
      de: "Franz Liszt Nr. 3 · Vokal- & Orchester-Crossover",
    },
    genre: {
      en: "Romantic Classical Crossover",
      de: "Romantischer Klassik-Crossover",
    },
    accolade: {
      en: "IMPALA Silver Award · Over 5M Streams",
      de: "IMPALA Silver Award · Über 5 Mio. Streams",
    },
    description: {
      en: "Awarded the international IMPALA Silver Award. Elena transforms Franz Liszt’s iconic nocturne into an emotionally soaring four-octave vocal anthem.",
      de: "Ausgezeichnet mit dem internationalen IMPALA Silver Award. Elena verwandelt Franz Liszts berühmtes Nocturne in eine berührende Vier-Oktaven-Hymne.",
    },
  },
  {
    id: "i-go-ahead",
    title: "I Go Ahead",
    year: "2025",
    duration: "3:54",
    fundamentalFreq: 246.94,
    cover: "/media/album-i-go-ahead",
    ytId: "w_GrinOLy7o",
    subtitle: {
      en: "Contemporary Piano-Rock Anthem & Single",
      de: "Moderner Piano-Rock & Crossover-Single",
    },
    genre: {
      en: "Cinematic Piano Pop-Rock",
      de: "Cinematic Piano Pop-Rock",
    },
    accolade: {
      en: "2025 International English Single",
      de: "Internationale Single 2025",
    },
    description: {
      en: "Driving grand piano arpeggios meet fearless contemporary vocal power—an anthem of artistic sovereignty and relentless forward motion.",
      de: "Treibende Flügel-Arpeggien treffen auf kompromisslose Stimmgewalt – ein Statement künstlerischer Souveränität.",
    },
  },
  {
    id: "here-i-go-again",
    title: "Here I Go Again",
    year: "2020",
    duration: "4:35",
    fundamentalFreq: 293.66,
    cover: "/media/album-here-i-go-again",
    ytId: "U_nMQkL8XY0",
    subtitle: {
      en: "Brandenburg Gate Berlin NYE Mix · Whitesnake Adaptation",
      de: "Brandenburger Tor Silvester-Mix · Whitesnake-Adaption",
    },
    genre: {
      en: "Symphonic Stadium Rock",
      de: "Symphonischer Stadion-Rock",
    },
    accolade: {
      en: "Performed Before 2 Million in Berlin",
      de: "Live vor 2 Millionen Besuchern in Berlin",
    },
    description: {
      en: "Elena’s legendary classical-rock reinterpretation performed live at the Brandenburg Gate New Year's Eve celebration in Berlin.",
      de: "Elenas gefeierte Klassik-Rock-Neuinterpretation, live präsentiert zur großen Silvesterfeier am Brandenburger Tor.",
    },
  },
  {
    id: "i-believe-in-you",
    title: "I Believe In You",
    year: "Debut",
    duration: "3:56",
    fundamentalFreq: 261.63,
    cover: "/media/album-i-believe-in-you",
    ytId: "yYAkLE3S3Dk",
    subtitle: {
      en: "Breakthrough Debut Studio Album",
      de: "Das preisgekrönte Debütalbum",
    },
    genre: {
      en: "Classical Crossover Ballads",
      de: "Klassische Crossover-Balladen",
    },
    accolade: {
      en: "RTL Album of the Year · Top 10 Newcomer Charts",
      de: "RTL Album des Jahres · Top 10 Newcomer-Charts",
    },
    description: {
      en: "Entered the German Newcomer Charts at #8 and climbed to #6, earning Elena Nuzman the coveted 'Album of the Year' award from RTL.",
      de: "Stieg direkt in die Top 10 der deutschen Newcomer-Charts (Platz 6) ein und wurde von RTL zum «Album des Jahres» gekürt.",
    },
  },
  {
    id: "sieger-im-licht",
    title: "Nur die Sieger steh'n im Licht",
    year: "Special Edition",
    duration: "4:24",
    fundamentalFreq: 220.0,
    cover: "/media/album-sieger-im-licht",
    ytId: "lADjlvlHdz4",
    subtitle: {
      en: "The Winner Takes It All · Official German Piano Adaptation",
      de: "The Winner Takes It All · Offizielle deutsche Konzertflügel-Fassung",
    },
    genre: {
      en: "Dramatic Grand Chanson",
      de: "Dramatisches Konzert-Chanson",
    },
    accolade: {
      en: "Authorized by Benny Andersson & Björn Ulvaeus (ABBA)",
      de: "Autorisiert von Benny Andersson & Björn Ulvaeus (ABBA)",
    },
    description: {
      en: "Personally authorized by ABBA composers Benny Andersson and Björn Ulvaeus for Elena's dramatic German translation and solo grand piano arrangement.",
      de: "Persönlich freigegeben von den ABBA-Gründern Benny Andersson und Björn Ulvaeus für Elenas eigene deutsche Textfassung am Konzertflügel.",
    },
  },
];

export interface PressItem {
  id: string;
  publication: string;
  issue: string;
  cover: string;
  headline: Record<Lang, string>;
  quote: Record<Lang, string>;
  url: string;
}

export const PRESS_ARCHIVE: PressItem[] = [
  {
    id: "rollingstone",
    publication: "Rolling Stone USA",
    issue: "October 2026 · Digital Issue",
    cover: "/media/press-rollingstone",
    headline: {
      en: "Elena Nuzman: When Classical Music Finds Its Rock Soul",
      de: "Elena Nuzman: Wenn klassische Musik ihre Rock-Seele findet",
    },
    quote: {
      en: "«Nuzman brings the architecture of classical music into contemporary performance. The result is neither classical pretending to be rock nor rock pretending to have classical training—it is a force of its own.»",
      de: "«Nuzman bringt die Architektur der klassischen Musik in die Gegenwart. Klassische Disziplin gibt Struktur, Rock gibt Haltung – ein Ausnahmephänomen ohne Grenzen.»",
    },
    url: "https://www.elena-nuzman.com/en/press/rollingstoneusa-com-10-2026",
  },
  {
    id: "bazaar",
    publication: "Harper's Bazaar USA",
    issue: "October 2026 · Bazaar Icons",
    cover: "/media/press-bazaar",
    headline: {
      en: "Elena Nuzman: The Art of a Limitless Voice",
      de: "Elena Nuzman: Die Kunst einer grenzenlosen Stimme",
    },
    quote: {
      en: "«The young child who reproduced melodies by ear at age two is still present in the concert pianist. And the concert pianist remains present in every note of her four-octave voice.»",
      de: "«Das Wunderkind, das mit zwei Jahren Melodien nach Gehör spielte, lebt in der Konzertpianistin weiter – und die Konzertpianistin in jeder Note ihrer vier Oktaven.»",
    },
    url: "https://www.elena-nuzman.com/en/press/harpersbazaarus-co-10-2026",
  },
  {
    id: "vogue-miami",
    publication: "Vogue Miami",
    issue: "March 2026 · Cover Feature",
    cover: "/media/press-vogue-miami",
    headline: {
      en: "The Modern Maestro Redefining Music",
      de: "Die moderne Meisterin, die Musik neu definiert",
    },
    quote: {
      en: "«With a breathtaking four-octave vocal range and extraordinary technical command of the Steinway grand, Elena Nuzman is not simply blending genres—she is creating a new musical language.»",
      de: "«Mit atemberaubenden vier Oktaven Stimmumfang und technischer Meisterschaft am Flügel mischt Elena Nuzman nicht einfach Genres – sie erschafft eine eigene musikalische Sprache.»",
    },
    url: "https://www.elena-nuzman.com/en/press/voguemiami-com-03-2026",
  },
  {
    id: "vogue-athens",
    publication: "Vogue Athens",
    issue: "February 2026 · Culture Feature",
    cover: "/media/press-vogue-athens",
    headline: {
      en: "Where Great Voice Meets Brilliant Piano Mastery",
      de: "Wo große Stimme auf brillante Klavierkunst trifft",
    },
    quote: {
      en: "«What distinguishes Elena Nuzman from other crossover musicians is her complete artistic independence: she composes, sings, and performs at Concert Pianist diploma level simultaneously.»",
      de: "«Was Elena Nuzman von allen anderen abhebt, ist ihre völlige künstlerische Souveränität: Sie komponiert, singt und spielt gleichzeitig auf Konzertpianisten-Niveau.»",
    },
    url: "https://www.elena-nuzman.com/en/press/vogueathens-com-02-2026",
  },
  {
    id: "cosmopolitan",
    publication: "Cosmopolitan UK",
    issue: "September 2026 · Feature",
    cover: "/media/press-cosmopolitan",
    headline: {
      en: "Music Without Borders: From Piano to the Rock Stage",
      de: "Musik ohne Grenzen: Vom Konzertflügel auf die Rock-Bühne",
    },
    quote: {
      en: "«Whether she is performing a Franz Liszt masterpiece in a philharmonic hall or delivering a symphonic rock anthem before millions at the Brandenburg Gate, the emotional gravity is unmistakable.»",
      de: "«Ob sie ein Meisterwerk von Franz Liszt im Konzertsaal interpretiert oder vor Millionen am Brandenburger Tor steht – ihre emotionale Wucht ist unverkennbar.»",
    },
    url: "https://www.elena-nuzman.com/en/press/cosmopolitanuk-co-09-2026",
  },
];
