import type {
  Certificate,
  CertificateStatus,
  StudentTestimonial,
} from "@/lib/types/certificate";

describe("certificate types", () => {
  it("accepts certificate statuses and student testimonial data", () => {
    const status: CertificateStatus = "active";
    const certificate: Certificate = {
      id: "certificate-1",
      certificate_code: "CERT-1",
      user_id: "user-1",
      course_id: "course-1",
      issued_at: "2026-01-01",
      pdf_url: "https://example.com/certificate.pdf",
      student_name_on_cert: "Learner",
      course_title_on_cert: "Course",
      status,
    };
    const testimonial: StudentTestimonial = {
      id: "student-1",
      name: "Learner",
      role: "Developer",
      learningPath: "Frontend",
      quote: "I learned a lot.",
      initials: "L",
      avatarColor: "#ffffff",
    };

    expect(certificate.status).toBe("active");
    expect(testimonial.name).toBe("Learner");
  });
});
