import { parseISODuration } from "@/lib/duration";

describe("parseISODuration", () => {
  it.each([
    ["PT1H2M3S", 3723],
    ["PT12M5S", 725],
    ["PT45S", 45],
    ["PT2H", 7200],
  ])("parses %s into seconds", (duration, expected) => {
    expect(parseISODuration(duration)).toBe(expected);
  });

  it("returns zero for a string that does not match an ISO duration", () => {
    expect(parseISODuration("invalid")).toBe(0);
  });
});
