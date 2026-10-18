import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";
import type { Course } from "@/lib/types/course";
import { formatDuration } from "@/lib/utils/lesson-utils";

type Props = {
  course: Course;
  lessons: Lesson[];
  currentLessonId: string;
};

export function LessonSidebar({ course, lessons, currentLessonId }: Props) {
  const completedCount = 0;

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        {/* Course header */}
        <div className="bg-gradient-to-br from-brand-dark to-navy p-5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/60">
            Course
          </p>
          <h2 className="mt-1 text-base font-bold text-white">{course.title}</h2>
          <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
            <span>{lessons.length} lessons</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{formatDuration(course.total_duration_seconds)}</span>
          </div>
        </div>

        {/* Progress */}
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
              style={{
                width: `${(completedCount / lessons.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Lessons list */}
        <div className="max-h-[480px] overflow-y-auto">
          {lessons.map((lesson) => {
            const isCurrent = lesson.id === currentLessonId;
            return (
              <Link
                key={lesson.id}
                href={`/courses/${course.id}/${lesson.id}`}
                className={`flex items-start gap-3 border-b border-line px-5 py-3.5 transition last:border-b-0 ${
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
                    <span>🎬</span>
                    <span>{formatDuration(lesson.durationSeconds)}</span>
                    {lesson.isFreePreview && (
                      <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                        Free
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}