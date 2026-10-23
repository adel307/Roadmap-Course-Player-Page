import { fireEvent, render, screen } from "@testing-library/react";
import { CommentForm } from "@/components/coursesPage/course/lesson/new-comment-form";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse, testLesson } from "@/test/testData";

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));

const mockUseCourseStore = useCourseStore as unknown as jest.Mock;

describe("CommentForm", () => {
  it("submits a non-empty comment to the course store", () => {
    const updateLesson = jest.fn();
    mockUseCourseStore.mockImplementation((selector) => selector({ updateLesson }));
    render(<CommentForm course={testCourse} lesson={testLesson} />);

    const input = screen.getByPlaceholderText("Share your thoughts or ask a question...");
    fireEvent.change(input, { target: { value: "  Helpful lesson!  " } });
    fireEvent.click(screen.getByRole("button", { name: "Post" }));

    expect(updateLesson).toHaveBeenCalledWith(
      testCourse.id,
      testLesson.id,
      expect.objectContaining({
        comments: [
          expect.objectContaining({
            user: "Current User",
            comment: "Helpful lesson!",
            coursesId: testCourse.id,
          }),
        ],
      }),
    );
  });
});
