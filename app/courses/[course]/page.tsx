"use client";

import { use, useEffect } from "react";
import CourseDetailPageContent from "@/components/coursesPage/course/CourseContainer";
import { courses as ServerCourses } from "@/data/courses";
import { useCourseStore } from "@/lib/store/useCourseStore";

type PageProps = {
    params: Promise<{ course: string }>;
};

export default function CoursePage({ params }: PageProps) {
    const { course: courseID } = use(params);

    const storedCourses = useCourseStore((s) => s.courses);
    const setCourses = useCourseStore((s) => s.setCourses);

    useEffect(() => {
        if (storedCourses.length === 0) {
            setCourses(ServerCourses);
        }
    }, [storedCourses.length, setCourses]);

    const allCourses = storedCourses.length > 0 ? storedCourses : ServerCourses;
    const shownCourse =
        storedCourses.find((c) => c.id === courseID) ??
        ServerCourses.find((c) => c.id === courseID);

    if (!shownCourse) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg font-medium text-red-500">Course not found</p>
            </div>
        );
    }

    // 5) ابعت للكومبوننت اللي محتاجه
    const relatedCourses = allCourses
        .filter((c) => c.id !== shownCourse.id && c.level === shownCourse.level)
        .slice(0, 3);

    return (
        <CourseDetailPageContent
            relatedCourses={relatedCourses}
            shownCourse={shownCourse}
        />
    );
}