import { CoursePromoPlayer } from "@/components/coursesPage/course/course-promo-player";
import { LessonHeader } from "@/components/coursesPage/course/lesson/lesson-header";
import { LessonSidebar } from "@/components/coursesPage/course/lesson/lesson-sidebar";
import { LessonNavigation } from "@/components/coursesPage/course/lesson/lesson-navigation";
import { RelatedCourses } from "@/components/coursesPage/course/related-courses";
import type { LessonDetailContentProps } from "@/lib/types/lesson";
import { LessonComments } from "./lesson-comments";

export default function LessonDetailContent({
    course,
    lesson,
    courseLessons,
    prev,
    next,
    related,
}: LessonDetailContentProps) {
    if (!lesson) {
        return (
            <main className="min-h-screen bg-page text-ink">
                <div className="mx-auto max-w-7xl px-5 py-12 text-center sm:px-8">
                    <p className="text-muted">Loading lesson details...</p>
                </div>
            </main>
        );
    }

    const currentIndex = courseLessons.findIndex(
        (l) => l.id === lesson.id || l.slug === lesson.id
    );
    const currentNumber = currentIndex >= 0 ? currentIndex + 1 : lesson.order;

    return (
        <main className="min-h-screen bg-page text-ink">
            {/* ---------- Header ---------- */}
            <LessonHeader course={course} lesson={lesson} />

            {/* ---------- Body ---------- */}
            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">
                {/* Mobile: Sidebar collapsible */}
                <div className="mb-6 lg:hidden">
                    <details className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-sm">
                                    📚
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-ink">
                                        Course lessons
                                    </p>
                                    <p className="truncate text-[11px] text-muted">
                                        Lesson {currentNumber} of {courseLessons.length}
                                    </p>
                                </div>
                            </div>
                            <svg
                                className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </summary>
                        <div className="border-t border-line">
                            <LessonSidebar
                                course={course}
                                lessons={courseLessons}
                                currentLessonId={lesson.id}
                                compact
                            />
                        </div>
                    </details>
                </div>

                <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-12">
                    {/* ===== Main column ===== */}
                    <div className="min-w-0 space-y-5 sm:space-y-6 lg:col-span-8">
                        {/* 🎬 Video Player */}
                        <CoursePromoPlayer
                            title={lesson.title}
                            thumbnailUrl={course.thumbnail_url}
                            videoUrl={lesson.videoUrl}
                        />

                        {/* About this lesson */}
                        {lesson.description && (
                            <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-6 lg:p-7">
                                <h2 className="text-sm font-bold text-ink sm:text-base">
                                    About this lesson
                                </h2>
                                <p className="mt-2.5 text-sm leading-7 text-muted sm:mt-3">
                                    {lesson.description}
                                </p>
                            </div>
                        )}

                        {/* Prev / Next */}
                        <LessonNavigation course={course} prev={prev} next={next} />
                        <LessonComments comments={lesson.comments} course={course} lesson={lesson} />
                    </div>

                    {/* ===== Sidebar (desktop only) ===== */}
                    <div className="hidden lg:col-span-4 lg:block">
                        <LessonSidebar
                            course={course}
                            lessons={courseLessons}
                            currentLessonId={lesson.id}
                        />
                    </div>
                </div>

                {/* ---------- Related courses ---------- */}
                {related.length > 0 && (
                    <div className="mt-10 sm:mt-12">
                        <RelatedCourses courses={related} />
                    </div>
                )}
            </section>
        </main>
    );
}