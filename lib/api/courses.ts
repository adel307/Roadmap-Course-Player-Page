import { courses } from "@/data/courses";
import { Course } from "../types/course";

export const getCourses = (
): Course[] => {

  return courses;

};

export const getCourseById = (
  id: string
): Course | undefined => {
  return courses.find((course) => course.id === id);
};

export const createCourse = (
  allCourses: Course[],
  newCourseData: Omit<Course, "id" | "created_at" | "updated_at">
): Course[] => {
  const newCourse: Course = {
    ...newCourseData,
    id: crypto.randomUUID(), // توليد ID فريد
    created_at: new Date(),
    updated_at: new Date(),
  };

  return [...allCourses, newCourse];
};

export const updateCourse = (
  allCourses: Course[],
  id: string,
  updatedFields: Partial<Omit<Course, "id" | "created_at">>
): Course[] => {
  return allCourses.map((course) => {
    if (course.id === id) {
      return {
        ...course,
        ...updatedFields,
        updated_at: new Date().toISOString(),
      };
    }
    return course;
  });
};

export const deleteCourse = (
  allCourses: Course[],
  id: string
): Course[] => {
  return allCourses.filter((course) => course.id !== id);
};

export const searchCourses = (
  allCourses: Course[],
  query: string
): Course[] => {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return allCourses;

  return allCourses.filter((course) => {
    const titleMatch = course.title.toLowerCase().includes(cleanQuery);
    const descriptionMatch = course.description.toLowerCase().includes(cleanQuery);
    const metaMatch = course.meta_title ? course.meta_title.toLowerCase().includes(cleanQuery) : false;

    return titleMatch || descriptionMatch || metaMatch;
  });
};