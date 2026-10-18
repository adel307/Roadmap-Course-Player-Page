"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { studentTestimonials } from "@/data/certificates";

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

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {visibleTestimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
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
              <div className="flex items-center justify-between">
                <Quote
                  size={23}
                  className="text-brand/70 transition-colors duration-300 group-hover:text-white/80"
                />
                <span
                  className="flex gap-0.5 text-[#ffc107]"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={1.5} />
                  ))}
                </span>
              </div>

              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-white/90">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-line pt-4 transition-colors duration-300 group-hover:border-white/20">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-ink dark:text-black"
                  style={{ backgroundColor: testimonial.avatarColor }}
                >
                  {testimonial.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink transition-colors duration-300 group-hover:text-white">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted transition-colors duration-300 group-hover:text-white/70">
                    {testimonial.role}
                  </p>
                  <p className="mt-1 truncate text-[10px] font-medium text-brand-dark transition-colors duration-300 group-hover:text-white/80">
                    {testimonial.learningPath}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

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