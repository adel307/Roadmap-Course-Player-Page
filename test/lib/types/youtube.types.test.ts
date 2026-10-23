import type {
  YouTubePlaylistItem,
  YouTubePlaylistItemResponse,
} from "@/lib/types/youtube.types";

describe("YouTube response types", () => {
  it("accepts playlist items and playlist list responses", () => {
    const item: YouTubePlaylistItem = {
      snippet: { title: "Lesson" },
    };
    const response: YouTubePlaylistItemResponse = {
      items: [item],
    };

    expect(response.items?.[0].snippet?.title).toBe("Lesson");
  });
});
