import Link from "next/link";
import LaptopApp from "./laptop";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Braces,
  BrainCircuit,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

const highlights = [
  "Real-world projects",
  "Expert mentorship",
  "Career preparation",
];

const pillars = [
  {
    title: "Learn by building",
    description: "Turn knowledge into practical experience.",
    icon: Code2,
  },
  {
    title: "Grow with mentors",
    description: "Learn from people who've done the work.",
    icon: Layers3,
  },
  {
    title: "Build your career",
    description: "Develop skills that move you forward.",
    icon: Braces,
  },
];

const textHoverClass =
  "inline-block cursor-default rounded-lg px-2 py-1 transition-all duration-300 ease-out " +
  "[text-shadow:0_1px_2px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.10)] " +
  "hover:-translate-y-1 hover:bg-[#061f43] hover:text-white " +
  "hover:[text-shadow:0_2px_6px_rgba(0,0,0,0.45)]";


export function HomeHero() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden border-b border-slate-200/70 bg-[#f8fbff]"
    >
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[550px] w-[550px] rounded-full bg-blue-200/40 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[450px] w-[450px] rounded-full bg-emerald-100/60 blur-[110px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:py-24">
        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.45)]" />
            <span className="text-xs font-bold tracking-wide text-blue-950">
              YOUR FUTURE STARTS HERE
            </span>
            <Sparkles size={15} className="text-blue-600" />
          </div>

          {/* Heading — 3D effect */}
          <h1 className="mt-8 text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.055em] text-[#10264d] sm:text-6xl lg:text-[68px]">
            <span className="block drop-shadow-[0_2px_2px_rgba(15,23,42,0.18)]">
              Turn your
            </span>
            <span className="block drop-shadow-[0_2px_2px_rgba(15,23,42,0.18)]">
              ambition into
            </span>
            <span className="relative mt-1 block">
              {/* Shadow layer خلف النص المتدرج */}
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-[3px] bg-gradient-to-r from-blue-900/30 via-sky-900/25 to-emerald-900/25 bg-clip-text text-transparent blur-[1px]"
              >
                real-world skills.
              </span>
              <span className="relative bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_3px_4px_rgba(37,99,235,0.25)]">
                real-world skills.
              </span>
            </span>
          </h1>

          {/* Description — 3D shadow */}
          <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] sm:text-lg">
            Roadmap helps aspiring engineers and developers bridge the gap
            between learning and doing through hands-on projects, expert
            mentorship, and practical, career-focused training.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_16px_38px_rgba(37,99,235,0.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Explore learning paths
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#testimonials"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white/80 px-6 text-sm font-bold text-blue-950 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              Meet our learners
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Highlights */}
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 text-sm font-medium text-slate-600"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <BadgeCheck size={16} />
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          {/* Feature strip */}
          <div className="mt-12 grid gap-5 border-t border-slate-200 pt-7 sm:grid-cols-3 sm:gap-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`group flex flex-col gap-3 rounded-xl p-3 transition-all duration-300 ease-out border border-transparent hover:-translate-y-2 hover:border-[#061f43] hover:bg-[#061f43] ${
                    index > 0 ? "sm:border-l sm:border-slate-200 sm:pl-4" : ""
                  }`}
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(15,23,42,0.06), 0 8px 20px -6px rgba(15,23,42,0.18), 0 20px 40px -12px rgba(15,23,42,0.22)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100/80 text-blue-600 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <h2
                      className={`text-sm font-bold text-blue-950 transition-colors duration-300 group-hover:text-white ${textHoverClass}`}
                    >
                      {pillar.title}
                    </h2>
                  </div>
                  <div>
                    <p
                      className={`mt-1 text-xs leading-5 text-slate-500 transition-colors duration-300 group-hover:text-white/80 ${textHoverClass}`}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT IMAGE SHOWCASE */}
        <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="absolute inset-5 rounded-[45%] bg-gradient-to-br from-blue-300/50 via-indigo-200/30 to-emerald-200/50 blur-[65px]"
          />

          {/* Decorative orbit */}
          <div
            aria-hidden="true"
            className="absolute left-[2%] top-[16%] h-[65%] w-[96%] rotate-[-13deg] rounded-[45%] border border-blue-300/60"
          />
          <div
            aria-hidden="true"
            className="absolute right-[4%] top-[4%] h-14 w-14 rounded-full bg-blue-200/40 blur-sm"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[8%] left-[5%] h-20 w-20 rounded-full bg-emerald-200/40 blur-2xl"
          />

          {/* Main 3D card */}
          <div className="relative z-10 mx-3 rotate-[-3deg] rounded-[28px] border border-white/90 bg-gradient-to-br from-white/80 via-white/60 to-blue-50/70 p-2.5 shadow-[0_35px_90px_rgba(37,99,235,0.18)] backdrop-blur-sm transition-transform duration-500 hover:rotate-0 sm:mx-6 sm:rounded-[34px] sm:p-3">
            {/* الحاوية المسؤولة عن حجم الـ 3D scene */}
            <div className="relative h-[340px] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-slate-50 via-white to-blue-50/50 sm:h-[420px] sm:rounded-[26px]">
              <LaptopApp />
            </div>
          </div>

          {/* Floating icons */}
          <div className="absolute -right-1 top-[13%] z-20 flex h-14 w-14 rotate-6 items-center justify-center rounded-2xl border border-white/80 bg-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,0.32)] sm:right-0 sm:h-[68px] sm:w-[68px]">
            <Code2 size={28} strokeWidth={1.8} />
          </div>

          <div className="absolute -left-1 top-[39%] z-20 flex h-14 w-14 -rotate-6 items-center justify-center rounded-2xl border border-white/80 bg-emerald-400 text-white shadow-[0_14px_30px_rgba(16,185,129,0.25)] sm:-left-2 sm:h-[68px] sm:w-[68px]">
            <Layers3 size={27} strokeWidth={1.8} />
          </div>

          <div className="absolute -bottom-2 right-[4%] z-20 flex h-14 w-14 rotate-6 items-center justify-center rounded-2xl border border-white/80 bg-indigo-500 text-white shadow-[0_14px_30px_rgba(99,102,241,0.30)] sm:-bottom-3 sm:h-[68px] sm:w-[68px]">
            <BrainCircuit size={28} strokeWidth={1.8} />
          </div>

          {/* Caption card */}
          <div className="relative z-20 mx-8 -mt-1 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:mx-12 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Layers3 size={22} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">
                  Your next chapter starts here
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Practical skills for a technology-driven future.
                </p>
              </div>
              <Sparkles
                size={20}
                className="shrink-0 text-blue-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}