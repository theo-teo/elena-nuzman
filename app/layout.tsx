import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import FilmGrain from "@/components/FilmGrain";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elena-nuzman.vercel.app"),
  title: "Elena Nuzman · Between Silence & Sound",
  description:
    "Official cinematic experience for concert pianist and 4-octave crossover vocalist Elena Nuzman. Robert Schumann Hochschule Düsseldorf graduate. Between Silence & Sound.",
  keywords: [
    "Elena Nuzman",
    "Concert Pianist",
    "Pianistin",
    "Robert Schumann Hochschule Düsseldorf",
    "Liebesträume",
    "My Piano And I",
    "Four Octaves Vocalist",
    "Steinway Concert Grand",
  ],
  authors: [{ name: "Elena Nuzman" }],
  openGraph: {
    title: "Elena Nuzman · Between Silence & Sound",
    description:
      "A concert grand. Four octaves. Pure gravity. The official digital concert experience for virtuoso Elena Nuzman.",
    url: "https://elena-nuzman.vercel.app",
    siteName: "Elena Nuzman",
    images: [
      {
        url: "/images/real/elena-grand-1.jpg",
        width: 1200,
        height: 630,
        alt: "Elena Nuzman at the Steinway Concert Grand",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-background">
        <FilmGrain staerke={0.035} />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
