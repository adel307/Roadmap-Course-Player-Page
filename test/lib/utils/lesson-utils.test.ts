import {
  formatDuration,
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
} from "@/lib/utils/lesson-utils";

describe("lesson utilities", () => {
  describe("formatDuration", () => {
    it.each([
      [0, "0s"],
      [65, "1m 5s"],
      [3600, "1h 0m"],
      [3661, "1h 1m"],
    ])("formats %i seconds", (duration, expected) => {
      expect(formatDuration(duration)).toBe(expected);
    });
  });

  describe("YouTube URL helpers", () => {
    it.each([
      ["https://www.youtube.com/watch?v=abc123", "abc123"],
      ["https://youtu.be/abc123", "abc123"],
      ["https://www.youtube.com/shorts/abc123", "abc123"],
      ["https://www.youtube.com/embed/abc123?start=10", "abc123"],
    ])("converts %s to an embed URL", (url, videoId) => {
      expect(getYouTubeEmbedUrl(url)).toBe(
        `https://www.youtube.com/embed/${videoId}`,
      );
    });

    it("returns null for malformed or unsupported URLs", () => {
      expect(getYouTubeEmbedUrl("not a URL")).toBeNull();
      expect(getYouTubeEmbedUrl("https://vimeo.com/123")).toBeNull();
    });

    it("returns the max-resolution thumbnail for a valid URL", () => {
      expect(getYouTubeThumbnail("https://youtu.be/abc123")).toBe(
        "https://img.youtube.com/vi/abc123/maxresdefault.jpg",
      );
    });

    it("returns null when a thumbnail URL cannot be resolved", () => {
      expect(getYouTubeThumbnail("invalid")).toBeNull();
    });
  });
});
