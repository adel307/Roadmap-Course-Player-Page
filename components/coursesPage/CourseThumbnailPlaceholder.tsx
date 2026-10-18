import { Course } from "@/lib/types/course";
import { BookOpen, FileText, PlayCircle, Sparkles } from "lucide-react";

export function CourseThumbnailPlaceholder({
  level,
}: {
  level: Course["level"];
}) {
  const Icon =
    level === "beginner"
      ? BookOpen
      : level === "intermediate"
        ? FileText
        : level === "advanced"
          ? Sparkles
          : PlayCircle;

  return (
    <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-pale via-white to-slate-100">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1b2a3f 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-brand-dark/10 blur-2xl"
      />

      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-dark shadow-sm ring-1 ring-line">
          <Icon size={22} />
        </span>
        <span className="text-xs font-medium text-muted">Course preview</span>
      </div>
    </div>
  );
}