import { courses, featuredCourses } from "@/data/courses";

describe("course seed data", () => {
  it("contains usable courses with unique IDs and required content", () => {
    expect(courses.length).toBeGreaterThan(0);
    expect(new Set(courses.map((course) => course.id)).size).toBe(courses.length);
    expect(courses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          description: expect.any(String),
          requirements: expect.any(Array),
          what_will_learn: expect.any(Array),
        }),
      ]),
    );
  });

  it("filters featured courses from the complete catalog", () => {
    expect(featuredCourses).toEqual(courses.filter((course) => course.isFeatured));
    expect(featuredCourses.every((course) => course.isFeatured)).toBe(true);
  });
});
