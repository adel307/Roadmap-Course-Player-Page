'use client';
import { CheckCircle2 } from "lucide-react";
import type { Course } from "@/lib/types/course";

type WhatYouWillLearnProps = {
  course: Course;
};

export function WhatYouWillLearn({ course }: WhatYouWillLearnProps) {
  const points = course.what_will_learn ?? [];

  if (points.length === 0) return null;

  return (
    <section className="space-y-4 transition-all duration-300 ease-out hover:-translate-y-1">
      <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
        <h3 className="text-sm font-bold text-ink">
          What you&apos;ll learn
        </h3>

        <ul className="mt-5 grid gap-3.5 text-sm sm:grid-cols-2">
          {points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-ink"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-brand-dark"
              />
              <span className="leading-6">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}