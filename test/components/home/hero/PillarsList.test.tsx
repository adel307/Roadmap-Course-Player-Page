import { render, screen } from "@testing-library/react";
import { PillarsList } from "@/components/home/hero/PillarsList";

describe("PillarsList", () => {
  it("renders the learning pillars", () => {
    render(<PillarsList />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });
});
