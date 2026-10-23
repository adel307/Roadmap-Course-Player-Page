import { getYouTubeClient } from "@/lib/youtube";

describe("getYouTubeClient", () => {
  const originalApiKey = process.env.YOUTUBE_API_KEY;

  afterEach(() => {
    if (originalApiKey === undefined) {
      delete process.env.YOUTUBE_API_KEY;
    } else {
      process.env.YOUTUBE_API_KEY = originalApiKey;
    }
  });

  it("fails explicitly when the YouTube API key is missing", () => {
    delete process.env.YOUTUBE_API_KEY;
    expect(() => getYouTubeClient()).toThrow(
      "YOUTUBE_API_KEY is missing from the environment.",
    );
  });
});
