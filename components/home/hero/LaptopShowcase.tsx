import LaptopApp from "../laptop";
import { NextChapterCard } from "./NextChapterCard";
import { Code2, Layers3 } from "lucide-react";

export function LaptopShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
      <div
        aria-hidden="true"
        className="absolute inset-5 rounded-[45%] bg-gradient-to-br from-brand/35 via-brand-pale to-emerald-200/50 blur-[65px]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[2%] top-[16%] h-[65%] w-[96%] rotate-[-13deg] rounded-[45%] border border-brand/30"
      />
      <div
        aria-hidden="true"
        className="absolute right-[4%] top-[4%] h-14 w-14 rounded-full bg-brand/15 blur-sm"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[8%] left-[5%] h-20 w-20 rounded-full bg-brand-pale blur-2xl"
      />

      <div className="relative z-10 mx-6 rotate-[-3deg] rounded-[34px] border border-line bg-card p-3 shadow-card transition-transform duration-500 hover:rotate-0">
        <div className="relative h-[420px] w-full overflow-hidden rounded-[26px] bg-surface">
          <LaptopApp />
        </div>
      </div>

      <div className="absolute right-0 top-[13%] z-20 flex h-[68px] w-[68px] rotate-6 items-center justify-center rounded-2xl border border-white/80 bg-brand text-white shadow-card">
        <Code2 size={28} strokeWidth={1.8} />
      </div>

      <div className="absolute -left-2 top-[39%] z-20 flex h-[68px] w-[68px] -rotate-6 items-center justify-center rounded-2xl border border-white/80 bg-emerald-600 text-white shadow-card">
        <Layers3 size={27} strokeWidth={1.8} />
      </div>

      <NextChapterCard variant="desktop" />
    </div>
  );
}