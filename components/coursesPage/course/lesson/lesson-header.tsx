import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import type { Lesson } from "@/lib/types/lesson";
import type { Course } from "@/lib/types/course";
import { formatDuration } from "@/lib/utils/lesson-utils";
import { useCourseStore } from "@/lib/store/useCourseStore";

type Props = {
  course: Course;
  lesson: Lesson;
};

export function LessonHeader({ course, lesson }: Props) {
  const savedLessonsIds = useCourseStore((state) => state.savedLessonsIds);
  const toggleSavedLesson = useCourseStore((state) => state.toggleSavedLesson);
  const isSaved = savedLessonsIds.includes(lesson.id);

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">
        {/* Breadcrumbs */}
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          <Link href="/courses" className="transition hover:text-brand">
            Courses
          </Link>
          <span>{">"}</span>
          <Link
            href={`/courses/${course.id}`}
            className="transition hover:text-brand"
          >
            {course.title}
          </Link>
          <span>{">"}</span>
          <span className="truncate text-ink">{lesson.title}</span>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                <span>🎬</span>
                Video Lesson
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
                Lesson {lesson.order}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
                {formatDuration(lesson.durationSeconds)}
              </span>
              {lesson.isFreePreview && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                  Free Preview
                </span>
              )}
            </div>

            {/* Title + description */}
            <h1 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {lesson.title}
            </h1>
            {lesson.description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {lesson.description}
              </p>
            )}
          </div>

          {/* Save button */}
          <button
            type="button"
            aria-pressed={isSaved}
            onClick={() => toggleSavedLesson(course.id, lesson.id)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              isSaved
                ? "border-brand/30 bg-brand-pale text-brand-dark"
                : "border-line bg-white text-ink hover:bg-surface"
            }`}
          >
            {isSaved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
            {isSaved ? "Saved" : "Save lesson"}
          </button>
        </div>
      </div>
    </header>
  );
}