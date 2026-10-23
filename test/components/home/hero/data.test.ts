import { highlights, pillars, textHoverClass } from "@/components/home/hero/data";

describe("hero content data", () => {
  it("provides non-empty highlight and pillar content", () => {
    expect(highlights.length).toBeGreaterThan(0);
    expect(pillars).toHaveLength(3);
    expect(pillars.every((pillar) => pillar.title && pillar.description && pillar.icon))
      .toBe(true);
    expect(textHoverClass).toContain("hover:bg-brand");
  });
});
