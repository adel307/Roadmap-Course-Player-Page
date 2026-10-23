import { fireEvent, render, screen } from "@testing-library/react";
import { LessonHeader } from "@/components/coursesPage/course/lesson/lesson-header";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse, testLesson } from "@/test/testData";

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;
const toggleSavedLesson = jest.fn();

describe("LessonHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCourseStore.mockImplementation((selector) =>
      selector({ savedLessonsIds: [], toggleSavedLesson }),
    );
  });

  it("renders lesson details and toggles the saved state", () => {
    render(<LessonHeader course={testCourse} lesson={testLesson} />);

    expect(screen.getByRole("heading", { name: testLesson.title })).toBeInTheDocument();
    expect(screen.getByText("Free Preview")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Save lesson" }));
    expect(toggleSavedLesson).toHaveBeenCalledWith(testCourse.id, testLesson.id);
  });

  it("reflects when the lesson is already saved", () => {
    mockUseCourseStore.mockImplementation((selector) =>
      selector({
        savedLessonsIds: [testLesson.id],
        toggleSavedLesson,
      }),
    );

    render(<LessonHeader course={testCourse} lesson={testLesson} />);
    expect(screen.getByRole("button", { name: "Saved" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
