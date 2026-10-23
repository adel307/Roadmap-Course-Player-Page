import { render, screen } from "@testing-library/react";
import { MobileHero } from "@/components/home/hero/MobileHero";

jest.mock("@/components/home/hero/MobileLaptopShowcase", () => ({
  MobileLaptopShowcase: () => <div data-testid="mobile-laptop-showcase" />,
}));

describe("MobileHero", () => {
  it("renders mobile content and the mobile showcase", () => {
    render(<MobileHero />);
    expect(screen.getByTestId("mobile-laptop-showcase")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
