"use client";

import { useEffect } from "react";
import { useCourseStore } from "@/lib/store/useCourseStore";

export function CourseStoreInitializer() {
  const {setCourses, courses} = useCourseStore((state) => state);

  useEffect(() => {
    if (courses && courses.length > 0) {
      setCourses(courses);
    }
  }, [courses, setCourses]);

  return null;
}