"use client";

import { useCourseStore } from "@/lib/store/useCourseStore";
import CourseDetailPageContent from "@/components/coursesPage/course/CourseContainer";
import { use } from "react";

type PageProps = {
    params: Promise<{ course: string }>;
};

export default function CourseContainer({ params }: PageProps) {
    const resolvedParams = use(params);
    const courseID = resolvedParams.course;
    
    const { courses } = useCourseStore((state) => state);

    const coursesFromStore = courses

    if (!coursesFromStore) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg font-medium text-red-500">Course not found in store.</p>
            </div>
        );
    }

    return <CourseDetailPageContent allCourses={coursesFromStore} courseID = {courseID}/>;
}