import Link from "next/link";
import { ChevronRight, Clock3, Globe, Star, UsersRound } from "lucide-react";
import type { Course } from "@/lib/types/course";

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "Flexible";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

function formatLevel(level: Course["level"]): string {
  if (level === "all_levels") return "All levels";
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function formatLanguage(code: string): string {
  const map: Record<string, string> = {
    ar: "Arabic",
    en: "English",
    english: "English",
    arabic: "Arabic",
  };
  return map[code?.toLowerCase()] ?? code;
}

type CourseHeroProps = {
  course: Course;
  level?: string;
};

export function CourseHero({ course, level }: CourseHeroProps) {
  const isFree = Number(course.price) <= 0;

  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-medium text-muted"
        >
          <Link href="/" className="transition hover:text-brand-dark">
            Home
          </Link>
          <ChevronRight size={12} className="text-slate-300" />
          <Link href="/courses" className="transition hover:text-brand-dark">
            Courses
          </Link>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="max-w-[200px] truncate text-ink sm:max-w-none">
            {course.title}
          </span>
        </nav>

        {/* Title & meta */}
        <div className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {level && (
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">
                {level}
              </span>
            )}
            <span className="rounded-full bg-brand-pale px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-dark">
              {formatLevel(course.level)}
            </span>
            {isFree && (
              <span className="rounded-full bg-brand-pale px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-dark">
                Free
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {course.title}
          </h1>

          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            {course.description}
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-1.5 font-bold text-ink">
              <Star size={16} fill="currentColor" className="text-[#ffc107]" />
              {course.average_rating.toFixed(1)}
              <span className="font-normal text-muted">
                ({course.total_reviews} reviews)
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <UsersRound size={16} className="text-slate-400" />
              {course.total_enrollments.toLocaleString("en-US")} learners
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <Clock3 size={16} className="text-slate-400" />
              {formatDuration(course.total_duration_seconds)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <Globe size={16} className="text-slate-400" />
              {formatLanguage(course.language)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}