import { render } from "@testing-library/react";
import { HeroBackground } from "@/components/home/hero/HeroBackground";

describe("HeroBackground", () => {
  it("renders the decorative background", () => {
    const { container } = render(<HeroBackground />);
    expect(container.firstChild).not.toBeNull();
  });
});
