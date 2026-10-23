import { Layers3, Sparkles } from "lucide-react";

type NextChapterCardProps = {
  variant?: "mobile" | "desktop";
};

export function NextChapterCard({ variant = "desktop" }: NextChapterCardProps) {
  const isMobile = variant === "mobile";

  const containerClasses = isMobile
    ? "mt-3 flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 shadow-card"
    : "relative z-20 mx-12 rounded-2xl border border-line bg-card p-5 shadow-card";

  const iconContainerClasses = isMobile
    ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-pale text-brand-dark"
    : "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-pale text-brand-dark";

  const iconSize = isMobile ? 15 : 22;
  const sparklesSize = isMobile ? 14 : 20;

  const titleClasses = isMobile
    ? "text-[11px] font-bold text-ink"
    : "text-sm font-bold text-ink";

  const descriptionClasses = isMobile
    ? "text-[9px] leading-3 text-muted"
    : "mt-1 text-xs leading-5 text-muted";

  return (
    <div className={containerClasses}>
      <div className={isMobile ? "flex items-center gap-2 w-full" : "flex items-center gap-3"}>
        <div className={iconContainerClasses}>
          <Layers3 size={iconSize} strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className={titleClasses}>
            Your next chapter starts here
          </p>
          <p className={descriptionClasses}>
            Practical skills for a technology-driven future.
          </p>
        </div>
        <Sparkles
          size={sparklesSize}
          className="shrink-0 text-brand-dark"
          {...(!isMobile && { "aria-hidden": "true" })}
        />
      </div>
    </div>
  );
}