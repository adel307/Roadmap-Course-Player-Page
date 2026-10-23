import { render, screen } from "@testing-library/react";
import { WhatYouWillLearn } from "@/components/coursesPage/course/what_will_learn";
import { testCourse } from "@/test/testData";

describe("WhatYouWillLearn", () => {
  it("renders the course learning outcomes", () => {
    render(<WhatYouWillLearn course={testCourse} />);

    expect(screen.getByRole("heading", { name: "What you'll learn" })).toBeInTheDocument();
    expect(screen.getByText(testCourse.what_will_learn[0])).toBeInTheDocument();
  });

  it("renders nothing when the course has no outcomes", () => {
    const { container } = render(
      <WhatYouWillLearn course={{ ...testCourse, what_will_learn: [] }} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
