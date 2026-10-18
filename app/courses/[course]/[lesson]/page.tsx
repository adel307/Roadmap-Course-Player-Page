"use client";

import { use, useEffect } from "react";
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
    
    const { courses, setCourses, lessonsByCourse, loadingCourses, fetchLessonsForCourse } = useCourseStore((state) => state);

    useEffect(() => {
        if (courses.length === 0 && dataCourses.length > 0) {
            setCourses(dataCourses);
        }
    }, [courses, setCourses]);

    const activeCourses = courses.length > 0 ? courses : dataCourses;
    const course = activeCourses.find((c) => c.id.toString() === courseID );

    useEffect(() => {
        if (course && !lessonsByCourse[course.id] && !loadingCourses[course.id]) {
            fetchLessonsForCourse(
                course.id,
                getPlaylistId(course.promo_video_url) as string,
                async (courseId, playlistUrl) => {
                    const response = await fetchLessons(courseId, playlistUrl);
                    return response.lessons;
                }
            );
        }
    }, [course, lessonsByCourse, loadingCourses, fetchLessonsForCourse]);

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
    const isLoading = !course || isLessonsLoading;
    
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f9fb]">
                <p className="text-muted">جاري تحميل بيانات الدرس والكورس...</p>
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