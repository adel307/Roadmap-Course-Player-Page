import Link from "next/link";
import {
  ArrowRight,
  Star,
  UsersRound,
  BookOpen,
} from "lucide-react";
import { featuredCourses } from "@/data/courses";

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "غير محدد";
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) return `${weeks} weeks`;
  if (days > 0) return `${days} days`;
  return `${hours} hours`;
}

export function FeaturedCourses() {
  return (
    <section id="courses" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-11 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-brand-dark">
            Find your direction
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Learn skills that move you forward
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">
            Explore hands-on learning paths in the fields shaping today&apos;s
            technology.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/15 bg-brand-pale px-3.5 py-2 text-xs font-semibold text-brand-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Explore featured programs
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {featuredCourses.map((course) => {

          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              aria-label={`Open ${course.title} course`}
              className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_14px_34px_rgba(27,42,63,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {/* Course thumbnail / fallback */}
              <div className="relative aspect-video w-full overflow-hidden bg-brand-pale">
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-pale via-white to-brand-pale">
                    {/* subtle grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.35]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, rgba(27,42,63,0.12) 1px, transparent 0)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="relative flex flex-col items-center gap-2 text-brand-dark">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand/20 bg-white shadow-sm">
                        <BookOpen size={22} strokeWidth={1.8} />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
                        {course.level}
                      </span>
                    </div>
                  </div>
                )}

                {/* level badge overlay */}
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-brand-dark shadow-sm backdrop-blur">
                  {course.level}
                </span>
              </div>

              <div className="p-3 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-brand-dark sm:text-[10px]">
                    Learn programming with IT legend
                  </span>
                </div>
                <h3 className="mt-3 min-h-12 text-sm font-bold leading-5 text-ink sm:text-base sm:leading-6">
                  {course.title}
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] sm:gap-3 sm:text-xs">
                  <span className="inline-flex items-center gap-1 font-bold text-ink">
                    <Star size={14} fill="currentColor" className="text-[#ffc107]" />
                    {course.average_rating.toFixed(1)}
                  </span>
                  <span className="h-3 w-px bg-line" />
                  <span className="inline-flex items-center gap-1.5 text-muted">
                    <UsersRound size={14} />
                    {course.total_enrollments} learners
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-xs text-muted">
                    {formatDuration(course.total_duration_seconds)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-brand/25 bg-white px-2 py-1.5 text-[10px] font-bold text-brand-dark transition group-hover:bg-brand-pale sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs">
                    Course details
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Course ratings and enrolment figures are illustrative examples.
      </p>
    </section>
  );
}