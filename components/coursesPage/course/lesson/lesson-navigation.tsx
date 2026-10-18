import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";
import type { Course } from "@/lib/types/course";

type Props = {
  course: Course;
  prev: Lesson | null;
  next: Lesson | null;
};

export function LessonNavigation({ course, prev, next }: Props) {
  // لو مفيش لا prev ولا next، منعرضش حاجة خالص
  if (!prev && !next) return null;

  const getHref = (lesson: Lesson) =>
    `/courses/${course.id}/${lesson.slug ?? lesson.id}`;

  return (
    <nav
      aria-label="Lesson navigation"
      className={`grid gap-3 ${prev && next ? "sm:grid-cols-2" : ""}`}
    >
      {prev && (
        <Link
          href={getHref(prev)}
          className="group flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3 shadow-card transition hover:border-brand/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:px-4"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-muted transition group-hover:bg-brand/10 group-hover:text-brand">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Previous
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-ink transition group-hover:text-brand">
              {prev.title}
            </p>
          </div>
        </Link>
      )}

      {next && (
        <Link
          href={getHref(next)}
          className="group flex items-center justify-end gap-3 rounded-xl border border-line bg-white px-3.5 py-3 text-right shadow-card transition hover:border-brand/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:px-4"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Next
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-ink transition group-hover:text-brand">
              {next.title}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-muted transition group-hover:bg-brand/10 group-hover:text-brand">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>
      )}
    </nav>
  );
}