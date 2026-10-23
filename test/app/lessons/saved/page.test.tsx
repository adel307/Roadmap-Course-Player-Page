import { fireEvent, render, screen } from "@testing-library/react";
import SavedLessonsPage from "@/app/lessons/saved/page";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse, testLesson } from "@/test/testData";

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;

function setStore(lessons: typeof testLesson[]) {
  mockUseCourseStore.mockImplementation((selector) =>
    selector({
      getAllLessons: () => lessons,
      getCourseById: (courseId: string) =>
        courseId === testCourse.id ? testCourse : undefined,
      toggleSavedLesson: jest.fn(),
    }),
  );
}

describe("SavedLessonsPage", () => {
  it("shows the empty collection state when no lessons are saved", () => {
    setStore([]);
    render(<SavedLessonsPage />);
    expect(screen.getByText("Your saved list starts here")).toBeInTheDocument();
  });

  it("filters saved published lessons by the search query", () => {
    setStore([{ ...testLesson, isSaved: true }]);
    render(<SavedLessonsPage />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search saved lessons" }), {
      target: { value: "no match" },
    });
    expect(screen.getByText("No matching lessons")).toBeInTheDocument();
  });
});
