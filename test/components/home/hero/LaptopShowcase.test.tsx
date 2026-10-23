import { render, screen } from "@testing-library/react";
import { LaptopShowcase } from "@/components/home/hero/LaptopShowcase";

jest.mock("@/components/home/laptop", () => ({
  __esModule: true,
  default: () => <div data-testid="laptop-app" />,
}));

describe("LaptopShowcase", () => {
  it("renders the laptop preview", () => {
    render(<LaptopShowcase />);
    expect(screen.getByTestId("laptop-app")).toBeInTheDocument();
  });
});
