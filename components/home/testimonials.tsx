"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { studentTestimonials } from "@/data/certificates";
import { TestimonialsGrid } from "./TestimonialsGrid";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  function move(direction: -1 | 1) {
    setActiveIndex(
      (current) =>
        (current + direction + studentTestimonials.length) %
        studentTestimonials.length,
    );
  }

  const visibleTestimonials = Array.from({ length: 3 }, (_, index) => {
    return studentTestimonials[(activeIndex + index) % studentTestimonials.length];
  });

  return (
    <section id="testimonials" className="border-y border-line py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-11 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-brand-dark">
              Learner stories
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Learning that leads somewhere
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              Hear from learners building confidence, creating projects, and
              taking their next step in technology.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Sample testimonials — replace with verified student stories.
            </p>
          </div>

          {/* Desktop arrows */}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => move(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card text-muted transition hover:border-brand/35 hover:text-brand-dark"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => move(1)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card text-muted transition hover:border-brand/35 hover:text-brand-dark"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* استدعاء كومبوننت العرض وإرسال الـ 3 عناصر فقط إليه */}
        <TestimonialsGrid testimonials={visibleTestimonials} />

        {/* Mobile controls */}
        <div className="mt-7 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => move(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card text-muted transition active:scale-95"
          >
            <ArrowLeft size={17} />
          </button>
          <div className="flex gap-1.5 px-1">
            {studentTestimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Show testimonials starting with ${testimonial.name}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex ? "w-6 bg-brand" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => move(1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card text-muted transition active:scale-95"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}