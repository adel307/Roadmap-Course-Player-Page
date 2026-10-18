import { Layers3, Sparkles } from "lucide-react";

type NextChapterCardProps = {
  variant?: "mobile" | "desktop";
};

export function NextChapterCard({ variant = "desktop" }: NextChapterCardProps) {
  if (variant === "mobile") {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 shadow-card">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-pale text-brand-dark">
          <Layers3 size={15} strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold text-ink">
            Your next chapter starts here
          </p>
          <p className="text-[9px] leading-3 text-muted">
            Practical skills for a technology-driven future.
          </p>
        </div>
        <Sparkles size={14} className="shrink-0 text-brand-dark" />
      </div>
    );
  }

  return (
    <div className="relative z-20 mx-12 rounded-2xl border border-line bg-card p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-pale text-brand-dark">
          <Layers3 size={22} strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">
            Your next chapter starts here
          </p>
          <p className="mt-1 text-xs leading-5 text-muted">
            Practical skills for a technology-driven future.
          </p>
        </div>
        <Sparkles
          size={20}
          className="shrink-0 text-brand-dark"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}