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
    <div className="mt-10 sm:mt-14">
      <h2 className="text-lg font-bold text-ink sm:text-xl">{title}</h2>

      <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-4">
        {courses.map((item) => (
          <Link
            key={item.id}
            href={`/courses/${item.id}`}
            className="group flex flex-col rounded-2xl border border-line bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:min-h-[248px] sm:p-5 lg:p-6"
            style={{
              boxShadow:
                "0 1px 2px rgba(15,23,42,0.06), 0 8px 20px -6px rgba(15,23,42,0.18), 0 20px 40px -12px rgba(15,23,42,0.22)",
            }}
          >
            {/* Header / Icon */}
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-pale text-brand-dark transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white sm:h-10 sm:w-10">
                <BookOpen size={18} aria-hidden="true" />
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-6 text-ink transition-colors duration-300 group-hover:text-white sm:mt-4 sm:text-base">
              {item.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-6 text-slate-600 transition-colors duration-300 group-hover:text-white/90 sm:mt-2 sm:text-sm">
              {item.description}
            </p>

            {/* Card Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 transition-colors duration-300 group-hover:border-white/20 sm:mt-5 sm:pt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark transition-colors duration-300 group-hover:text-white/80">
                View course
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}