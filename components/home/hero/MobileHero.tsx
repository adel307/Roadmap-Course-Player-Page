import { HeroBadge } from "./HeroBadge";
import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";
import { HeroCTAs } from "./HeroCTAs";
import { HeroHighlights } from "./HeroHighlights";
import { PillarsList } from "./PillarsList";
import { NextChapterCard } from "./NextChapterCard";
import { MobileLaptopShowcase } from "./MobileLaptopShowcase";

export function MobileHero() {
  return (
    <div className="lg:hidden">
      {/* Top row: Laptop (LEFT) + Title (RIGHT) */}
      <div className="flex items-center gap-3">
        {/* Title side — RIGHT */}
        <div className="flex-1 text-center">
          <HeroBadge size="sm" />
          <HeroTitle size="sm" />
        </div>

        {/* Laptop side — LEFT */}
        <MobileLaptopShowcase />
      </div>

      <NextChapterCard variant="mobile" />

      <HeroDescription size="sm" />

      <HeroCTAs size="sm" />

      <HeroHighlights size="sm" />

      <PillarsList />
    </div>
  );
}