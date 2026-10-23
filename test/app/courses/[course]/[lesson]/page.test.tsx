import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { courses as sourceCourses } from "@/data/courses";
import { fetchLessons } from "@/lib/api/fetchLessons";
import { getPlaylistId } from "@/lib/getPlaylistId";
import { useCourseStore } from "@/lib/store/useCourseStore";
import type { Course } from "@/lib/types/course";
import type { Lesson } from "@/lib/types/lesson";
import LessonDetailClient from "@/app/courses/[course]/[lesson]/page";

jest.mock("react", () => {
  const actualReact = jest.requireActual<typeof import("react")>("react");
  return {
    ...actualReact,
    use: (params: { resolvedParams: { course: string; lesson: string } }) =>
      params.resolvedParams,
  };
});

jest.mock("@/lib/store/useCourseStore", () => ({
  useCourseStore: jest.fn(),
}));

jest.mock("@/lib/api/fetchLessons", () => ({
  fetchLessons: jest.fn(),
}));

jest.mock("@/lib/getPlaylistId", () => ({
  getPlaylistId: jest.fn(() => "playlist-123"),
}));

jest.mock("@/app/courses/[course]/[lesson]/notFound", () => ({
  __esModule: true,
  default: ({ lessonID, reason }: { lessonID: string; reason: string }) => (
    <div data-testid="not-found">
      {reason}: {lessonID}
    </div>
  ),
}));

jest.mock("@/components/coursesPage/course/lesson/lesson-detail-content", () => ({
  __esModule: true,
  default: ({
    course,
    lesson,
    prev,
    next,
    related,
    courseLessons,
  }: {
    course: Course;
    lesson: Lesson;
    prev: Lesson | null;
    next: Lesson | null;
    related: Course[];
    courseLessons: Lesson[];
  }) => (
    <div data-testid="lesson-detail-content">
      <span data-testid="course-id">{course.id}</span>
      <span data-testid="lesson-id">{lesson.id}</span>
      <span data-testid="prev-id">{prev?.id ?? "none"}</span>
      <span data-testid="next-id">{next?.id ?? "none"}</span>
      <span data-testid="lessons-count">{courseLessons.length}</span>
      <span data-testid="related-count">{related.length}</span>
    </div>
  ),
}));

type StoreState = {
  courses: Course[];
  setCourses: jest.Mock;
  getCourseById: (courseId: string) => Course | undefined;
  lessonsByCourse: Record<string, Lesson[]>;
  loadingCourses: Record<string, boolean>;
  errors: Record<string, string | null>;
  fetchLessonsForCourse: jest.Mock;
};

const course: Course = { ...sourceCourses[0], id: "course-1" };
const relatedCourse: Course = { ...sourceCourses[1], id: "course-2" };
const otherLevelCourse: Course = {
  ...sourceCourses[2],
  id: "course-3",
  level: "advanced",
};

const lessons: Lesson[] = [
  {
    id: "lesson-9",
    coursesId: course.id,
    title: "Previous lesson",
    slug: "previous-lesson",
    description: "",
    isSaved: false,
    videoProvider: "youtube",
    videoUrl: null,
    thumbnail: "",
    body: null,
    durationSeconds: 60,
    order: 1,
    isFreePreview: false,
    isPublished: true,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-01T00:00:00Z"),
    deletedAt: null,
    comments: [],
  },
  {
    id: "lesson-10",
    coursesId: course.id,
    title: "Current lesson",
    slug: "current-lesson",
    description: "",
    isSaved: false,
    videoProvider: "youtube",
    videoUrl: null,
    thumbnail: "",
    body: null,
    durationSeconds: 60,
    order: 2,
    isFreePreview: false,
    isPublished: true,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-01T00:00:00Z"),
    deletedAt: null,
    comments: [],
  },
  {
    id: "lesson-11",
    coursesId: course.id,
    title: "Next lesson",
    slug: "next-lesson",
    description: "",
    isSaved: false,
    videoProvider: "youtube",
    videoUrl: null,
    thumbnail: "",
    body: null,
    durationSeconds: 60,
    order: 3,
    isFreePreview: false,
    isPublished: true,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-01T00:00:00Z"),
    deletedAt: null,
    comments: [],
  },
];

const mockSetCourses = jest.fn();
const mockFetchLessonsForCourse = jest.fn();
const mockUseCourseStore = useCourseStore as unknown as jest.Mock;
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

function createStore(overrides: Partial<StoreState> = {}): StoreState {
  const state: StoreState = {
    courses: [course],
    setCourses: mockSetCourses,
    getCourseById: () => undefined,
    lessonsByCourse: { [course.id]: lessons },
    loadingCourses: {},
    errors: {},
    fetchLessonsForCourse: mockFetchLessonsForCourse,
    ...overrides,
  };
  if (!overrides.getCourseById) {
    state.getCourseById = (courseId) =>
      state.courses.find((item) => item.id === courseId);
  }
  return state;
}

function renderPage(
  store: StoreState,
  courseId = course.id,
  lessonId = "lesson-10",
) {
  mockUseCourseStore.mockImplementation((selector) => selector(store));
  const resolvedParams = { course: courseId, lesson: lessonId };
  const params = Object.assign(Promise.resolve(resolvedParams), { resolvedParams });
  return render(
    <LessonDetailClient params={params} />,
  );
}

describe("LessonDetailClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getPlaylistId as jest.Mock).mockReturnValue("playlist-123");
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  it("renders the selected lesson with adjacent lessons and related courses", async () => {
    renderPage(
      createStore({
        courses: [course, relatedCourse, otherLevelCourse],
      }),
    );

    expect(await screen.findByTestId("lesson-detail-content")).toBeInTheDocument();
    expect(screen.getByTestId("course-id")).toHaveTextContent(course.id);
    expect(screen.getByTestId("lesson-id")).toHaveTextContent("lesson-10");
    expect(screen.getByTestId("prev-id")).toHaveTextContent("lesson-9");
    expect(screen.getByTestId("next-id")).toHaveTextContent("lesson-11");
    expect(screen.getByTestId("lessons-count")).toHaveTextContent("3");
    expect(screen.getByTestId("related-count")).toHaveTextContent("1");
  });

  it("matches a lesson by its slug", async () => {
    renderPage(createStore(), course.id, "current-lesson");

    expect(await screen.findByTestId("lesson-id")).toHaveTextContent("lesson-10");
  });

  it("shows the loading state while lessons are being fetched", async () => {
    renderPage(
      createStore({
        lessonsByCourse: {},
        loadingCourses: { [course.id]: true },
      }),
    );

    expect(
      await screen.findByText("Loading lesson and course details..."),
    ).toBeInTheDocument();
  });

  it("shows course-not-found when the course is missing", async () => {
    renderPage(createStore(), "missing-course");

    expect(await screen.findByTestId("not-found")).toHaveTextContent(
      "course-not-found",
    );
  });

  it("shows lesson-not-found when the lesson is missing", async () => {
    renderPage(createStore(), course.id, "missing-lesson");

    expect(await screen.findByTestId("not-found")).toHaveTextContent(
      "lesson-not-found: missing-lesson",
    );
  });

  it("shows an error and retries lesson loading", async () => {
    renderPage(
      createStore({
        errors: { [course.id]: "Network error" },
      }),
    );

    expect(screen.getByText("Network error")).toBeInTheDocument();
    const retryButton = screen.getByRole("button", { name: "إعداد المحاولة" });
    fireEvent.click(retryButton);

    expect(mockFetchLessonsForCourse).toHaveBeenCalledWith(
      course.id,
      course.promo_video_url,
      expect.any(Function),
    );
  });

  it("fetches lessons only when none are loaded", async () => {
    const store = createStore({ lessonsByCourse: {} });
    renderPage(store);

    await waitFor(() => {
      expect(mockFetchLessonsForCourse).toHaveBeenCalledWith(
        course.id,
        course.promo_video_url,
        expect.any(Function),
      );
    });
    expect(getPlaylistId).toHaveBeenCalledWith(course.promo_video_url);
  });

  it("passes through lessons returned by the fetch callback", async () => {
    (fetchLessons as jest.Mock).mockResolvedValue({ lessons });
    renderPage(createStore({ lessonsByCourse: {} }));

    await waitFor(() => {
      expect(mockFetchLessonsForCourse).toHaveBeenCalled();
    });
    const loadLessons = mockFetchLessonsForCourse.mock.calls[0][2] as (
      courseId: string,
      playlistId: string,
    ) => Promise<Lesson[]>;

    await expect(loadLessons(course.id, "playlist-123")).resolves.toEqual(lessons);
    expect(fetchLessons).toHaveBeenCalledWith(course.id, "playlist-123");
  });

  it("populates the store from server data when the requested course is absent", async () => {
    const store = createStore({ courses: [] });
    renderPage(store, "missing-course");

    await waitFor(() => {
      expect(mockSetCourses).toHaveBeenCalledWith(sourceCourses);
    });
  });
});
