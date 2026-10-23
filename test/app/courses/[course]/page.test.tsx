import { render, screen } from "@testing-library/react";
import CoursePage from "@/app/courses/[course]/page";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse } from "@/test/testData";

jest.mock("react", () => {
  const actualReact = jest.requireActual<typeof import("react")>("react");
  return {
    ...actualReact,
    use: (params: { resolvedParams: { course: string } }) => params.resolvedParams,
  };
});
jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));
jest.mock("@/components/coursesPage/course/CourseContainer", () => ({
  __esModule: true,
  default: ({ shownCourse }: { shownCourse: { id: string } }) => (
    <div data-testid="course-content">{shownCourse.id}</div>
  ),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;

function renderCoursePage(courseId: string, courses = [testCourse]) {
  const state = { courses, setCourses: jest.fn() };
  mockUseCourseStore.mockImplementation((selector) => selector(state));
  const params = Object.assign(Promise.resolve({ course: courseId }), {
    resolvedParams: { course: courseId },
  });
  return render(<CoursePage params={params} />);
}

describe("CoursePage route", () => {
  it("renders the requested course", () => {
    renderCoursePage(testCourse.id);
    expect(screen.getByTestId("course-content")).toHaveTextContent(testCourse.id);
  });

  it("shows a not-found message for an unknown course", () => {
    renderCoursePage("missing-course", []);
    expect(screen.getByText("Course not found")).toBeInTheDocument();
  });
});
