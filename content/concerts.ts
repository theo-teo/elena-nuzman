export interface Concert {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  program: string;
  ticketStatus: "Sold Out" | "Available" | "Private Event" | "Broadcast";
  ticketUrl?: string;
}

export const PAST_HIGHLIGHTS: Concert[] = [
  {
    id: "brandenburg-gate",
    date: "Silvester Celebration",
    venue: "Brandenburger Tor Live Stage",
    city: "Berlin",
    country: "Germany",
    program: "Here I Go Again (Symphonic Rock) & Solo Grand",
    ticketStatus: "Broadcast",
  },
  {
    id: "broadway-nyc",
    date: "Solo Showcase Series",
    venue: "Broadway Theater District",
    city: "New York City",
    country: "USA",
    program: "Liebesträume & Crossover Repertoire",
    ticketStatus: "Sold Out",
  },
  {
    id: "loewenpalais-berlin",
    date: "Grand Salon Gala",
    venue: "Konzertsaal Löwenpalais",
    city: "Berlin",
    country: "Germany",
    program: "My Piano And I Album Premiere",
    ticketStatus: "Private Event",
  },
];

// Data-driven upcoming concert seasons: currently booking for 2026/2027 season
export const UPCOMING_CONCERTS: Concert[] = [];
