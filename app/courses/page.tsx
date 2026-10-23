"use client";
import { useEffect } from "react";
import { CoursesPage } from "@/components/coursesPage/coursesPage";
import { courses as ServerCourses } from "@/data/courses";
import { useCourseStore } from "@/lib/store/useCourseStore";

export default function AllCoursesPage() {
    const {hasHydrated, setCourses} = useCourseStore((state) => state);
    const storedCourses = useCourseStore((state) => state.courses);

    useEffect(() => {
        if (hasHydrated && (!storedCourses || storedCourses.length === 0)) {
            setCourses(ServerCourses);
        }
    }, [hasHydrated, storedCourses, setCourses]);

    const shownCourses = (!hasHydrated || !storedCourses || storedCourses.length === 0) 
        ? ServerCourses 
        : storedCourses;

    if (!hasHydrated) {
        return <div>Loading...</div>;
    }

    return <CoursesPage shownCourses={shownCourses} />;
}