import { LucideIcon } from "lucide-react";
import { textHoverClass } from "./data";

type PillarCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  variant?: "mobile" | "desktop";
  showLeftBorder?: boolean;
};

const cardShadow =
  "0 1px 2px rgba(15,23,42,0.06), 0 8px 20px -6px rgba(15,23,42,0.18), 0 20px 40px -12px rgba(15,23,42,0.22)";

export function PillarCard({
  title,
  description,
  icon: Icon,
  variant = "desktop",
  showLeftBorder = false,
}: PillarCardProps) {
  const isMobile = variant === "mobile";

  const containerClasses = isMobile
    ? "group flex items-start gap-3 rounded-xl border border-transparent p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-l border-transparent hover:bg-gradient-to-r hover:from-brand hover:to-brand/0"
    : `group flex flex-col gap-3 rounded-xl border border-transparent p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/30 hover:bg-brand ${
        showLeftBorder ? "border-l border-line pl-4" : ""
      }`;

  const iconContainerClasses = isMobile
    ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-pale text-brand-dark transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white"
    : "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-pale text-brand-dark transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white";

  const titleClasses = isMobile
    ? "text-sm font-bold text-ink transition-colors duration-300 group-hover:text-white"
    : `text-sm font-bold text-ink transition-colors duration-300 group-hover:text-white ${textHoverClass}`;

  const descriptionClasses = isMobile
    ? "mt-0.5 text-xs leading-5 text-muted transition-colors duration-300 group-hover:text-white/80"
    : `mt-1 text-xs leading-5 text-muted transition-colors duration-300 group-hover:text-white/80 ${textHoverClass}`;

  const iconSize = isMobile ? 18 : 22;

  if (isMobile) {
    return (
      <div className={containerClasses} style={{ boxShadow: cardShadow }}>
        <div className={iconContainerClasses}>
          <Icon size={iconSize} strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <h2 className={titleClasses}>{title}</h2>
          <p className={descriptionClasses}>{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses} style={{ boxShadow: cardShadow }}>
      <div className="flex items-center gap-3">
        <div className={iconContainerClasses}>
          <Icon size={iconSize} strokeWidth={1.8} />
        </div>
        <h2 className={titleClasses}>{title}</h2>
      </div>
      <div>
        <p className={descriptionClasses}>{description}</p>
      </div>
    </div>
  );
}