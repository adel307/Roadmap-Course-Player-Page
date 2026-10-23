import { render, screen } from "@testing-library/react";
import { HeroDescription } from "@/components/home/hero/HeroDescription";

describe("HeroDescription", () => {
  it("renders the default hero description", () => {
    render(<HeroDescription />);
    expect(screen.getByText(/hands-on projects/i)).toBeInTheDocument();
  });
});
