import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  searchCourses,
  updateCourse,
} from "@/lib/api/courses";
import { courses } from "@/data/courses";
import { testCourse } from "@/test/testData";

describe("course data operations", () => {
  it("returns the seeded courses and finds courses by ID", () => {
    expect(getCourses()).toBe(courses);
    expect(getCourseById(courses[0].id)).toEqual(courses[0]);
    expect(getCourseById("missing")).toBeUndefined();
  });

  it("creates a course without mutating the original list", () => {
    const originalCourses = [testCourse];
    const { id: _id, created_at: _createdAt, updated_at: _updatedAt, ...input } =
      testCourse;
    expect(_id).toBeTruthy();
    expect(_createdAt).toBeTruthy();
    expect(_updatedAt).toBeTruthy();

    const result = createCourse(originalCourses, input);

    expect(result).toHaveLength(2);
    expect(originalCourses).toHaveLength(1);
    expect(result[1]).toEqual(
      expect.objectContaining({
        ...input,
        id: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
  });

  it("updates and deletes only the matching course", () => {
    const otherCourse = { ...testCourse, id: "other-course" };
    const originalCourses = [testCourse, otherCourse];
    const updated = updateCourse(originalCourses, testCourse.id, {
      title: "Updated title",
    });

    expect(updated[0].title).toBe("Updated title");
    expect(updated[1]).toBe(otherCourse);
    expect(originalCourses[0].title).toBe(testCourse.title);
    expect(deleteCourse(updated, testCourse.id)).toEqual([otherCourse]);
  });

  it("searches title, description, and metadata case-insensitively", () => {
    expect(searchCourses(courses, "  PYTHON ").map((item) => item.id)).toContain(
      courses[0].id,
    );
    expect(searchCourses(courses, "").length).toBe(courses.length);
    expect(searchCourses(courses, "no matching course")).toEqual([]);
  });
});
