import { render, screen } from "@testing-library/react";
import { HeroBadge } from "@/components/home/hero/HeroBadge";

describe("HeroBadge", () => {
  it("renders its default badge text", () => {
    render(<HeroBadge />);
    expect(screen.getByText("YOUR FUTURE STARTS HERE")).toBeInTheDocument();
  });
});
