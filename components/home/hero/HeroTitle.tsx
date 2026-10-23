type HeroTitleProps = {
  size?: "sm" | "md";
};

export function HeroTitle({ size = "md" }: HeroTitleProps) {
  const isSmall = size === "sm";

  const containerClasses = isSmall
    ? "font-extrabold leading-[1.15] tracking-[-0.04em] text-ink text-[24px]"
    : "mt-8 font-extrabold leading-[1.08] tracking-[-0.055em] text-ink text-6xl lg:text-[68px]";

  const secondLineSpacing = isSmall ? "mt-0.5" : "mt-1";
  const blurTranslate = isSmall ? "translate-y-[2px]" : "translate-y-[3px]";
  const textShadow = isSmall
    ? "drop-shadow-[0_2px_3px_rgba(43,174,142,0.25)]"
    : "drop-shadow-[0_3px_4px_rgba(43,174,142,0.25)]";

  return (
    <h1 className={containerClasses}>
      {isSmall ? (
        <>
          <span className="block drop-shadow-[0_2px_2px_rgba(15,23,42,0.18)]">
            Turn your ambition
          </span>
          <span className="block drop-shadow-[0_2px_2px_rgba(15,23,42,0.18)]">
            into
          </span>
        </>
      ) : (
        <span className="block drop-shadow-[0_2px_2px_rgba(15,23,42,0.18)]">
          Turn your ambition into
        </span>
      )}

      <span className={`relative ${secondLineSpacing} block`}>
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${blurTranslate} bg-gradient-to-r from-brand-dark/30 via-brand/25 to-emerald-900/25 bg-clip-text text-transparent blur-[1px]`}
        >
          real-world skills.
        </span>
        <span
          className={`relative bg-gradient-to-r from-brand-dark via-brand to-emerald-500 bg-clip-text text-transparent ${textShadow}`}
        >
          real-world skills.
        </span>
      </span>
    </h1>
  );
}