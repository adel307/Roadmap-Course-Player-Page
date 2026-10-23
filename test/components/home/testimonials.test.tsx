import { render, screen } from "@testing-library/react";
import { Testimonials } from "@/components/home/testimonials";

describe("Testimonials", () => {
  it("renders the testimonial section and its first testimonial", () => {
    render(<Testimonials />);
    expect(screen.getByRole("heading", { name: /learning that leads somewhere/i }))
      .toBeInTheDocument();
    expect(screen.getByText(/Ahmed Mahmoud/)).toBeInTheDocument();
  });
});
