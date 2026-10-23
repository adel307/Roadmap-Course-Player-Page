import { render, screen } from "@testing-library/react";
import { NextChapterCard } from "@/components/home/hero/NextChapterCard";

describe("NextChapterCard", () => {
  it("renders the next chapter callout", () => {
    render(<NextChapterCard />);
    expect(screen.getByText(/next chapter/i)).toBeInTheDocument();
  });
});
