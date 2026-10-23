import { Certificates, studentTestimonials } from "@/data/certificates";

describe("certificate and testimonial data", () => {
  it("provides certificates with verification fields", () => {
    expect(Certificates.length).toBeGreaterThan(0);
    expect(Certificates[0]).toEqual(
      expect.objectContaining({
        certificate_code: expect.any(String),
        course_id: expect.any(String),
        status: expect.stringMatching(/^(active|revoked|expired)$/),
      }),
    );
  });

  it("provides testimonials with display-ready content", () => {
    expect(studentTestimonials.length).toBeGreaterThan(0);
    expect(studentTestimonials[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        quote: expect.any(String),
        initials: expect.any(String),
      }),
    );
  });
});
