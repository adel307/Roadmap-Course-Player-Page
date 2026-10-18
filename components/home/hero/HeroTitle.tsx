type HeroTitleProps = {
  size?: "sm" | "md";
};

export function HeroTitle({ size = "md" }: HeroTitleProps) {
  const isSmall = size === "sm";

  if (isSmall) {
    return (
      <h1 className="font-extrabold leading-[1.15] tracking-[-0.04em] text-ink text-[24px]">
        <span className="block drop-shadow-[0_2px_2px_rgba(15,23,42,0.18)]">
          Turn your ambition
        </span>
        <span className="block drop-shadow-[0_2px_2px_rgba(15,23,42,0.18)]">
          into
        </span>
        <span className="relative mt-0.5 block">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-y-[2px] bg-gradient-to-r from-brand-dark/30 via-brand/25 to-emerald-900/25 bg-clip-text text-transparent blur-[1px]"
          >
            real-world skills.
          </span>
          <span className="relative bg-gradient-to-r from-brand-dark via-brand to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_2px_3px_rgba(43,174,142,0.25)]">
            real-world skills.
          </span>
        </span>
      </h1>
    );
  }

  return (
    <h1 className="mt-8 font-extrabold leading-[1.08] tracking-[-0.055em] text-ink text-6xl lg:text-[68px]">
      <span className="block drop-shadow-[0_2px_2px_rgba(15,23,42,0.18)]">
        Turn your ambition into
      </span>
      <span className="relative mt-1 block">
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-[3px] bg-gradient-to-r from-brand-dark/30 via-brand/25 to-emerald-900/25 bg-clip-text text-transparent blur-[1px]"
        >
          real-world skills.
        </span>
        <span className="relative bg-gradient-to-r from-brand-dark via-brand to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_3px_4px_rgba(43,174,142,0.25)]">
          real-world skills.
        </span>
      </span>
    </h1>
  );
}