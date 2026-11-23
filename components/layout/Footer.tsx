export default function Footer() {
  return (
    <footer className="border-t border-line/40 bg-background py-16 px-5 md:px-12">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left: Artist Identification */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="font-serif text-base sm:text-lg tracking-[0.25em] text-foreground">
            ELENA <span className="font-script text-accent text-xl font-normal lowercase tracking-normal">between</span> NUZMAN
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-cinematic text-muted">
            Master Graduate Robert Schumann Hochschule Düsseldorf · Between Silence &amp; Sound
          </p>
        </div>

        {/* Center: Curated Artistic Colophon */}
        <div className="text-center font-mono text-[9px] uppercase tracking-[0.25em] text-muted/50">
          The Symphony of Silence &amp; Sound · Unseen Digital Artistry
        </div>

        {/* Right: Navigation Action */}
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-muted">
          <a href="#overture" className="hover:text-accent transition">
            Back to Movement I ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
