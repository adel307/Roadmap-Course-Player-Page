import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";
import type { Course } from "@/lib/types/course";
import { formatDuration } from "@/lib/utils/lesson-utils";

type Props = {
  course: Course;
  lessons: Lesson[];
  currentLessonId: string;
  compact?: boolean;
};

export function LessonSidebar({
  course,
  lessons,
  currentLessonId,
  compact = false,
}: Props) {
  const completedCount = 0;
  const progressPercent =
    lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  return (
    <aside className={compact ? "" : "space-y-4 lg:sticky lg:top-24"}>
      <div
        className={
          compact
            ? ""
            : "overflow-hidden rounded-2xl border border-line bg-white shadow-card"
        }
      >
        {/* ---------- Course header + Progress (desktop only) ---------- */}
        {!compact && (
          <>
            <div className="bg-gradient-to-br from-brand-dark to-navy p-5">
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/60">
                Course
              </p>
              <h2 className="mt-1 text-base font-bold text-white">
                {course.title}
              </h2>
              <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
                <span>{lessons.length} lessons</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{formatDuration(course.total_duration_seconds)}</span>
              </div>
            </div>

            <div className="border-b border-line px-5 py-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-ink">Your progress</span>
                <span className="text-muted">
                  {completedCount}/{lessons.length}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </>
        )}

        {/* ---------- Lessons list ---------- */}
        <div
          className={`overflow-y-auto ${
            compact ? "max-h-[55vh]" : "max-h-[480px]"
          }`}
        >
          {lessons.length === 0 ? (
            <div className="px-5 py-6 text-center text-sm text-muted">
              No lessons available yet.
            </div>
          ) : (
            lessons.map((lesson) => {
              const isCurrent =
                lesson.id === currentLessonId ||
                lesson.slug === currentLessonId;

              return (
                <Link
                  key={lesson.id}
                  href={`/courses/${course.id}/${lesson.slug ?? lesson.id}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex items-start gap-3 border-b border-line px-4 py-3 transition last:border-b-0 sm:px-5 sm:py-3.5 ${
                    isCurrent ? "bg-brand/5" : "hover:bg-surface"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                      isCurrent
                        ? "bg-brand text-white"
                        : "bg-surface text-muted"
                    }`}
                  >
                    {lesson.order}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium ${
                        isCurrent ? "text-brand" : "text-ink"
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted">
                      <span aria-hidden="true">🎬</span>
                      <span>{formatDuration(lesson.durationSeconds)}</span>
                      {lesson.isFreePreview && (
                        <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                  {isCurrent && (
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}