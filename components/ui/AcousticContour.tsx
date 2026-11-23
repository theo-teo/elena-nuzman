"use client";

interface AcousticContourProps {
  className?: string;
  dashed?: boolean;
}

export default function AcousticContour({
  className = "",
  dashed = true,
}: AcousticContourProps) {
  return (
    <div className={`w-full overflow-hidden pointer-events-none py-4 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 md:h-16 stroke-accent/40"
        preserveAspectRatio="none"
      >
        <path
          d="M0 45 C120 45, 180 20, 260 20 C340 20, 390 65, 480 65 C560 65, 620 35, 720 35 C820 35, 870 58, 960 58 C1060 58, 1120 25, 1220 25 C1320 25, 1380 45, 1440 45"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray={dashed ? "3 3" : undefined}
          className="opacity-70"
        />
        <path
          d="M0 45 C120 45, 180 20, 260 20 C340 20, 390 65, 480 65"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-90"
        />
      </svg>
    </div>
  );
}
