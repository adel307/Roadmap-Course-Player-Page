'use client';
import {
  ArrowUpRight,
  Award,
  Clock3,
  FileText,
  Globe,
  Infinity as InfinityIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { Course } from "@/lib/types/course";

import { useCourseStore } from "@/lib/store/useCourseStore";

type CourseSidebarProps = {
  course: Course;
};

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "Flexible";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatLanguage(code: string): string {
  const map: Record<string, string> = {
    ar: "Arabic",
    en: "English",
    english: "English",
    arabic: "Arabic",
  };
  return map[code?.toLowerCase()] ?? code;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const router = useRouter();
  const { lessonsByCourse, updateCourse } = useCourseStore((state) => state);
  const courseLessons = lessonsByCourse[course.id] || [];
  const totalLessons = courseLessons.length;

  const isFree = Number(course.price) <= 0;
  const hasDiscount =
    !isFree &&
    course.discount_price != null &&
    course.discount_price < course.price;
  const currentPrice = hasDiscount ? course.discount_price! : course.price;
  const discountPct = hasDiscount
    ? Math.round(((course.price - course.discount_price!) / course.price) * 100)
    : 0;

  const includes = [
    {
      icon: Clock3,
      label: "Duration",
      value: formatDuration(course.total_duration_seconds),
    },
    {
      icon: FileText,
      label: "Lessons",
      value: `${totalLessons} lessons`,
    },
    {
      icon: Globe,
      label: "Language",
      value: formatLanguage(course.language),
    },
    {
      icon: Award,
      label: "Certificate",
      value: "On completion",
    },
    {
      icon: InfinityIcon,
      label: "Access",
      value: "Lifetime",
    },
  ];

  const handleAddToCart = (course: Course) => {
    try {
      if (course.inMyCard) {
        updateCourse(course.id, { inMyCard: false });
        alert("Course removed from your courses.");
        router.push(`/courses`);
      } else {
        updateCourse(course.id, { inMyCard: true });
        alert("Course added to your courses.");
        router.push("/my-courses");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:col-span-4">
      {/* Pricing card */}
      <div className="rounded-2xl border border-line bg-card p-6 text-ink shadow-card transition-all duration-300 ease-out hover:-translate-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-ink">
            {isFree ? "Free" : formatMoney(currentPrice)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-ink/60 line-through">
                {formatMoney(course.price)}
              </span>
              <span className="rounded-full bg-brand-pale px-2 py-0.5 text-[10px] font-bold text-brand-dark">
                {discountPct}% OFF
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => handleAddToCart(course)}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark"
        >
          {course.inMyCard ? "Remove from cart" : "Add to cart"}
          <ArrowUpRight size={16} />
        </button>

        <div className="mt-6 border-t border-line pt-5">
          <h3 className="text-sm font-bold text-ink">This course includes</h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            {includes.map(({ icon: Icon, label, value }) => (
              <li
                key={label}
                className="flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-ink/80">
                  <Icon size={16} className="text-ink/60" />
                  {label}
                </span>
                <span className="font-semibold text-ink">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Certificate note */}
      <div className="rounded-2xl border border-brand/20 bg-brand-pale p-5 text-center">
        <Award className="mx-auto text-brand-dark" size={22} />
        <p className="mt-2 text-xs font-medium leading-6 text-brand-dark">
          Complete all lessons to earn your verified course certificate.
        </p>
      </div>
    </aside>
  );
}