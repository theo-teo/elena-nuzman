"use client";

interface ChapterCardProps {
  chapter: string;
  italicPrefix?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function ChapterCard({
  chapter,
  italicPrefix = "The",
  title,
  subtitle,
  align = "left",
  className = "",
}: ChapterCardProps) {
  const isCenter = align === "center";

  return (
    <div className={`space-y-2 ${isCenter ? "text-center mx-auto" : "text-left"} ${className}`}>
      {/* Chapter Number Badge */}
      <div className={`flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-cinematic text-accent ${isCenter ? "justify-center" : ""}`}>
        <span>{chapter}</span>
        <span className="h-px w-6 bg-accent/40" />
      </div>

      {/* Signature Typography Lockup: Italic Script + Monumental Serif */}
      <div className="relative pt-1">
        {italicPrefix && (
          <span className="font-script text-3xl sm:text-4xl md:text-5xl text-accent/90 block leading-none select-none">
            {italicPrefix}
          </span>
        )}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight text-foreground leading-[0.98]">
          {title}
        </h2>
      </div>

      {subtitle && (
        <p className="font-sans text-xs sm:text-sm font-light text-muted tracking-wide max-w-xl pt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
