import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, Star, UsersRound } from "lucide-react";
import type { Course } from "@/lib/types/course";
import { CourseThumbnailPlaceholder } from "./CourseThumbnailPlaceholder";
import {
  formatDuration,
  formatLevel,
  formatPrice,
} from "@/lib/utils/courseFormatters";

type Props = {
  shownCourse: Course;
};

export function CourseCard({ shownCourse }: Props) {
  return (
    <Link
      href={`/courses/${shownCourse.id}`}
      aria-label={`View ${shownCourse.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_14px_34px_rgba(27,42,63,0.1)]"
    >
      {/* Course thumbnail or fallback */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        {shownCourse.thumbnail_url ? (
          <Image
            src={shownCourse.thumbnail_url}
            alt={shownCourse.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <CourseThumbnailPlaceholder level={shownCourse.level} />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent"
        />

        <span className="absolute right-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-dark shadow-sm backdrop-blur-sm">
          {formatLevel(shownCourse.level)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-xs font-bold text-brand-dark">
            Learn programming with Roadmap
          </span>
          {Number(shownCourse.price) <= 0 && (
            <span className="shrink-0 rounded-full bg-brand-pale px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-dark">
              Free
            </span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-bold leading-6 text-ink">
          {shownCourse.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-muted">
          {shownCourse.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} className="text-slate-400" />
            {formatDuration(shownCourse.total_duration_seconds)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star size={14} fill="currentColor" className="text-amber-400" />
            <span className="font-semibold text-ink">
              {shownCourse.average_rating.toFixed(1)}
            </span>
            <span>({shownCourse.total_reviews})</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UsersRound size={14} className="text-slate-400" />
            {shownCourse.total_enrollments.toLocaleString("en-US")}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
              Course price
            </span>
            <span className="mt-1 block text-lg font-extrabold text-ink">
              {formatPrice(shownCourse)}
            </span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition group-hover:bg-brand-dark">
            View course
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}