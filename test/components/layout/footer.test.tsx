import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

describe("Footer", () => {
  it("renders contact information and footer links", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: "Contact Us" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "All courses" })).toHaveAttribute(
      "href",
      "/courses",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/adel307",
    );
  });
});
