import { render, screen } from "@testing-library/react";
import { DesktopHero } from "@/components/home/hero/DesktopHero";

jest.mock("@/components/home/hero/LaptopShowcase", () => ({
  LaptopShowcase: () => <div data-testid="laptop-showcase" />,
}));

describe("DesktopHero", () => {
  it("renders the desktop hero content and showcase", () => {
    render(<DesktopHero />);
    expect(screen.getByTestId("laptop-showcase")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
