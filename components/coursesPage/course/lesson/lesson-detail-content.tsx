import { CoursePromoPlayer } from "@/components/coursesPage/course/course-promo-player";
import { LessonHeader } from "@/components/coursesPage/course/lesson/lesson-header";
import { LessonSidebar } from "@/components/coursesPage/course/lesson/lesson-sidebar";
import { LessonNavigation } from "@/components/coursesPage/course/lesson/lesson-navigation";
import { RelatedCourses } from "@/components/coursesPage/course/related-courses";

type LessonDetailContentProps = {
  course: any;
  lesson: any;
  courseLessons: any[];
  prev: any;
  next: any;
  related: any[];
};

export default function LessonDetailContent({
  course,
  lesson,
  courseLessons,
  prev,
  next,
  related,
}: LessonDetailContentProps) {
  return (
    <main className="min-h-screen bg-[#f7f9fb] text-ink">
      {/* ---------- Header ---------- */}
      {lesson && <LessonHeader course={course} lesson={lesson} />}

      {/* ---------- Body ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {lesson ? (
          <div className="grid items-start gap-8 lg:grid-cols-12">
            {/* ===== Main column ===== */}
            <div className="space-y-6 lg:col-span-8">
              {/* 🎬 Video Player */}
              <CoursePromoPlayer
                title={lesson.title}
                thumbnailUrl={course.thumbnail_url}
                videoUrl={lesson.videoUrl}
              />

              {/* About this lesson */}
              {lesson.description && (
                <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7">
                  <h2 className="text-base font-bold text-ink">
                    About this lesson
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {lesson.description}
                  </p>
                </div>
              )}

              {/* Prev / Next */}
              <LessonNavigation course={course} prev={prev} next={next} />
            </div>

            {/* ===== Sidebar ===== */}
            <div className="lg:col-span-4">
              <LessonSidebar
                course={course}
                lessons={courseLessons}
                currentLessonId={lesson.id}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted">جاري جلب تفاصيل الدرس...</p>
          </div>
        )}

        {/* ---------- Related courses ---------- */}
        {related.length > 0 && (
          <div className="mt-12">
            <RelatedCourses courses={related} />
          </div>
        )}
      </section>
    </main>
  );
}