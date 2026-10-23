import { render, screen } from "@testing-library/react";
import { LessonComments } from "@/components/coursesPage/course/lesson/lesson-comments";
import { testCourse, testLesson } from "@/test/testData";

jest.mock("@/components/coursesPage/course/lesson/new-comment-form", () => ({
  CommentForm: () => <form aria-label="new comment form" />,
}));

describe("LessonComments", () => {
  it("shows an empty comments message", () => {
    render(
      <LessonComments course={testCourse} lesson={testLesson} comments={[]} />,
    );
    expect(screen.getByText("Comments (0)")).toBeInTheDocument();
    expect(screen.getByText(/No comments yet/)).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "new comment form" })).toBeInTheDocument();
  });

  it("renders submitted comments", () => {
    render(
      <LessonComments
        course={testCourse}
        lesson={testLesson}
        comments={[
          {
            id: "comment-1",
            user: "A Learner",
            comment: "Useful explanation",
            coursesId: testCourse.id,
          },
        ]}
      />,
    );
    expect(screen.getByText("Useful explanation")).toBeInTheDocument();
  });
});
