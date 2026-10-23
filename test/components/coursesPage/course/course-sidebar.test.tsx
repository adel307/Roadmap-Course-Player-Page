import { fireEvent, render, screen } from "@testing-library/react";
import { CourseSidebar } from "@/components/coursesPage/course/course-sidebar";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse } from "@/test/testData";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;

describe("CourseSidebar", () => {
  it("shows the course price and updates the cart state", () => {
    const updateCourse = jest.fn();
    mockUseCourseStore.mockImplementation((selector) =>
      selector({ lessonsByCourse: {}, updateCourse }),
    );
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<CourseSidebar course={testCourse} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(updateCourse).toHaveBeenCalledWith(testCourse.id, { inMyCard: true });
    expect(alertMock).toHaveBeenCalledWith("Course added to your courses.");
    alertMock.mockRestore();
  });
});
