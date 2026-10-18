import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export function StarRating({
  rating,
  size = 13,
  className = "",
}: StarRatingProps) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-amber-400 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          fill={index < Math.round(rating) ? "currentColor" : "none"}
          strokeWidth={1.7}
        />
      ))}
    </span>
  );
}
