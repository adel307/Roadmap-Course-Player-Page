import { fetchLessons } from "@/lib/api/fetchLessons";
import { testLesson } from "@/test/testData";

describe("fetchLessons", () => {
  const originalFetch = globalThis.fetch;
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleError.mockRestore();
  });

  it("requests lessons from the course playlist route", async () => {
    const payload = { count: 1, lessons: [testLesson] };
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(payload),
    });
    globalThis.fetch = fetchMock;

    await expect(fetchLessons("course-1", "playlist-1")).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/api/courses/course-1/playlist-1",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("reports HTTP errors with response details", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: jest.fn().mockResolvedValue({ message: "Unavailable" }),
    });

    await expect(fetchLessons("course-1", "playlist-1")).rejects.toThrow(
      "Failed to fetch lessons: HTTP Error: 503 - Unavailable",
    );
    expect(consoleError).toHaveBeenCalled();
  });
});
