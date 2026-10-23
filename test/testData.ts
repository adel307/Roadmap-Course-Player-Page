import { courses } from "@/data/courses";
import type { Course } from "@/lib/types/course";
import type { Lesson } from "@/lib/types/lesson";

export const testCourse: Course = courses[0];

export const testLesson: Lesson = {
  id: "lesson-test",
  coursesId: testCourse.id,
  title: "Testing fundamentals",
  slug: "testing-fundamentals",
  description: "A lesson used by the component tests.",
  isSaved: false,
  videoProvider: "youtube",
  videoUrl: "https://www.youtube.com/watch?v=video123",
  thumbnail: "https://example.com/thumbnail.jpg",
  body: null,
  durationSeconds: 125,
  order: 1,
  isFreePreview: true,
  isPublished: true,
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-01T00:00:00Z"),
  deletedAt: null,
  comments: [],
};
