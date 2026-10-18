import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";
import type { Course } from "@/lib/types/course";

type Props = {
  course: Course;
  prev: Lesson | null;
  next: Lesson | null;
};

export function LessonNavigation({ course, prev, next }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/courses/${course.slug}/${prev.slug}`}
          className="group flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3 shadow-card transition hover:border-brand/30 hover:shadow-md"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-muted transition group-hover:bg-brand/10 group-hover:text-brand">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Previous
            </p>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/courses/${course.id}/${next.id}`}
          className="group flex items-center justify-end gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-right shadow-card transition hover:border-brand/30 hover:shadow-md"
        >
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Next
            </p>
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-muted transition group-hover:bg-brand/10 group-hover:text-brand">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}