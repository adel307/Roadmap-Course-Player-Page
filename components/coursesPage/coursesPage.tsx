import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import type { Course } from "@/lib/types/course";
import { CourseCard } from "./CourseCard";

export const metadata: Metadata = {
  title: "All courses | Roadmap",
  description: "Explore expert-led courses and build practical skills.",
};

type Props = {
  shownCourses: Course[];
};

export function CoursesPage({ shownCourses }: Props) {
  return (
    <main className="min-h-screen bg-page/55 text-ink dark:bg-page">
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10">
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-muted">
            <Link href="/" className="transition hover:text-brand-dark">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2 text-slate-300">
              {">"}
            </span>
            <span className="text-ink">Courses</span>
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
                  {shownCourses.length || 0}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {shownCourses.length === 1 ? "course available" : "courses available"}
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
            {shownCourses.length} {shownCourses.length === 1 ? "course" : "courses"}
          </span>
        </div>

        {shownCourses.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {shownCourses.map((shownCourse) => (
              <CourseCard key={shownCourse.id} shownCourse={shownCourse} />
            ))}
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