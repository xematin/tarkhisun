import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface UploadProgressBarProps {
  pct: number; // 0-100
  active: boolean; // request in flight
  className?: string;
}

/**
 * Minimal glassmorphism progress bar for file upload state.
 * Shown as a thin overlay/bar on file thumbnails.
 */
const UploadProgressBar = ({ pct, active, className }: UploadProgressBarProps) => {
  const done = pct >= 100;
  if (!active && !done) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-1 bottom-1 flex items-center gap-1.5 px-1.5 py-1 rounded-full",
        "bg-white/45 dark:bg-white/10 backdrop-blur-md",
        "border border-white/60 dark:border-white/15",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_-2px_rgba(0,0,0,0.15)]",
        className
      )}
      dir="ltr"
    >
      <div className="relative flex-1 h-1 rounded-full overflow-hidden bg-white/40 dark:bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/80 to-primary transition-[width] duration-200 ease-out"
          style={{ width: `${Math.max(4, pct)}%` }}
        />
      </div>
      {done ? (
        <Check className="w-3 h-3 text-emerald-600 shrink-0" strokeWidth={3} />
      ) : (
        <span className="text-[9px] font-bold tabular-nums text-foreground/80 shrink-0 leading-none">
          {pct}%
        </span>
      )}
    </div>
  );
};

export default UploadProgressBar;
