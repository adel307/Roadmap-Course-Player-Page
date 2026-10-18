export function HeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[550px] w-[550px] rounded-full bg-brand/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[450px] w-[450px] rounded-full bg-brand-pale blur-[110px]"
      />
    </>
  );
}