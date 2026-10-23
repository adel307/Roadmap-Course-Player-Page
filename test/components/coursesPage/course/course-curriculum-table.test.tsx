import { render, screen } from "@testing-library/react";
import { CourseCurriculumTable } from "@/components/coursesPage/course/course-curriculum-table";
import { testLesson } from "@/test/testData";

describe("CourseCurriculumTable", () => {
  it("sorts lessons into curriculum order and shows lesson links", () => {
    const laterLesson = { ...testLesson, id: "lesson-later", title: "Later", order: 2 };
    const { container } = render(
      <CourseCurriculumTable
        courseID="course-123"
        lessons={[laterLesson, testLesson]}
      />,
    );

    expect(screen.getByText("Testing fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Later")).toBeInTheDocument();
    expect(container.querySelector('a[href="/courses/course-123/lesson-test"]'))
      .toBeInTheDocument();
  });

  it("shows an empty state when no lessons are available", () => {
    render(<CourseCurriculumTable courseID="course-123" lessons={[]} />);
    expect(screen.getByText("Lessons coming soon")).toBeInTheDocument();
  });
});
