import { render, screen } from "@testing-library/react";
import { CourseCard } from "@/components/coursesPage/CourseCard";
import { testCourse } from "@/test/testData";

describe("CourseCard", () => {
  it("renders course details, price, and its course link", () => {
    render(<CourseCard shownCourse={testCourse} />);
    expect(screen.getByRole("link", { name: `View ${testCourse.title}` })).toHaveAttribute(
      "href",
      `/courses/${testCourse.id}`,
    );
    expect(screen.getByText(testCourse.title)).toBeInTheDocument();
    expect(screen.getAllByText("Free")).toHaveLength(2);
  });

  it("uses the level placeholder when no thumbnail is provided", () => {
    render(<CourseCard shownCourse={{ ...testCourse, thumbnail_url: "" }} />);
    expect(screen.getByText("Course preview")).toBeInTheDocument();
  });
});
