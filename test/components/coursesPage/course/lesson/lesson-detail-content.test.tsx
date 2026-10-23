import { render, screen } from "@testing-library/react";
import LessonDetailContent from "@/components/coursesPage/course/lesson/lesson-detail-content";
import { testCourse, testLesson } from "@/test/testData";

jest.mock("@/components/coursesPage/course/course-promo-player", () => ({
  CoursePromoPlayer: () => <div data-testid="promo-player" />,
}));
jest.mock("@/components/coursesPage/course/lesson/lesson-header", () => ({
  LessonHeader: () => <div data-testid="lesson-header" />,
}));
jest.mock("@/components/coursesPage/course/lesson/lesson-sidebar", () => ({
  LessonSidebar: () => <div data-testid="lesson-sidebar" />,
}));
jest.mock("@/components/coursesPage/course/lesson/lesson-navigation", () => ({
  LessonNavigation: () => <div data-testid="lesson-navigation" />,
}));
jest.mock("@/components/coursesPage/course/related-courses", () => ({
  RelatedCourses: () => <div data-testid="related-courses" />,
}));
jest.mock("@/components/coursesPage/course/lesson/lesson-comments", () => ({
  LessonComments: () => <div data-testid="lesson-comments" />,
}));

describe("LessonDetailContent", () => {
  it("renders the lesson player and supporting sections", () => {
    render(
      <LessonDetailContent
        course={testCourse}
        lesson={testLesson}
        courseLessons={[testLesson]}
        prev={null}
        next={null}
        related={[]}
      />,
    );
    expect(screen.getByTestId("lesson-header")).toBeInTheDocument();
    expect(screen.getByTestId("promo-player")).toBeInTheDocument();
    expect(screen.getByTestId("lesson-comments")).toBeInTheDocument();
    expect(screen.getByText("About this lesson")).toBeInTheDocument();
  });

  it("shows a loading message when no lesson is available", () => {
    render(
      <LessonDetailContent
        course={testCourse}
        lesson={null}
        courseLessons={[]}
        prev={null}
        next={null}
        related={[]}
      />,
    );
    expect(screen.getByText("Loading lesson details...")).toBeInTheDocument();
  });
});
