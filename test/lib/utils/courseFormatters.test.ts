import {
  formatDuration,
  formatLevel,
  formatPrice,
} from "@/lib/utils/courseFormatters";
import { testCourse } from "@/test/testData";

describe("course formatters", () => {
  it.each([
    [0, "Flexible schedule"],
    [600, "10 min"],
    [3600, "1 hr"],
    [5400, "1 hr 30 min"],
  ])("formats %i seconds", (duration, expected) => {
    expect(formatDuration(duration)).toBe(expected);
  });

  it("handles invalid durations and course levels", () => {
    expect(formatDuration(Number.NaN)).toBe("Flexible schedule");
    expect(formatLevel()).toBe("All levels");
    expect(formatLevel("all_levels")).toBe("All levels");
    expect(formatLevel("intermediate")).toBe("Intermediate");
  });

  it("formats free, discounted, and invalid-discount prices", () => {
    expect(formatPrice({ ...testCourse, price: 0 })).toBe("Free");
    expect(
      formatPrice({ ...testCourse, price: 100, discount_price: 20 }),
    ).toBe("$80.00");
    expect(
      formatPrice({ ...testCourse, price: 100, discount_price: 100 }),
    ).toBe("Invalid discount");
  });
});
