"use client";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import type { Lesson } from "@/lib/types/lesson";

type CourseCurriculumTableProps = {
    courseID:string;
    lessons: Lesson[];
    totalDurationSeconds?: number;
};

function formatDuration(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds <= 0) return "Flexible";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} hr`;
    return `${h} hr ${m} min`;
}

function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export function CourseCurriculumTable({
    courseID,
    lessons,
    totalDurationSeconds,
}: CourseCurriculumTableProps) {
  // Keep lessons in curriculum order.
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  const totalLessons = sortedLessons.length;
  const freePreviewCount = sortedLessons.filter((l) => l.isFreePreview).length;

  const fallbackDuration =
    totalDurationSeconds ??
    sortedLessons.reduce((sum, l) => sum + l.durationSeconds, 0);

  /* ---------- Empty state ---------- */
  if (totalLessons === 0) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7">
        <h2 className="text-lg font-bold text-ink">Course content</h2>
        <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-card px-6 py-10 text-center">
          <PlayCircle size={22} className="text-slate-400" />
          <p className="mt-3 text-sm font-semibold text-ink">
            Lessons coming soon
          </p>
          <p className="mt-1 text-xs text-muted">
            Lessons for this course are being prepared. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  /* ---------- List ---------- */
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-lg font-bold text-ink">Course content</h2>
        <p className="text-xs text-muted">
          {totalLessons} lessons · {formatDuration(fallbackDuration)}
          {freePreviewCount > 0 && (
            <span className="ms-2 rounded-full bg-brand-pale px-2 py-0.5 text-[10px] font-bold uppercase text-brand-dark">
              {freePreviewCount} free preview
            </span>
          )}
        </p>
      </div>

      {/* Lessons list */}
      <ul className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line">
        {sortedLessons.map((lesson, index) => (
          <li
            key={lesson.id}
            className="flex items-center justify-between gap-3 bg-card px-4 py-3.5 text-sm transition hover:bg-surface"
          >
            <Link
                href={`/courses/${courseID}/${lesson.id}`}
                className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm"
            >
                {/* Left: icon + lesson number + title */}
                <span className="flex min-w-0 items-center gap-3">
                    <PlayCircle size={18} className="shrink-0 text-slate-400" />
                    <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-brand-dark">
                        Lesson {index + 1}
                    </span>
                    <span className="truncate font-medium text-ink">
                        {lesson.title}
                    </span>
                    {lesson.isFreePreview && (
                        <span className="shrink-0 rounded-full bg-brand-pale px-2 py-0.5 text-[10px] font-bold uppercase text-brand-dark">
                        Free preview
                        </span>
                    )}
                </span>

                {/* Right: duration */}
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                    {formatClock(lesson.durationSeconds)}
                </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}