import { render, screen } from "@testing-library/react";
import { StarRating } from "@/components/coursesPage/course/star-rating";

describe("StarRating", () => {
  it("announces the rating and renders five stars", () => {
    render(<StarRating rating={4} />);
    expect(screen.getByLabelText("4 out of 5 stars")).toBeInTheDocument();
    expect(screen.getByLabelText("4 out of 5 stars").children).toHaveLength(5);
  });
});
