"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { fetchLessons } from "@/lib/api/fetchLessons";
import { getPlaylistId } from "@/lib/getPlaylistId";
import { Course } from "@/lib/types/course";
import Link from "next/link";

interface CourseClientWrapperProps {
  course: Course;
}

const ITEMS_PER_PAGE = 5;

export function CourseClientWrapper({ course }: CourseClientWrapperProps) {
  const { lessonsByCourse, fetchLessonsForCourse, loadingCourses, errors } =
    useCourseStore();

  const [currentPage, setCurrentPage] = useState(0);

  const loadLessons = useCallback(() => {
    try {
      const playlistId = getPlaylistId(course.promo_video_url);
      if (playlistId) {
        fetchLessonsForCourse(course.id, playlistId, async (courseId, pId) => {
          const res = await fetchLessons(courseId, pId);
          return res.lessons;
        });
      } else {
        console.warn("Invalid or missing playlist URL for course:", course.id);
      }
    } catch (error) {
      console.error("Error extracting playlist ID:", error);
    }
  }, [course.id, course.promo_video_url, fetchLessonsForCourse]);

  useEffect(() => {
    if (!lessonsByCourse[course.id] && !loadingCourses[course.id] && !errors[course.id]) {
      loadLessons();
    }
  }, [course.id, lessonsByCourse, loadingCourses, errors, loadLessons]);

  const courseLessons = [...(lessonsByCourse[course.id] || [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  const isLoading = loadingCourses[course.id];
  const error = errors[course.id];

  const totalPages = Math.ceil(courseLessons.length / ITEMS_PER_PAGE);

  // تحديد الدروس المعروضة في الصفحة الحالية
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleLessons = courseLessons.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  function handleNext() {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  if (isLoading) {
    return (
      <div className="py-12 text-center text-sm text-muted">
        Loading lessons...
      </div>
    );
  }

  // التعامل مع الخطأ وإعطاء المستخدم خيار إعادة المحاولة
  if (error) {
    return (
      <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">Unable to load lessons: {error}</p>
        <button
          onClick={loadLessons}
          className="px-4 py-2 bg-primary text-white rounded-md text-xs font-semibold hover:opacity-95 transition"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (courseLessons.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted">
        No lessons are available yet.
      </div>
    );
  }

  return (
    <section className="py-8">
      {/* Header section with Prev/Next buttons */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-brand-dark">
            Course content
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Course lessons ({courseLessons.length})
          </h2>
        </div>

        {/* Desktop Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous lessons"
              disabled={currentPage === 0}
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-slate-600 transition hover:border-brand/35 hover:text-brand-dark disabled:opacity-40 disabled:hover:border-line disabled:hover:text-slate-600"
            >
              <ArrowRight size={18} />
            </button>
            <span className="px-2 text-xs font-semibold text-muted">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              type="button"
              aria-label="Next lessons"
              disabled={currentPage >= totalPages - 1}
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-slate-600 transition hover:border-brand/35 hover:text-brand-dark disabled:opacity-40 disabled:hover:border-line disabled:hover:text-slate-600"
            >
              <ArrowLeft size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Lessons List */}
      <div className="grid gap-4 sm:grid-cols-1">
        {visibleLessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/courses/${course.id}/${lesson.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-line bg-card p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:bg-brand sm:flex-row sm:items-center"
            style={{
              boxShadow:
                "0 1px 2px rgba(15,23,42,0.06), 0 8px 20px -6px rgba(15,23,42,0.12)",
            }}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-pale text-brand-dark transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">
                <PlayCircle size={20} />
              </span>
              <div>
                <h3 className="text-base font-bold text-ink transition-colors duration-300 group-hover:text-white">
                  {lesson.order}. {lesson.title}
                </h3>
                {lesson.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted transition-colors duration-300 group-hover:text-white/80">
                    {lesson.description}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 text-base font-bold text-ink transition-colors duration-300 group-hover:text-white/70 sm:mt-0 sm:shrink-0">
              {"=>"}
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Previous lessons"
            disabled={currentPage === 0}
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-slate-600 transition active:scale-95 disabled:opacity-40"
          >
            <ArrowRight size={17} />
          </button>
          <span className="text-xs font-semibold text-muted">
            {currentPage + 1} of {totalPages}
          </span>
          <button
            type="button"
            aria-label="Next lessons"
            disabled={currentPage >= totalPages - 1}
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-slate-600 transition active:scale-95 disabled:opacity-40"
          >
            <ArrowLeft size={17} />
          </button>
        </div>
      )}
    </section>
  );
}