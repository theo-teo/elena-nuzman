export interface ArtistFact {
  year: string;
  label: string;
  title: string;
  description: string;
}

export interface ArtistProfile {
  name: string;
  tagline: string;
  supportingMessage: string;
  academicDegree: string;
  institution: string;
  vocalRange: string;
  heritage: {
    birthYear: number;
    birthPlace: string;
    mother: string;
    father: string;
    prodigyAge: number;
    touringAge: number;
  };
  narrative: {
    overtureQuote: string;
    pianoQuote: string;
    crossoverStatement: string;
    finaleStatement: string;
  };
  milestones: ArtistFact[];
}

export const ARTIST: ArtistProfile = {
  name: "Elena Nuzman",
  tagline: "Between Silence & Sound",
  supportingMessage: "Some stories are written in words. Hers is written in music.",
  academicDegree: "Diplom-Konzertpianistin (Master of Music)",
  institution: "Robert Schumann Hochschule Düsseldorf",
  vocalRange: "E3 — E7 (Four Octaves)",
  heritage: {
    birthYear: 1981,
    birthPlace: "Moldova",
    mother: "Nina Kvasowa (Celebrated Concert Pianist)",
    father: "Josef Nuzman (Violinist & Actor)",
    prodigyAge: 2,
    touringAge: 17,
  },
  narrative: {
    overtureQuote: "A concert grand is not merely an instrument. It is an extension of bone, thought, and breath.",
    pianoQuote: "Where discipline becomes expression, twelve thousand mechanical parts dissolve into pure human vulnerability.",
    crossoverStatement: "SOME BOUNDARIES WERE NEVER MEANT TO BE HEARD.",
    finaleStatement: "THE MUSIC CONTINUES.",
  },
  milestones: [
    {
      year: "Age 2",
      label: "Genesis",
      title: "Play by Ear",
      description: "Born into an elite classical dynasty in Moldova. Replicating intricate piano melodies strictly by ear before learning notation.",
    },
    {
      year: "Age 7",
      label: "Lyceum",
      title: "Elite Prodigy Academy",
      description: "Admitted to the renowned state lyceum for musically gifted children. Formative classical grounding across Russian, French, and German schools.",
    },
    {
      year: "Age 17",
      label: "Stages",
      title: "International Concert Tours",
      description: "Performing on major concert stages across Russia, France, and the USA as a soloist before entering university conservatory.",
    },
    {
      year: "Master",
      label: "Conservatory",
      title: "Schumann Hochschule Düsseldorf",
      description: "Studying piano performance under Europe's leading pedagogues. Earning the highest state distinction as a Diplom-Konzertpianistin.",
    },
    {
      year: "Revelation",
      label: "Discovery",
      title: "The 4-Octave Vocal Register",
      description: "Discovering an extraordinary four-octave vocal range during her piano studies and winning a premier national competition in rock/pop.",
    },
    {
      year: "Global",
      label: "Triumph",
      title: "Broadway & Brandenburg Gate",
      description: "Headlining New Year's Eve at Berlin's Brandenburg Gate live before millions of television viewers and solo shows in Manhattan.",
    },
  ],
};
