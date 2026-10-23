import { render, screen } from "@testing-library/react";
import { CourseClientWrapper } from "@/components/coursesPage/course/CourseClientWrapper";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse, testLesson } from "@/test/testData";

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;

describe("CourseClientWrapper", () => {
  it("renders lessons from the store", () => {
    mockUseCourseStore.mockReturnValue({
      lessonsByCourse: { [testCourse.id]: [testLesson] },
      fetchLessonsForCourse: jest.fn(),
      loadingCourses: {},
      errors: {},
    });

    render(<CourseClientWrapper course={testCourse} />);
    expect(screen.getByText(`1. ${testLesson.title}`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(testLesson.title) })).toHaveAttribute(
      "href",
      `/courses/${testCourse.id}/${testLesson.id}`,
    );
  });

  it("shows the empty state when no lessons have loaded", () => {
    mockUseCourseStore.mockReturnValue({
      lessonsByCourse: { [testCourse.id]: [] },
      fetchLessonsForCourse: jest.fn(),
      loadingCourses: {},
      errors: {},
    });

    render(<CourseClientWrapper course={testCourse} />);
    expect(screen.getByText("No lessons are available yet.")).toBeInTheDocument();
  });
});
