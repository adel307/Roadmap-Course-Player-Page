import { render, screen } from "@testing-library/react";
import { CourseThumbnailPlaceholder } from "@/components/coursesPage/CourseThumbnailPlaceholder";

describe("CourseThumbnailPlaceholder", () => {
  it("shows a course preview placeholder", () => {
    render(<CourseThumbnailPlaceholder level="beginner" />);
    expect(screen.getByText("Course preview")).toBeInTheDocument();
  });

  it("supports every course level", () => {
    for (const level of ["beginner", "intermediate", "advanced", "all_levels"] as const) {
      expect(() =>
        render(<CourseThumbnailPlaceholder level={level} />),
      ).not.toThrow();
    }
  });
});
