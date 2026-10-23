import { render, screen } from "@testing-library/react";
import { TestimonialsGrid } from "@/components/home/TestimonialsGrid";
import { studentTestimonials } from "@/data/certificates";

describe("TestimonialsGrid", () => {
  it("renders each testimonial and its author", () => {
    render(<TestimonialsGrid testimonials={studentTestimonials.slice(0, 2)} />);
    expect(screen.getByText(new RegExp(studentTestimonials[0].quote.slice(0, 35))))
      .toBeInTheDocument();
    expect(screen.getByText(studentTestimonials[1].name)).toBeInTheDocument();
    expect(screen.getAllByLabelText("5 out of 5 stars")).toHaveLength(2);
  });
});
