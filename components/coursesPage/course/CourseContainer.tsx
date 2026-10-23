import { notFound } from "next/navigation";
import { CoursePromoPlayer } from "@/components/coursesPage/course/course-promo-player";
import { WhatYouWillLearn } from "@/components/coursesPage/course/what_will_learn";
import { CourseSidebar } from "@/components/coursesPage/course/course-sidebar";
import { CourseHero } from "@/components/coursesPage/course/course-hero";
import { RelatedCourses } from "@/components/coursesPage/course/related-courses";
import { CourseClientWrapper } from "@/components/coursesPage/course/CourseClientWrapper";
import { Course } from "@/lib/types/course";

type Props = {
    shownCourse: Course;
    relatedCourses: Course[];
};

export default function CourseDetailPageContent({ relatedCourses ,  shownCourse }: Props) {

    if (!shownCourse) notFound();

    return (
        <main className="min-h-screen bg-page/55 text-ink dark:bg-page">
        {/* ---------- Hero ---------- */}
        <CourseHero course={shownCourse} level={shownCourse.level} />

        {/* ---------- Body ---------- */}
        <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
            <div className="grid items-start gap-8 lg:grid-cols-12">
            {/* ===== Main column ===== */}
            <div className="space-y-6 lg:col-span-8">
                {/* Preview */}
                {shownCourse.thumbnail_url ? (
                <CoursePromoPlayer
                    title={shownCourse.title}
                    thumbnailUrl={shownCourse.thumbnail_url}
                    videoUrl={shownCourse.promo_video_url}
                />
                ) : (
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-brand-dark to-navy shadow-card">
                    <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    No preview video yet
                    </span>
                </div>
                )}

                {/* What you'll learn */}
                <WhatYouWillLearn course={shownCourse} />

                {/* Curriculum */}
                <CourseClientWrapper course={shownCourse} />

                {/* Requirements */}
                {shownCourse.requirements.length > 0 && (
                    <section className="space-y-4 transition-all duration-300 ease-out hover:-translate-y-2">
                        {/* Main card */}
                        <div className="rounded-2xl border border-line bg-card p-6 shadow-card sm:p-7">
                            <h2 className="text-sm font-bold text-ink">Requirements</h2>

                            <ul className="mt-4 space-y-3.5 text-sm">
                                {shownCourse.requirements.map((req: string) => (
                                    <li
                                        key={req}
                                        className="flex items-start gap-3 leading-6 text-ink/80"
                                    >
                                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </div>

            {/* ===== Sidebar ===== */}
            <CourseSidebar course={shownCourse} />
            </div>

            {/* ---------- Related ---------- */}
            <RelatedCourses courses={relatedCourses} />
        </section>
        </main>
    );
}