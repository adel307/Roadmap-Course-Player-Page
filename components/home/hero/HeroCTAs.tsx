import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type HeroCTAsProps = {
  size?: "sm" | "md";
};

export function HeroCTAs({ size = "md" }: HeroCTAsProps) {
  const isSmall = size === "sm";

  if (isSmall) {
    return (
      <div className="mt-5 flex flex-row gap-2.5">
        <Link
          href="/courses"
          className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-3 text-xs font-bold text-white shadow-card transition duration-300 active:-translate-y-0.5 hover:-translate-y-1 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
        >
          <span className="truncate">Explore paths</span>
          <ArrowRight
            size={15}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="#testimonials"
          className="group inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand/30 bg-card px-3 text-xs font-bold text-ink shadow-sm transition duration-300 active:-translate-y-0.5 hover:-translate-y-1 hover:border-brand hover:bg-brand-pale focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
        >
          <span className="truncate">Our learners</span>
          <ArrowUpRight
            size={14}
            className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-9 flex flex-row gap-3">
      <Link
        href="/courses"
        className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-sm font-bold text-white shadow-card transition duration-300 hover:-translate-y-1 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
      >
        Explore learning paths
        <ArrowRight
          size={19}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <Link
        href="#testimonials"
        className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-brand/30 bg-card px-6 text-sm font-bold text-ink shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand-pale focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
      >
        Meet our learners
        <ArrowUpRight
          size={18}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}