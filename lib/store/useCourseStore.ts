import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '../types/course';
import { Lesson } from '../types/lesson';

interface CourseState {
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  courses: Course[];
  getCourseById: (courseId: string ) => Course | undefined;
  setCourses: (courses: Course[]) => void;
  updateCourse: (courseId: string , updatedData: Partial<Course>) => void;
  loadingCourses: Record<string, boolean>;

  getAllLessons: () => Lesson[];
  lessonsByCourse: Record<string, Lesson[]>;
  fetchLessonsForCourse: (
    courseId: string,
    playlistUrl: string | null,
    youtubeApiCallFn: (courseId: string, playlistUrl: string) => Promise<Lesson[]>
  ) => Promise<void>;
  savedLessonsIds: string[];
  toggleSavedLesson: (courseId: string, lessonId: string ) => void;
  updateLesson: (
  courseId: string,
  lessonId: string ,
    updatedData: Partial<Lesson>
  ) => void;

  errors: Record<string, string | null>;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      courses: [],
      getCourseById: (courseId) => {
        return get().courses.find((course) => course.id === courseId);
      },
      updateCourse: (courseId, updatedData) => {
        set((state) => {
          const updatedCourses = state.courses.map((course) =>
            course.id === courseId ? { ...course, ...updatedData } : course
          );
          return { courses: updatedCourses };
        });
      },
      setCourses: (courses) => set({ courses }),
      loadingCourses: {},

      getAllLessons: () => {
        const state = get();
        // نقوم بدمج مصفوفات الدروس الخاصة بكل كورس في مصفوفة واحدة كبيرة
        return Object.values(state.lessonsByCourse).flat();
      },

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

      lessonsByCourse: {},
      savedLessonsIds: [],
      toggleSavedLesson: (courseId, lessonId) => {
        const state = get();
        const courseLessons = state.lessonsByCourse[courseId];
        if (!courseLessons) return;

        const lesson = courseLessons.find((l) => l.id === lessonId);
        if (lesson) {
          const updatedIsSaved = !lesson.isSaved;
          state.updateLesson(courseId, lessonId, { isSaved: updatedIsSaved });
        }
      },
      errors: {},

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
      name: 'course-storage', // Storage key in localStorage.
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        courses: state.courses,
        lessonsByCourse: state.lessonsByCourse,
        savedLessonsIds: state.savedLessonsIds,
      }),
    }
  )
);