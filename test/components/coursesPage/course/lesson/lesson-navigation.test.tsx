import { render, screen } from "@testing-library/react";
import { LessonNavigation } from "@/components/coursesPage/course/lesson/lesson-navigation";
import { testCourse, testLesson } from "@/test/testData";

describe("LessonNavigation", () => {
  it("renders previous and next lesson links", () => {
    const previous = {
      ...testLesson,
      id: "previous",
      slug: null,
      title: "Previous lesson",
    };
    const next = { ...testLesson, id: "next", slug: "next-lesson", title: "Next lesson" };
    render(<LessonNavigation course={testCourse} prev={previous} next={next} />);

    expect(screen.getByText("Previous lesson")).toBeInTheDocument();
    expect(screen.getByText("Next lesson")).toBeInTheDocument();
    expect(document.querySelector(`a[href="/courses/${testCourse.id}/previous"]`))
      .toBeInTheDocument();
    expect(document.querySelector(`a[href="/courses/${testCourse.id}/next-lesson"]`))
      .toBeInTheDocument();
  });

  it("renders no navigation when there are no adjacent lessons", () => {
    const { container } = render(
      <LessonNavigation course={testCourse} prev={null} next={null} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
