import { render, screen } from "@testing-library/react";
import AllCoursesPage from "@/app/courses/page";
import { useCourseStore } from "@/lib/store/useCourseStore";

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));
jest.mock("@/components/coursesPage/coursesPage", () => ({
  CoursesPage: ({ shownCourses }: { shownCourses: Array<{ id: string }> }) => (
    <div data-testid="courses-page">{shownCourses.map((course) => course.id).join(",")}</div>
  ),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;

describe("AllCoursesPage route", () => {
  it("shows a loader while store hydration is incomplete", () => {
    mockUseCourseStore.mockImplementation((selector) =>
      selector({ hasHydrated: false, courses: [], setCourses: jest.fn() }),
    );
    render(<AllCoursesPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the catalog after mounting", async () => {
    mockUseCourseStore.mockImplementation((selector) =>
      selector({ hasHydrated: true, courses: [], setCourses: jest.fn() }),
    );
    render(<AllCoursesPage />);
    expect(await screen.findByTestId("courses-page")).toBeInTheDocument();
  });
});
