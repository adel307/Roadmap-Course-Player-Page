import { render, screen } from "@testing-library/react";
import { MyCoursesPage } from "@/components/MyCoursesPage/MyCoursesPage";
import { testCourse } from "@/test/testData";

describe("MyCoursesPage", () => {
  it("renders saved courses", () => {
    render(<MyCoursesPage myCourses={[testCourse]} />);
    expect(screen.getByText(testCourse.title)).toBeInTheDocument();
  });

  it("shows an empty state when there are no saved courses", () => {
    render(<MyCoursesPage myCourses={[]} />);
    expect(screen.getByText("No courses found")).toBeInTheDocument();
  });
});
