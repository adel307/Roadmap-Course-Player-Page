import { render, screen } from "@testing-library/react";
import AllCoursesPage from "@/app/my-courses/page";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse } from "@/test/testData";

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));
jest.mock("@/components/MyCoursesPage/MyCoursesPage", () => ({
  MyCoursesPage: ({ myCourses }: { myCourses: Array<{ id: string }> }) => (
    <div data-testid="my-courses">{myCourses.map((course) => course.id).join(",")}</div>
  ),
}));

describe("My courses route", () => {
  it("passes only courses added to the user's list", () => {
    const store = {
      courses: [
        { ...testCourse, inMyCard: true },
        { ...testCourse, id: "not-saved", inMyCard: false },
      ],
    };
    (useCourseStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector(store),
    );

    render(<AllCoursesPage />);
    expect(screen.getByTestId("my-courses")).toHaveTextContent(testCourse.id);
    expect(screen.getByTestId("my-courses")).not.toHaveTextContent("not-saved");
  });
});
