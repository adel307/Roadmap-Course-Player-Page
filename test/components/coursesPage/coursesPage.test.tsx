import { render, screen } from "@testing-library/react";
import { CoursesPage } from "@/components/coursesPage/coursesPage";
import { testCourse } from "@/test/testData";

describe("CoursesPage", () => {
  it("renders the course catalog and count", () => {
    render(<CoursesPage shownCourses={[testCourse]} />);
    expect(screen.getByRole("heading", { name: "Explore all courses" })).toBeInTheDocument();
    expect(screen.getByText("course available")).toBeInTheDocument();
    expect(screen.getByText(testCourse.title)).toBeInTheDocument();
  });

  it("shows an empty state without courses", () => {
    render(<CoursesPage shownCourses={[]} />);
    expect(screen.getByText("No courses found")).toBeInTheDocument();
  });
});
