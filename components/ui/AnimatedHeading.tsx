import { cn } from "@/lib/utils";

export default function AnimatedHeading({
  primary,
  secondary,
  tertiary,
  className = "",
}: {
  primary: string;
  secondary?: string;
  tertiary?: string;
  className?: string;
}) {
  return (
    <h2 className={cn("font-serif text-3xl font-light leading-[0.98] sm:text-5xl md:text-6xl lg:text-7xl text-foreground", className)}>
      <span className="block">{primary}</span>
      {secondary && (
        <span className="block italic text-accent font-normal tracking-[-0.01em]">
          {secondary}
        </span>
      )}
      {tertiary && <span className="block uppercase tracking-tight">{tertiary}</span>}
    </h2>
  );
}
