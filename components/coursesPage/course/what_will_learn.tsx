'use client';
import { CheckCircle2, Sparkles } from "lucide-react";
import type { Course } from "@/lib/types/course";

type WhatYouWillLearnProps = {
  course: Course;
};

export function WhatYouWillLearn({ course }: WhatYouWillLearnProps) {
  const points = course.what_will_learn ?? [];

  if (points.length === 0) return null;

  return (
    <section className="space-y-4 transition-all duration-300 ease-out hover:-translate-y-2">
      {/* Main card — matches CourseSidebar pricing card */}
      <div className="rounded-2xl border border-line bg-[#061f43] p-6 shadow-card">
        <h3 className="text-sm font-bold text-[#58cfac]">
          What you&apos;ll learn
        </h3>

        <ul className="mt-5 grid gap-3.5 text-sm sm:grid-cols-2">
          {points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-white"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-slate-400"
              />
              <span className="leading-6">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}