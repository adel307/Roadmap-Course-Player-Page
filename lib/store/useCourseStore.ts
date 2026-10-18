import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { courses as mainCourses } from "@/data/courses";
import { Course } from '../types/course';
import { Lesson } from '../types/lesson';

interface CourseState {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  updateCourse: (courseId: string | number, updatedData: Partial<Course>) => void;
  lessonsByCourse: Record<string, Lesson[]>;
  loadingCourses: Record<string, boolean>;
  errors: Record<string, string | null>;
  fetchLessonsForCourse: (
    courseId: string,
    playlistUrl: string | null,
    youtubeApiCallFn: (courseId: string, playlistUrl: string) => Promise<Lesson[]>
  ) => Promise<void>;
  updateLesson: (
    courseId: string,
    lessonId: string | number,
    updatedData: Partial<Lesson>
  ) => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: mainCourses,
      setCourses: (courses) => set({ courses }),

      updateCourse: (courseId, updatedData) => {
        set((state) => {
          const updatedCourses = state.courses.map((course) =>
            course.id === courseId ? { ...course, ...updatedData } : course
          );
          return { courses: updatedCourses };
        });
      },

      lessonsByCourse: {},
      loadingCourses: {},
      errors: {},

      fetchLessonsForCourse: async (courseId, playlistUrl, youtubeApiCallFn) => {
        const state = get();
        
        if (state.lessonsByCourse[courseId]) {
          return;
        }

        set((state) => ({
          loadingCourses: { ...state.loadingCourses, [courseId]: true },
          errors: { ...state.errors, [courseId]: null },
        }));

        try {
          if (playlistUrl){
            const fetchedLessons = await youtubeApiCallFn(courseId, playlistUrl);
            const lessonsWithCourseId: Lesson[] = fetchedLessons.map((lesson) => ({
              ...lesson,
              courseId,
            }));

            set((state) => ({
              lessonsByCourse: {
                ...state.lessonsByCourse,
                [courseId]: lessonsWithCourseId,
              },
              loadingCourses: { ...state.loadingCourses, [courseId]: false },
            }));
          } else {
            return;
          }
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set((state) => ({
            loadingCourses: { ...state.loadingCourses, [courseId]: false },
            errors: { ...state.errors, [courseId]: errorMessage },
          }));
        }
      },

      updateLesson: (courseId, lessonId, updatedData) => {
        set((state) => {
          const courseLessons = state.lessonsByCourse[courseId] || [];
          const updatedLessons = courseLessons.map((lesson) => 
            lesson.id === lessonId ? { ...lesson, ...updatedData } : lesson
          );

          return {
            lessonsByCourse: {
              ...state.lessonsByCourse,
              [courseId]: updatedLessons,
            },
          };
        });
      },
    }),
    {
      name: 'course-storage', // اسم المفتاح في localStorage
      partialize: (state) => ({
        courses: state.courses,
        lessonsByCourse: state.lessonsByCourse,
      }),
    }
  )
);