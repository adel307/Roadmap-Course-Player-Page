import { Lessons } from "@/data/lessons";
import { Lesson } from "../types/lesson";

export const getLessons = (
): Lesson[] => {
  return Lessons;
};

export const getLessonById = (
    id: string
): Lesson | undefined => {
    return Lessons.find((Lesson) => Lesson.id === id);
};

export async function getLessonBySlug(
    courseId: string,
    lessonSlug: string
): Promise<Lesson | null> {
    const lesson = Lessons.find(
        (l) =>
            l.coursesId === courseId &&
            l.slug === lessonSlug &&
            l.isPublished &&
            !l.deletedAt
    );
    return lesson ?? null;
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
    return Lessons.filter(
        (l) => l.coursesId === courseId && l.isPublished && !l.deletedAt
    ).sort((a, b) => a.order - b.order);
}

export async function getAdjacentLessons(
    courseId: string,
    currentOrder: number
): Promise<{ prev: Lesson | null; next: Lesson | null }> {
    const courseLessons = await getLessonsByCourse(courseId);
    const currentIndex = courseLessons.findIndex((l) => l.order === currentOrder);

    return {
        prev: currentIndex > 0 ? courseLessons[currentIndex - 1] : null,
        next:
            currentIndex < courseLessons.length - 1
                ? courseLessons[currentIndex + 1]
                : null,
    };
}

export const createLesson = (
    allLessons: Lesson[],
    newLessonData: Omit<Lesson, "id" | "createdAt" | "updatedAt">
): Lesson[] => {
    const newLesson: Lesson = {
        ...newLessonData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    return [...allLessons, newLesson];
};

export const updateLesson = (
    allLessons: Lesson[],
    id: string,
    updatedFields: Partial<Omit<Lesson, "id" | "createdAt">>
): Lesson[] => {
    return allLessons.map((lesson) => {
        if (lesson.id === id) {
            return {
                ...lesson,
                ...updatedFields,
                updated_at: new Date().toISOString(),
            };
        }
        return lesson;
    });
};

export const deleteLesson = (
    allLessons: Lesson[],
    id: string
): Lesson[] => {
    return allLessons.filter((lesson) => lesson.id !== id);
};