import { Code2, Layers3 } from "lucide-react";
import LaptopApp from "../laptop";

export function MobileLaptopShowcase() {
  return (
    <div className="relative w-[44%] shrink-0">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-1 rounded-[45%] bg-gradient-to-br from-brand/35 via-brand-pale to-emerald-200/50 blur-[35px]"
      />
      {/* Orbit */}
      <div
        aria-hidden="true"
        className="absolute left-[2%] top-[16%] h-[65%] w-[96%] rotate-[-13deg] rounded-[45%] border border-brand/30"
      />

      {/* Laptop card */}
      <div className="relative z-10 rotate-[-3deg] rounded-2xl border border-line bg-card p-1.5 shadow-card">
        <div className="relative h-[150px] w-full overflow-hidden rounded-xl bg-surface">
          <LaptopApp />
        </div>
      </div>

      {/* Floating icons */}
      <div className="absolute -left-1 -top-2 z-20 flex h-8 w-8 -rotate-6 items-center justify-center rounded-lg border border-white/80 bg-brand text-white shadow-card">
        <Code2 size={14} strokeWidth={1.8} />
      </div>
      <div className="absolute -right-1 top-[55%] z-20 flex h-8 w-8 rotate-6 items-center justify-center rounded-lg border border-white/80 bg-emerald-600 text-white shadow-card">
        <Layers3 size={14} strokeWidth={1.8} />
      </div>
    </div>
  );
}