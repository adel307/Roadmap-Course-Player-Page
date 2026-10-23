import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/app/not-found";

describe("NotFoundPage", () => {
  it("offers links back home and to the course catalog", () => {
    render(<NotFoundPage />);
    expect(screen.getByRole("heading", { name: /page took a wrong turn/i }))
      .toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to Home/ })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /Browse Courses/ })).toHaveAttribute(
      "href",
      "/courses",
    );
  });
});
