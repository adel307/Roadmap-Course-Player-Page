import type { Comments, Lesson, LessonDetailContentProps } from "@/lib/types/lesson";
import { testCourse, testLesson } from "@/test/testData";

describe("lesson types", () => {
  it("accepts lesson, comment, and lesson-detail page data", () => {
    const comment: Comments = {
      id: "comment-1",
      user: "Learner",
      comment: "Helpful.",
      courseId: testCourse.id,
    };
    const lesson: Lesson = { ...testLesson, comments: [comment] };
    const pageProps: LessonDetailContentProps = {
      course: testCourse,
      lesson,
      courseLessons: [lesson],
      prev: null,
      next: null,
      related: [],
    };

    expect(pageProps.courseLessons[0].comments[0].comment).toBe("Helpful.");
  });
});
