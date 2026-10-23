import { render, screen } from "@testing-library/react";
import { MobileLaptopShowcase } from "@/components/home/hero/MobileLaptopShowcase";

jest.mock("@/components/home/laptop", () => ({
  __esModule: true,
  default: () => <div data-testid="laptop-app" />,
}));

describe("MobileLaptopShowcase", () => {
  it("renders the mobile laptop preview", () => {
    render(<MobileLaptopShowcase />);
    expect(screen.getByTestId("laptop-app")).toBeInTheDocument();
  });
});
