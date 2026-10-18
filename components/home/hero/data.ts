import { Braces, Code2, Layers3 } from "lucide-react";

export const highlights = [
  "Real-world projects",
  "Expert mentorship",
  "Career preparation",
];

export const pillars = [
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

export const textHoverClass =
  "inline-block cursor-default rounded-lg px-2 py-1 transition-all duration-300 ease-out " +
  "[text-shadow:0_1px_2px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.10)] " +
  "hover:-translate-y-1 hover:bg-brand hover:text-white " +
  "hover:[text-shadow:0_2px_6px_rgba(0,0,0,0.45)]";