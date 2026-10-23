import type { Course } from "@/lib/types/course";

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "Flexible schedule";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

export function formatPrice(course: Course): string {
  const basePrice = Number(course.price);

  if (basePrice <= 0) {
    return "Free";
  }

  if (course.discount_price != null) {
    const discount = Number(course.discount_price);

    if (discount >= basePrice) {
      return "Invalid discount";
    }

    const effectivePrice = basePrice - discount;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(effectivePrice);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(basePrice);
}

export function formatLevel(level?: Course["level"]): string {
  if (!level) return "All levels";

  if (level === "all_levels") return "All levels";

  return level
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}