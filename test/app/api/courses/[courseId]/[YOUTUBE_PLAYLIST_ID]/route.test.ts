/** @jest-environment node */

import { GET } from "@/app/api/courses/[courseId]/[YOUTUBE_PLAYLIST_ID]/route";
import { getPlaylistLessons } from "@/lib/getPlaylistLessons";
import { testLesson } from "@/test/testData";

jest.mock("@/lib/getPlaylistLessons", () => ({
  getPlaylistLessons: jest.fn(),
}));

describe("GET /api/courses/[courseId]/[YOUTUBE_PLAYLIST_ID]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the lessons and count for the requested playlist", async () => {
    (getPlaylistLessons as jest.Mock).mockResolvedValue([testLesson]);
    const response = await GET({} as Request, {
      params: Promise.resolve({
        courseId: "course-1",
        YOUTUBE_PLAYLIST_ID: "playlist-1",
      }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      count: 1,
      lessons: [JSON.parse(JSON.stringify(testLesson))],
    });
    expect(getPlaylistLessons).toHaveBeenCalledWith({
      playlistId: "playlist-1",
      courseId: "course-1",
    });
  });

  it("returns a structured error when the playlist service throws", async () => {
    const logError = jest.spyOn(console, "error").mockImplementation(() => {});
    (getPlaylistLessons as jest.Mock).mockRejectedValue(new Error("YouTube unavailable"));

    const response = await GET({} as Request, {
      params: Promise.resolve({
        courseId: "course-1",
        YOUTUBE_PLAYLIST_ID: "playlist-1",
      }),
    });

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to fetch playlist",
      details: "YouTube unavailable",
    });
    logError.mockRestore();
  });
});
