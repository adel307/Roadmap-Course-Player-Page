import { render, screen } from "@testing-library/react";
import CourseDetailPageContent from "@/components/coursesPage/course/CourseContainer";
import { testCourse } from "@/test/testData";

jest.mock("@/components/coursesPage/course/course-promo-player", () => ({
  CoursePromoPlayer: () => <div data-testid="promo-player" />,
}));
jest.mock("@/components/coursesPage/course/what_will_learn", () => ({
  WhatYouWillLearn: () => <div data-testid="learning-outcomes" />,
}));
jest.mock("@/components/coursesPage/course/course-sidebar", () => ({
  CourseSidebar: () => <div data-testid="course-sidebar" />,
}));
jest.mock("@/components/coursesPage/course/course-hero", () => ({
  CourseHero: () => <div data-testid="course-hero" />,
}));
jest.mock("@/components/coursesPage/course/related-courses", () => ({
  RelatedCourses: () => <div data-testid="related-courses" />,
}));
jest.mock("@/components/coursesPage/course/CourseClientWrapper", () => ({
  CourseClientWrapper: () => <div data-testid="course-client" />,
}));

describe("CourseDetailPageContent", () => {
  it("composes the course detail sections and requirements", () => {
    render(
      <CourseDetailPageContent shownCourse={testCourse} relatedCourses={[]} />,
    );
    expect(screen.getByTestId("course-hero")).toBeInTheDocument();
    expect(screen.getByTestId("promo-player")).toBeInTheDocument();
    expect(screen.getByTestId("learning-outcomes")).toBeInTheDocument();
    expect(screen.getByTestId("course-sidebar")).toBeInTheDocument();
    expect(screen.getByText("Requirements")).toBeInTheDocument();
  });
});
