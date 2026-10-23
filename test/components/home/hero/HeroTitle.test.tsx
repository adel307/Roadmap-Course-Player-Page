import { render, screen } from "@testing-library/react";
import { HeroTitle } from "@/components/home/hero/HeroTitle";

describe("HeroTitle", () => {
  it("renders the page hero heading", () => {
    render(<HeroTitle />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
