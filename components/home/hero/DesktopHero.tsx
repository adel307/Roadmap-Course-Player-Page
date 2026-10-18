import { HeroBadge } from "./HeroBadge";
import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";
import { HeroCTAs } from "./HeroCTAs";
import { HeroHighlights } from "./HeroHighlights";
import { PillarsList } from "./PillarsList";
import { LaptopShowcase } from "./LaptopShowcase";

export function DesktopHero() {
  return (
    <div className="hidden lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10">
      {/* LEFT CONTENT */}
      <div className="relative z-10 max-w-2xl">
        <HeroBadge size="md" />
        <HeroTitle size="md" />
        <HeroDescription size="md" />
        <HeroCTAs size="md" />
        <HeroHighlights size="md" />
        <PillarsList variant="desktop" />
      </div>

      {/* RIGHT IMAGE SHOWCASE */}
      <LaptopShowcase />
    </div>
  );
}