import { fireEvent, render, screen } from "@testing-library/react";
import NotFound from "@/app/courses/[course]/[lesson]/notFound";

const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
}));

describe("LessonNotFound", () => {
  beforeEach(() => jest.clearAllMocks());

  it("shows the missing lesson and returns to its course", () => {
    render(
      <NotFound
        courseID="course-1"
        lessonID="missing-lesson"
        reason="lesson-not-found"
      />,
    );
    expect(screen.getByText(/الدرس غير موجود/)).toBeInTheDocument();
    expect(screen.getByText("missing-lesson")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "العودة إلى الكورس" })).toHaveAttribute(
      "href",
      "/courses/course-1",
    );
  });

  it("uses the courses list when no course ID is provided", () => {
    render(<NotFound reason="course-not-found" />);
    expect(screen.getByRole("link", { name: "تصفح الكورسات" })).toHaveAttribute(
      "href",
      "/courses",
    );
    fireEvent.click(screen.getByRole("button", { name: "رجوع" }));
    expect(mockBack).toHaveBeenCalled();
  });
});
