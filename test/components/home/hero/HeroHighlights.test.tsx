import { render, screen } from "@testing-library/react";
import { HeroHighlights } from "@/components/home/hero/HeroHighlights";
import { highlights } from "@/components/home/hero/data";

describe("HeroHighlights", () => {
  it("renders the configured hero highlights", () => {
    render(<HeroHighlights />);
    expect(screen.getByText(highlights[0])).toBeInTheDocument();
  });
});
