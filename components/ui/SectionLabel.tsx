import { cn } from "@/lib/utils";

export default function SectionLabel({
  chapter,
  title,
  className = "",
}: {
  chapter: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-cinematic text-accent", className)}>
      <span className="h-px w-6 bg-accent/60" />
      <span>{chapter}</span>
      <span className="text-foreground/40">/</span>
      <span className="text-foreground/70">{title}</span>
    </div>
  );
}
