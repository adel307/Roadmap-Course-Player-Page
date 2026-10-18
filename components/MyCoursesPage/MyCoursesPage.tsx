import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  GraduationCap,
  Star,
  UsersRound,
} from "lucide-react";
import type { Course } from "@/lib/types/course";
import { CourseThumbnailPlaceholder } from "@/components/coursesPage/CourseThumbnailPlaceholder";

type CoursesPageProps = {
  myCourses: Course[];
};

export const metadata: Metadata = {
  title: "My courses | Roadmap",
  description: "Explore the courses you have added to your learning list.",
};

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "Flexible schedule";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

function formatPrice(course: Course): string {
  const basePrice = Number(course.price);
  
  if (basePrice <= 0) {
    return "Free";
  }

  const effectivePrice = course.discount_price != null ? basePrice - Number(course.discount_price) : basePrice;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(effectivePrice);
}

function formatLevel(level: Course["level"]): string {
  if (level === "all_levels") return "All levels";
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export function MyCoursesPage({ myCourses }: CoursesPageProps) {

  return (
    <main className="min-h-screen bg-page text-ink">
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10">
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-muted">
            <Link href="/" className="transition hover:text-brand-dark">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2 text-slate-300">
              {">"}
            </span>
            <span className="text-ink">My Courses</span>
          </nav>

          <div className="mt-8 flex flex-col justify-between gap-6 sm:mt-10 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">
                <GraduationCap size={16} />
                Learn something new
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Explore all courses
              </h1>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                Build practical skills with expert-led courses designed to help
                you take the next step in your career.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pale text-brand-dark">
                <BookOpen size={19} />
              </span>
              <span>
                <span className="block text-lg font-bold leading-5 text-ink">
                  {myCourses.length}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {myCourses.length === 1 ? "course available" : "courses available"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-ink">Browse the catalog</h2>
            <p className="mt-1 text-sm text-muted">
              Find a course that fits your goals and your schedule.
            </p>
          </div>
          <span className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-muted">
            {myCourses.length} {myCourses.length === 1 ? "course" : "courses"}
          </span>
        </div>

        {myCourses.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {myCourses.map((course) => {

              return (
                <Link
                  href={`/courses/${course.id}`}
                  key={course.id}
                  aria-label={`View ${course.title}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_14px_34px_rgba(27,42,63,0.1)]"
                >
                  {/* Course thumbnail or fallback */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    {course.thumbnail_url ? (
                      <Image
                        src={course.thumbnail_url}
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                    <CourseThumbnailPlaceholder
                        level={course.level}
                      />
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent"
                    />

                    <span className="absolute right-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-dark shadow-sm backdrop-blur-sm">
                      {formatLevel(course.level)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-xs font-bold text-brand-dark">
                        Learn programming with Roadmap
                      </span>
                      {Number(course.price) <= 0 && (
                        <span className="shrink-0 rounded-full bg-brand-pale px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-dark">
                          Free
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 text-lg font-bold leading-6 text-ink">
                      {course.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-muted">
                      {course.description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-4 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={14} className="text-slate-400" />
                        {formatDuration(course.total_duration_seconds)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Star
                          size={14}
                          fill="currentColor"
                          className="text-amber-400"
                        />
                        <span className="font-semibold text-ink">
                          {course.average_rating.toFixed(1)}
                        </span>
                        <span>({course.total_reviews})</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <UsersRound size={14} className="text-slate-400" />
                        {course.total_enrollments.toLocaleString("en-US")}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                      <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
                          Course price
                        </span>
                        <span className="mt-1 block text-lg font-extrabold text-ink">
                          {formatPrice(course)}
                        </span>
                      </div>
                      <span
                        className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition group-hover:bg-brand-dark"
                      >
                        View course
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-card px-6 py-16 text-center">
            <BookOpen className="mx-auto text-brand-dark" size={28} />
            <h3 className="mt-4 text-lg font-bold text-ink">
              No courses found
            </h3>
            <p className="mt-2 text-sm text-muted">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}