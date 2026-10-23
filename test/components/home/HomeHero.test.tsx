import { render, screen } from "@testing-library/react";
import { HomeHero } from "@/components/home/HomeHero";

jest.mock("@/components/home/hero/HeroBackground", () => ({
  HeroBackground: () => <div data-testid="hero-background" />,
}));
jest.mock("@/components/home/hero/DesktopHero", () => ({
  DesktopHero: () => <div data-testid="desktop-hero" />,
}));
jest.mock("@/components/home/hero/MobileHero", () => ({
  MobileHero: () => <div data-testid="mobile-hero" />,
}));

describe("HomeHero", () => {
  it("renders the shared background and responsive hero variants", () => {
    render(<HomeHero />);
    expect(screen.getByTestId("hero-background")).toBeInTheDocument();
    expect(screen.getByTestId("desktop-hero")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-hero")).toBeInTheDocument();
  });
});
