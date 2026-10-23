import { fireEvent, render, screen } from "@testing-library/react";
import { CoursePromoPlayer } from "@/components/coursesPage/course/course-promo-player";

describe("CoursePromoPlayer", () => {
  it("starts a YouTube preview using a privacy-enhanced embed", () => {
    render(
      <CoursePromoPlayer
        title="Course preview"
        videoUrl="https://www.youtube.com/watch?v=video-123"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Play preview video" }));
    expect(screen.getByTitle("Course preview - preview")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/video-123?autoplay=1&rel=0",
    );
  });

  it("shows a fallback when there is no video URL", () => {
    render(<CoursePromoPlayer title="Course preview" />);
    expect(screen.getByText("No preview video yet")).toBeInTheDocument();
  });
});
