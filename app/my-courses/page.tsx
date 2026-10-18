'use client';
import { MyCoursesPage } from "@/components/MyCoursesPage/MyCoursesPage";
import { useCourseStore } from "../../lib/store/useCourseStore";
import { Course } from "@/lib/types/course";
  
export default function AllCoursesPage() {
    const { courses } = useCourseStore((state) => state);

    const myCourses: Course[] = courses.filter((c)=>{
        return c.inMyCard
    })

    return <MyCoursesPage myCourses = {myCourses}/>;
}
