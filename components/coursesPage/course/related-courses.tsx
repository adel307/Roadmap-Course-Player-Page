import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { Course } from "@/lib/types/course";

type RelatedCoursesProps = {
  courses: Course[];
  title?: string;
};

export function RelatedCourses({
  courses,
  title = "More in this category",
}: RelatedCoursesProps) {
  if (courses.length === 0) return null;

  return (
    <div className="mt-14">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {courses.map((item, index) => (
          <Link
            key={item.id}
            href={`/courses/${item.id}`}
            className={`group flex min-h-[248px] flex-col rounded-2xl border border-line bg-white p-5 sm:p-6
              transition-all duration-300 ease-out
              hover:-translate-y-1 hover:border-brand/40 hover:bg-brand
              ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
            `}
            style={{
              boxShadow:
                "0 1px 2px rgba(15,23,42,0.06), 0 8px 20px -6px rgba(15,23,42,0.18), 0 20px 40px -12px rgba(15,23,42,0.22)",
            }}
          >
            {/* Header / Icon */}
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pale text-brand-dark transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">
                <BookOpen size={18} />
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="mt-4 text-base font-bold leading-6 text-ink transition-colors duration-300 group-hover:text-white">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-600 transition-colors duration-300 group-hover:text-white/90">
              {item.description}
            </p>

            {/* Card Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4 transition-colors duration-300 group-hover:border-white/20">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark transition-colors duration-300 group-hover:text-white/80">
                View course
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}