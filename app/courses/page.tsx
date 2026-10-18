"use client";
import { CoursesPage } from "@/components/coursesPage/coursesPage";
import { useCourseStore } from "@/lib/store/useCourseStore";

export default function AllCoursesPage() {
    const mainCourses = useCourseStore((state) => state.courses);
    return <CoursesPage courses = {mainCourses} />;
}