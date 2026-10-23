import HomePage from "@/app/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/components/home/HomeHero", () => ({
  HomeHero: () => <div data-testid="home-hero">HomeHero Mock</div>,
}));

jest.mock("@/components/home/featured-courses", () => ({
  FeaturedCourses: () => <div data-testid="featured-courses">FeaturedCourses Mock</div>,
}));

jest.mock("@/components/home/testimonials", () => ({
  Testimonials: () => <div data-testid="testimonials">Testimonials Mock</div>,
}));

describe("HomePage", () => {
  it("renders all main sections correctly", () => {
    render(<HomePage />);

    const heroSection = screen.getByTestId("home-hero");
    const featuredCoursesSection = screen.getByTestId("featured-courses");
    const testimonialsSection = screen.getByTestId("testimonials");

    expect(heroSection).toBeInTheDocument();
    expect(featuredCoursesSection).toBeInTheDocument();
    expect(testimonialsSection).toBeInTheDocument();
  });
});