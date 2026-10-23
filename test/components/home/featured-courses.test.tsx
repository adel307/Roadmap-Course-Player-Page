import { render, screen } from "@testing-library/react";
import { FeaturedCourses } from "@/components/home/featured-courses";
import { featuredCourses } from "@/data/courses";

describe("FeaturedCourses", () => {
  it("renders featured course titles", () => {
    render(<FeaturedCourses />);
    expect(screen.getByText(featuredCourses[0].title)).toBeInTheDocument();
  });
});
