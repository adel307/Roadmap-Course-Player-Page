import { render, screen } from "@testing-library/react";
import { HeroCTAs } from "@/components/home/hero/HeroCTAs";

describe("HeroCTAs", () => {
  it("renders the primary calls to action", () => {
    render(<HeroCTAs />);
    expect(screen.getByRole("link", { name: /explore learning paths/i })).toHaveAttribute(
      "href",
      "/courses",
    );
  });
});
