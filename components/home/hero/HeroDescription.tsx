type HeroDescriptionProps = {
  size?: "sm" | "md";
};

export function HeroDescription({ size = "md" }: HeroDescriptionProps) {
  const isSmall = size === "sm";

  return (
    <p
      className={
        isSmall
          ? "mt-5 text-sm leading-7 text-muted text-right"
          : "mt-7 max-w-xl text-lg leading-8 text-muted"
      }
    >
      Roadmap helps aspiring engineers and developers bridge the gap between
      learning and doing through hands-on projects, expert mentorship, and
      practical, career-focused training.
    </p>
  );
}