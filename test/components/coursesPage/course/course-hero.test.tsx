import { render, screen } from "@testing-library/react";
import { CourseHero } from "@/components/coursesPage/course/course-hero";
import { testCourse } from "@/test/testData";

describe("CourseHero", () => {
  it("renders course title, description, and course level", () => {
    render(<CourseHero course={testCourse} level="Popular" />);

    expect(screen.getByRole("heading", { name: testCourse.title })).toBeInTheDocument();
    expect(screen.getByText(testCourse.description)).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Arabic")).toBeInTheDocument();
  });
});
