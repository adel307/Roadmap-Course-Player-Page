"use client";

import { use, useEffect, useCallback } from "react";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { fetchLessons } from "@/lib/api/fetchLessons";
import { getPlaylistId } from "@/lib/getPlaylistId";
import { courses as dataCourses } from "@/data/courses";
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
        lessonsByCourse, 
        loadingCourses, 
        errors,
        fetchLessonsForCourse 
    } = useCourseStore((state) => state);

    useEffect(() => {
        if (courses.length === 0 && dataCourses.length > 0) {
            setCourses(dataCourses);
        }
    }, [courses, setCourses]);

    const activeCourses = courses.length > 0 ? courses : dataCourses;
    const course = activeCourses.find((c) => c.id.toString() === courseID);

    // useCallback is called at the top level of the component
    const loadLessons = useCallback(() => {
        if (!course) return;
        fetchLessonsForCourse(
            course.id,
            getPlaylistId(course.promo_video_url),
            async (cId, pId) => {
                const res = await fetchLessons(cId, pId);
                return res.lessons;
            }
        );
    }, [course, fetchLessonsForCourse]);

    useEffect(() => {
        if (course && !lessonsByCourse[course.id] && !loadingCourses[course.id] && !errors[course.id]) {
            loadLessons();
        }
    }, [course, lessonsByCourse, loadingCourses, errors, loadLessons]);

    const courseLessons = course ? lessonsByCourse[course.id] || [] : [];
    const lesson = courseLessons.find(
        (l) => l.id.toString() === lessonID || l.slug === lessonID
    );

    const currentIndex = courseLessons.findIndex((l) => l.id.toString() === lessonID || l.slug === lessonID);
    const prev = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
    const next = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

    const related = courses
        .filter((c) => course && c.id !== course.id && c.level === course.level)
        .slice(0, 3);

    const isLessonsLoading = course ? loadingCourses[course.id] : false;
    const courseError = course ? errors[course.id] : null;
    const isLoading = !course || isLessonsLoading;
    
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-page/55 dark:bg-page">
                <p className="text-muted">Loading lesson and course details...</p>
            </div>
        );
    }

    if (courseError) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-page/55 dark:bg-page p-6 text-center">
                <p className="text-red-500 font-medium">عذراً، حدث خطأ أثناء تحميل الدروس.</p>
                <p className="text-sm text-muted">{courseError}</p>
                <button 
                    onClick={loadLessons}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition"
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    if (!course || !lesson) {
        return <NotFound lessonID={lessonID} />;
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