import { BadgeCheck } from "lucide-react";
import { highlights } from "./data";

type HeroHighlightsProps = {
  size?: "sm" | "md";
};

export function HeroHighlights({ size = "md" }: HeroHighlightsProps) {
  const isSmall = size === "sm";

  return (
    <ul
      className={
        isSmall
          ? "mt-5 flex flex-wrap justify-between gap-x-4 gap-y-2"
          : "mt-8 flex flex-wrap gap-x-5 gap-y-3"
      }
    >
      {highlights.map((highlight) => (
        <li
          key={highlight}
          className={
            isSmall
              ? "flex items-center gap-1.5 text-xs font-medium text-muted"
              : "flex items-center gap-2 text-sm font-medium text-muted"
          }
        >
          <span
            className={
              isSmall
                ? "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-pale text-brand-dark"
                : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-pale text-brand-dark"
            }
          >
            <BadgeCheck size={isSmall ? 13 : 16} />
          </span>
          {highlight}
        </li>
      ))}
    </ul>
  );
}