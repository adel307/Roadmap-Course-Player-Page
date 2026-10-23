import { render } from "@testing-library/react";
import { CourseStoreInitializer } from "@/components/coursesPage/CourseStoreInitializer";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse } from "@/test/testData";

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;

describe("CourseStoreInitializer", () => {
  it("initializes the store with the existing course list", () => {
    const setCourses = jest.fn();
    mockUseCourseStore.mockImplementation((selector) =>
      selector({ courses: [testCourse], setCourses }),
    );

    const { container } = render(<CourseStoreInitializer />);
    expect(container.firstChild).toBeNull();
    expect(setCourses).toHaveBeenCalledWith([testCourse]);
  });
});
