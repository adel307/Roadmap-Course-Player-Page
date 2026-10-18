import Link from "next/link";
import { LessonSidebar } from "@/components/coursesPage/course/lesson/lesson-sidebar";
import { Course } from "@/lib/types/course";
import { Search, BookOpen, ArrowLeft, Home } from "lucide-react";

interface NotFoundProps {
  lessonID: string;
}

export default function NotFound({ lessonID }: NotFoundProps) {
  // Default fallback course object adhering to the identity
  const course: Course = {
    id: lessonID || "",
    isFeatured: false,
    inMyCard: false,
    title: "Lesson Not Found",
    slug: "",
    description: "",
    thumbnail_url: "",
    price: 0,
    language: "",
    status: "published",
    created_at: "",
    updated_at: "",
    discount_price: 0,
    promo_video_url: "",
    level: "beginner",
    average_rating: 0,
    total_reviews: 0,
    total_enrollments: 0,
    total_duration_seconds: 0,
    meta_title: "",
    meta_description: "",
    requirements: [],
    what_will_learn: [],
  };

  return (
    <main className="min-h-screen bg-[#F7F9FB] text-[#1B2A3F] font-sans antialiased">
      <div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid min-h-[80vh] grid-cols-1 items-start gap-8 lg:grid-cols-12">
          
          {/* ===== Sidebar (4 Columns) ===== */}
          <aside className="order-2 lg:order-1 lg:col-span-4">
            <div className="overflow-hidden rounded-[18px] border border-[#E8EDF2] bg-[#FFFFFF] shadow-[0_1px_3px_rgba(16,24,40,0.05),0_4px_20px_rgba(16,24,40,0.04)]">
              <LessonSidebar
                course={course}
                lessons={[]}
                currentLessonId={lessonID}
              />
            </div>
          </aside>

          {/* ===== Main Content (8 Columns) ===== */}
          <section className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-8">
            <div className="mx-auto w-full max-w-2xl rounded-[20px] border border-[#E8EDF2] bg-[#FFFFFF] p-8 sm:p-12 text-center shadow-[0_1px_3px_rgba(16,24,40,0.05),0_4px_20px_rgba(16,24,40,0.04)]">
              
              {/* Icon Container with Teal Tint */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F5F0] text-[#2BAE8E] shadow-sm">
                <BookOpen className="h-9 w-9 stroke-[1.5]" />
              </div>

              {/* Page Title */}
              <h1 className="text-3xl font-extrabold tracking-tight text-[#1B2A3F] sm:text-4xl">
                الدرس غير موجود
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-[15px] leading-relaxed text-[#5B6B7F]">
                عذراً، لم نتمكن من العثور على الدرس المحدد. قد يكون قد تم إزالته أو أن الرابط غير صحيح. الرجاء اختيار درس آخر من القائمة الجانبية للبدء في التعلم.
              </p>

              {/* Search Bar Element matching UI Specs */}
              <div className="relative mt-8">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#5B6B7F]">
                  <Search className="h-4 w-4 stroke-[1.5]" />
                </span>
                <input
                  type="text"
                  placeholder="ابحث عن درس أو موضوع آخر..."
                  className="w-full rounded-[12px] border border-[#E8EDF2] bg-[#F7F9FB] py-3.5 pr-4 pl-11 text-sm text-[#1B2A3F] placeholder-[#5B6B7F] outline-none transition-all focus:border-[#2BAE8E] focus:bg-white focus:ring-2 focus:ring-[#2BAE8E]/15"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#2BAE8E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#25977a] active:scale-[0.98]"
                >
                  <Home className="h-4 w-4" />
                  العودة للرئيسية
                </Link>
                
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#2BAE8E] bg-white px-6 py-3 text-sm font-semibold text-[#2BAE8E] transition-all hover:bg-[#E6F5F0] active:scale-[0.98]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  الصفحة السابقة
                </button>
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}