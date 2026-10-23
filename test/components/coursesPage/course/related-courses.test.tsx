import { render, screen } from "@testing-library/react";
import { RelatedCourses } from "@/components/coursesPage/course/related-courses";
import { courses } from "@/data/courses";

describe("RelatedCourses", () => {
  it("renders related course cards with a customizable heading", () => {
    render(<RelatedCourses courses={[courses[0]]} title="Recommended courses" />);
    expect(screen.getByRole("heading", { name: "Recommended courses" })).toBeInTheDocument();
    expect(screen.getByText(courses[0].title)).toBeInTheDocument();
  });

  it("renders nothing when no related courses exist", () => {
    const { container } = render(<RelatedCourses courses={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
