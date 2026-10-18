import { HeroBackground } from "./hero/HeroBackground";
import { MobileHero } from "./hero/MobileHero";
import { DesktopHero } from "./hero/DesktopHero";

export function HomeHero() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden border-b border-line"
    >
      <HeroBackground />

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20 lg:py-24">
        <MobileHero />
        <DesktopHero />
      </div>
    </section>
  );
}