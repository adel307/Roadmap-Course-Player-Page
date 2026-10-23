import { getPlaylistId } from "@/lib/getPlaylistId";

describe("getPlaylistId", () => {
  it("extracts a playlist ID from a YouTube URL", () => {
    expect(
      getPlaylistId("https://www.youtube.com/watch?v=video123&list=playlist456"),
    ).toBe("playlist456");
  });

  it.each([undefined, null, ""])("rejects a missing URL (%s)", (url) => {
    expect(() => getPlaylistId(url)).toThrow("No url found");
  });

  it("rejects a URL without a playlist parameter", () => {
    expect(() => getPlaylistId("https://www.youtube.com/watch?v=video123")).toThrow(
      "can not find PlaylistId",
    );
  });

  it("propagates invalid URL errors", () => {
    expect(() => getPlaylistId("not a URL")).toThrow();
  });
});
