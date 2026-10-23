import { fireEvent, render, screen } from "@testing-library/react";
import SavedLessonsPage from "@/app/lessons/saved/page";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse, testLesson } from "@/test/testData";

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;

function setStore(
  lessons: (typeof testLesson)[],
  toggleSavedLesson = jest.fn(),
) {
  mockUseCourseStore.mockImplementation((selector) =>
    selector({
      hasHydrated: true,
      courses: [testCourse],
      lessonsByCourse: { [testCourse.id]: lessons },
      toggleSavedLesson,
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

    fireEvent.change(
      screen.getByRole("searchbox", { name: "Search saved lessons" }),
      { target: { value: "no match" } },
    );
    expect(screen.getByText("No matching lessons")).toBeInTheDocument();
  });

  it("calls toggleSavedLesson when Remove is clicked", () => {
    const toggle = jest.fn();
    setStore([{ ...testLesson, isSaved: true }], toggle);
    render(<SavedLessonsPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: `Remove ${testLesson.title} from saved lessons`,
      }),
    );
    expect(toggle).toHaveBeenCalledWith(testCourse.id, testLesson.id);
  });
});