export default function Footer() {
  return (
    <footer className="border-t border-line bg-background py-16 px-6 md:px-14">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left: Artist Identification */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="font-serif text-lg tracking-[0.25em] text-foreground">
            ELENA <span className="italic text-accent font-normal">NUZMAN</span>
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-cinematic text-muted">
            Master Graduate Robert Schumann Hochschule Düsseldorf · All Rights Reserved
          </p>
        </div>

        {/* Center: Subtle Agency Signature */}
        <div className="text-center font-mono text-[9px] uppercase tracking-[0.3em] text-muted/40">
          We are telling stories, not building websites.
        </div>

        {/* Right: Navigation Action */}
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-muted">
          <a href="#overture" className="hover:text-accent transition">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
