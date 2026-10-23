import { featuredCourseReviews, initialReviews } from "@/data/reviews";

describe("course review data", () => {
  it("provides initial reviews with valid ratings", () => {
    expect(initialReviews.length).toBeGreaterThan(0);
    expect(initialReviews.every((review) => review.rating >= 1 && review.rating <= 5))
      .toBe(true);
  });

  it("provides featured course reviews", () => {
    expect(featuredCourseReviews.length).toBeGreaterThan(0);
    expect(featuredCourseReviews[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        comment: expect.any(String),
        rating: expect.any(Number),
      }),
    );
  });
});
