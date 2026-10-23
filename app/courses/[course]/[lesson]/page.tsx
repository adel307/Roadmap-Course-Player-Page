"use client";

import { use, useEffect, useMemo, useSyncExternalStore } from "react";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { fetchLessons } from "@/lib/api/fetchLessons";
import { getPlaylistId } from "@/lib/getPlaylistId";
import { courses as serverCourses } from "@/data/courses";
import NotFound from "./notFound";
import LessonDetailContent from "@/components/coursesPage/course/lesson/lesson-detail-content";

type PageProps = {
    params: Promise<{ course: string; lesson: string }>;
};

export default function LessonDetailClient({ params }: PageProps) {
    const resolvedParams = use(params);
    const courseID = resolvedParams.course;
    const lessonID = resolvedParams.lesson;

    const {
        courses,
        setCourses,
        getCourseById,
        lessonsByCourse,
        loadingCourses,
        errors,
        fetchLessonsForCourse,
    } = useCourseStore((state) => state);

    const emptySubscribe = () => () => {};
    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    useEffect(() => {

        const existing = getCourseById(courseID);
        if (!existing) {
            setCourses(serverCourses);
        }
    }, [courseID, getCourseById, setCourses]);

    const course = getCourseById(courseID);

    useEffect(() => {
        if (!course) return;

        const existingLessons = lessonsByCourse[course.id];
        const isLoading = loadingCourses[course.id];

        if (existingLessons && existingLessons.length > 0) return;
        if (isLoading) return;

        const playlistId = getPlaylistId(course.promo_video_url);
        if (!playlistId) return;

        fetchLessonsForCourse(
            course.id,
            course.promo_video_url,
            async (cId, pId) => {
                const res = await fetchLessons(cId, pId);
                return res.lessons;
            }
        );
    }, [
        course,
        lessonsByCourse,
        loadingCourses,
        fetchLessonsForCourse,
    ]);

    const courseLessons = useMemo(
        () => (course ? lessonsByCourse[course.id] ?? [] : []),
        [course, lessonsByCourse]
    );

    const lesson = useMemo(
        () =>
            courseLessons.find(
                (l) => l.id.toString() === lessonID || l.slug === lessonID
            ),
        [courseLessons, lessonID]
    );

    const currentIndex = useMemo(
        () =>
            courseLessons.findIndex(
                (l) => l.id.toString() === lessonID || l.slug === lessonID
            ),
        [courseLessons, lessonID]
    );

    const prev = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
    const next =
        currentIndex >= 0 && currentIndex < courseLessons.length - 1
            ? courseLessons[currentIndex + 1]
            : null;

    const related = useMemo(() => {
        if (!course) return [];
        return courses
            .filter((c) => c.id !== course.id && c.level === course.level)
            .slice(0, 3);
    }, [courses, course]);

    if (!isMounted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-page/55 dark:bg-page">
                <p className="text-muted">جاري تحميل البيانات...</p>
            </div>
        );
    }

    if (!course) {
        return <NotFound lessonID={lessonID} reason="course-not-found" courseID={courseID} />;
    }

    const isLessonsLoading = loadingCourses[course.id];
    const courseError = errors[course.id];

    if (isLessonsLoading && courseLessons.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-page/55 dark:bg-page">
                <p className="text-muted">Loading lesson and course details...</p>
            </div>
        );
    }

    if (courseError) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-page/55 p-6 text-center dark:bg-page">
                <p className="font-medium text-red-500">
                    عذراً، حدث خطأ أثناء تحميل الدروس.
                </p>
                <p className="text-sm text-muted">{courseError}</p>
                <button
                    onClick={() => {
                        const playlistId = getPlaylistId(course.promo_video_url);
                        if (!playlistId) return;
                        fetchLessonsForCourse(
                            course.id,
                            course.promo_video_url,
                            async (cId, pId) => {
                                const res = await fetchLessons(cId, pId);
                                return res.lessons;
                            }
                        );
                    }}
                    className="rounded-md bg-primary px-4 py-2 text-white transition hover:opacity-90"
                >
                    إعداد المحاولة
                </button>
            </div>
        );
    }

    if (!lesson) {
        return <NotFound lessonID={lessonID} reason="lesson-not-found" courseID={courseID} />;
    }
    return (
        <LessonDetailContent
            course={course}
            lesson={lesson}
            courseLessons={courseLessons}
            prev={prev}
            next={next}
            related={related}
        />
    );
}