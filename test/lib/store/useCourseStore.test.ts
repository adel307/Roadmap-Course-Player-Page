import { useCourseStore } from "@/lib/store/useCourseStore";
import { testCourse, testLesson } from "@/test/testData";

describe("useCourseStore", () => {
  beforeEach(() => {
    useCourseStore.setState({
      courses: [],
      lessonsByCourse: {},
      savedLessonsIds: [],
      loadingCourses: {},
      errors: {},
    });
  });

  it("sets and retrieves courses by ID", () => {
    useCourseStore.getState().setCourses([testCourse]);
    expect(useCourseStore.getState().getCourseById(testCourse.id)).toEqual(testCourse);
    expect(useCourseStore.getState().getCourseById("missing")).toBeUndefined();
  });

  it("updates course and lesson data immutably", () => {
    useCourseStore.setState({
      courses: [testCourse],
      lessonsByCourse: { [testCourse.id]: [testLesson] },
    });

    useCourseStore.getState().updateCourse(testCourse.id, { title: "Updated" });
    useCourseStore.getState().updateLesson(testCourse.id, testLesson.id, {
      isSaved: true,
    });

    expect(useCourseStore.getState().courses[0].title).toBe("Updated");
    expect(useCourseStore.getState().lessonsByCourse[testCourse.id][0].isSaved)
      .toBe(true);
    expect(testCourse.title).not.toBe("Updated");
    expect(testLesson.isSaved).toBe(false);
  });

  it("toggles saved state for an existing lesson and flattens course lessons", () => {
    useCourseStore.setState({
      lessonsByCourse: { [testCourse.id]: [testLesson] },
    });

    useCourseStore.getState().toggleSavedLesson(testCourse.id, testLesson.id);
    expect(useCourseStore.getState().lessonsByCourse[testCourse.id][0].isSaved)
      .toBe(true);
    expect(useCourseStore.getState().getAllLessons()).toHaveLength(1);
  });
});
