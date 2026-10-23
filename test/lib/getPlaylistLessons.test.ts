import { getPlaylistLessons } from "@/lib/getPlaylistLessons";
import { getYouTubeClient } from "@/lib/youtube";

jest.mock("@/lib/youtube", () => ({
  getYouTubeClient: jest.fn(),
}));

const mockGetYouTubeClient = getYouTubeClient as jest.Mock;

describe("getPlaylistLessons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("maps playlist metadata and video details into ordered lessons", async () => {
    const youtube = {
      playlistItems: {
        list: jest.fn().mockResolvedValue({
          data: {
            items: [
              {
                snippet: {
                  title: "[Welcome] to {TypeScript}",
                  description: "First line\nAdditional details",
                  resourceId: { videoId: "video-1" },
                  thumbnails: { high: { url: "https://example.com/thumb.jpg" } },
                },
              },
            ],
          },
        }),
      },
      videos: {
        list: jest.fn().mockResolvedValue({
          data: {
            items: [
              {
                id: "video-1",
                contentDetails: { duration: "PT1H2M3S" },
              },
            ],
          },
        }),
      },
      commentThreads: {
        list: jest.fn().mockResolvedValue({
          data: {
            items: [
              {
                id: "comment-1",
                snippet: {
                  topLevelComment: {
                    snippet: {
                      authorDisplayName: "Learner",
                      textDisplay: "Great lesson",
                    },
                  },
                },
              },
            ],
          },
        }),
      },
    };
    mockGetYouTubeClient.mockReturnValue(youtube);

    const lessons = await getPlaylistLessons({
      playlistId: "playlist-1",
      courseId: "course-1",
    });

    expect(lessons).toHaveLength(1);
    expect(lessons[0]).toEqual(
      expect.objectContaining({
        id: "video-1",
        coursesId: "course-1",
        title: "Welcome to TypeScript",
        slug: "welcome-to-typescript",
        description: "First line",
        durationSeconds: 3723,
        order: 1,
        isFreePreview: true,
        thumbnail: "https://example.com/thumb.jpg",
        comments: [
          {
            id: "comment-1",
            user: "Learner",
            comment: "Great lesson",
            coursesId: "course-1",
          },
        ],
      }),
    );
    expect(youtube.commentThreads.list).toHaveBeenCalledWith(
      expect.objectContaining({ videoId: "video-1", maxResults: 10 }),
    );
  });

  it("supports disabling comment requests and first-lesson previews", async () => {
    const youtube = {
      playlistItems: {
        list: jest.fn().mockResolvedValue({
          data: { items: [{ snippet: { title: "Lesson", resourceId: { videoId: "v1" } } }] },
        }),
      },
      videos: { list: jest.fn().mockResolvedValue({ data: { items: [] } }) },
      commentThreads: { list: jest.fn() },
    };
    mockGetYouTubeClient.mockReturnValue(youtube);

    const [lesson] = await getPlaylistLessons({
      playlistId: "playlist-1",
      courseId: "course-1",
      fetchComments: false,
      freePreviewFirst: false,
    });

    expect(lesson.isFreePreview).toBe(false);
    expect(lesson.comments).toEqual([]);
    expect(youtube.commentThreads.list).not.toHaveBeenCalled();
  });
});
