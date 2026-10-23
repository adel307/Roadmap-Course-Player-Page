"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Clock3,
  Play,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { formatDuration } from "@/lib/utils/lesson-utils";
import { Course } from "@/lib/types/course";
import { Lesson } from "@/lib/types/lesson";

export default function SavedLessonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const getAllLessons = useCourseStore((state) => state.getAllLessons);
  const getCourseById = useCourseStore((state) => state.getCourseById);
  const toggleSavedLesson = useCourseStore((state) => state.toggleSavedLesson);

  const allLessons = getAllLessons();

  const savedLessons = useMemo(() => {
    return allLessons
      .filter((lesson) => lesson.isSaved && lesson.isPublished && !lesson.deletedAt)
      .map((lesson) => {
        const course = getCourseById(lesson.coursesId);
        return course ? { course, lesson } : null;
      })
      .filter(Boolean) as { course: Course; lesson: Lesson }[];
  }, [allLessons, getCourseById]);

  const filteredLessons = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    if (!query) return savedLessons;

    return savedLessons.filter(({ course, lesson }) => {
      const lessonMatch = lesson.title.toLocaleLowerCase().includes(query);
      const courseMatch = course.title.toLocaleLowerCase().includes(query);
      return lessonMatch || courseMatch;
    });
  }, [savedLessons, searchQuery]);

  const hasSavedLessons = savedLessons.length > 0;

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
            <span className="text-ink">Saved lessons</span>
          </nav>

          <div className="mt-8 flex flex-col justify-between gap-6 sm:mt-10 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">
                <Sparkles size={16} />
                Your personal library
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Saved lessons
              </h1>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                Keep the lessons you want to revisit close at hand, and pick up
                right where your curiosity left off.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pale text-brand-dark">
                <Bookmark size={19} />
              </span>
              <span>
                <span className="block text-lg font-bold leading-5 text-ink">
                  {savedLessons.length}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {savedLessons.length === 1 ? "lesson saved" : "lessons saved"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-ink">Your collection</h2>
            <p className="mt-1 text-sm text-muted">
              {hasSavedLessons
                ? "A little progress, whenever you’re ready."
                : "Lessons you bookmark will be collected here."}
            </p>
          </div>

          {hasSavedLessons && (
            <label className="relative block w-full sm:max-w-xs">
              <Search
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search saved lessons"
                aria-label="Search saved lessons"
                className="w-full rounded-xl border border-line bg-card py-3 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand/60 focus:ring-2 focus:ring-brand/10"
              />
            </label>
          )}
        </div>

        {!hasSavedLessons ? (
          <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-card">
            <div className="relative flex flex-col items-center px-6 py-14 text-center sm:py-20">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-brand/5 blur-2xl"
              />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-pale text-brand-dark">
                <Bookmark size={28} />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">
                Your saved list starts here
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Find a lesson you love and tap “Save lesson”. It’ll be waiting
                here whenever you’re ready to learn again.
              </p>
              <Link
                href="/courses"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand"
              >
                Explore courses
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-card px-6 py-14 text-center">
            <Search size={24} className="mx-auto text-muted" />
            <h3 className="mt-4 font-bold text-ink">No matching lessons</h3>
            <p className="mt-1 text-sm text-muted">
              Try another lesson or course title.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredLessons.map(({ course, lesson }) => {
              const lessonHref = `/courses/${course.id}/${lesson.slug ?? lesson.id}`;

              return (
                <article
                  key={`${course.id}-${lesson.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_14px_34px_rgba(27,42,63,0.1)]"
                >
                  <Link
                    href={lessonHref}
                    aria-label={`Play ${lesson.title}`}
                    className="relative block aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy to-brand-dark"
                  >
                    {lesson.thumbnail && (
                      <Image
                        src={lesson.thumbnail}
                        alt=""
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      <Clock3 size={13} />
                      {formatDuration(lesson.durationSeconds)}
                    </span>
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-sm transition group-hover:scale-105">
                      <Play size={17} fill="currentColor" />
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold text-brand-dark">
                      {course.title}
                    </p>
                    <Link
                      href={lessonHref}
                      className="mt-2 line-clamp-2 text-base font-bold leading-6 text-ink transition hover:text-brand-dark"
                    >
                      {lesson.title}
                    </Link>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span className="text-xs text-muted">
                        Lesson {lesson.order}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSavedLesson(course.id, lesson.id)}
                        aria-label={`Remove ${lesson.title} from saved lessons`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-muted transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:hover:bg-rose-950/30"
                      >
                        <X size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}