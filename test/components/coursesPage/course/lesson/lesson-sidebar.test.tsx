import { render, screen } from "@testing-library/react";
import { LessonSidebar } from "@/components/coursesPage/course/lesson/lesson-sidebar";
import { testCourse, testLesson } from "@/test/testData";

describe("LessonSidebar", () => {
  it("highlights the current lesson and displays the course summary", () => {
    render(
      <LessonSidebar
        course={testCourse}
        lessons={[testLesson]}
        currentLessonId={testLesson.id}
      />,
    );

    expect(screen.getByText(testCourse.title)).toBeInTheDocument();
    expect(screen.getByText(testLesson.title).closest("a")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("shows an empty state when the course has no lessons", () => {
    render(<LessonSidebar course={testCourse} lessons={[]} currentLessonId="" />);
    expect(screen.getByText("No lessons available yet.")).toBeInTheDocument();
  });
});
