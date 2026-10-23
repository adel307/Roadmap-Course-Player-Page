import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type HeroCTAsProps = {
  size?: "sm" | "md";
};

export function HeroCTAs({ size = "md" }: HeroCTAsProps) {
  const isSmall = size === "sm";

  const containerClasses = isSmall
    ? "mt-5 flex flex-row gap-2.5"
    : "mt-9 flex flex-row gap-3";

  const primaryBtnClasses = isSmall
    ? "group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-3 text-xs font-bold text-white shadow-card transition duration-300 active:-translate-y-0.5 hover:-translate-y-1 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
    : "group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-sm font-bold text-white shadow-card transition duration-300 hover:-translate-y-1 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30";

  const secondaryBtnClasses = isSmall
    ? "group inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand/30 bg-card px-3 text-xs font-bold text-ink shadow-sm transition duration-300 active:-translate-y-0.5 hover:-translate-y-1 hover:border-brand hover:bg-brand-pale focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
    : "group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-brand/30 bg-card px-6 text-sm font-bold text-ink shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand-pale focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20";

  const primaryArrowSize = isSmall ? 15 : 19;
  const secondaryArrowSize = isSmall ? 14 : 18;

  const primaryText = isSmall ? "Explore paths" : "Explore learning paths";
  const secondaryText = isSmall ? "Our learners" : "Meet our learners";

  return (
    <div className={containerClasses}>
      <Link href="/courses" className={primaryBtnClasses}>
        <span className={isSmall ? "truncate" : ""}>{primaryText}</span>
        <ArrowRight
          size={primaryArrowSize}
          className={`${isSmall ? "shrink-0 " : ""}transition-transform duration-300 group-hover:translate-x-1`}
        />
      </Link>

      <Link href="#testimonials" className={secondaryBtnClasses}>
        <span className={isSmall ? "truncate" : ""}>{secondaryText}</span>
        <ArrowUpRight
          size={secondaryArrowSize}
          className={`${isSmall ? "shrink-0 " : ""}transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
        />
      </Link>
    </div>
  );
}