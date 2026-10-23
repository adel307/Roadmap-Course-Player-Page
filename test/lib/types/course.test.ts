import type { CourseLevel, CourseReview, CourseStatus } from "@/lib/types/course";
import { testCourse } from "@/test/testData";

describe("course types", () => {
  it("accepts the course data and review fields used by the application", () => {
    const status: CourseStatus = testCourse.status;
    const level: CourseLevel = testCourse.level;
    const review: CourseReview = {
      id: "review-1",
      name: "Learner",
      date: "2026-01-01",
      rating: 5,
      comment: "Clear and helpful.",
      avatarColor: "#ffffff",
    };

    expect(status).toBe("published");
    expect(level).toBe("beginner");
    expect(review.rating).toBe(5);
  });
});
