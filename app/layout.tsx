import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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
  title: "Elena Nuzman · Concert Pianist & Vocalist",
  description: "A Grand Piano. Four Octaves. Pure Gravity. The official bespoke digital experience for concert pianist and crossover artist Elena Nuzman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-ink text-ivory antialiased selection:bg-gold selection:text-ink">
        <FilmGrain staerke={0.045} />
        {children}
      </body>
    </html>
  );
}
