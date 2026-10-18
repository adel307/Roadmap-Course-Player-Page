import { pillars } from "./data";
import { PillarCard } from "./PillarCard";

type PillarsListProps = {
  variant?: "mobile" | "desktop";
};

export function PillarsList({ variant = "desktop" }: PillarsListProps) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-3 border-t border-line pt-6">
        {pillars.map((pillar) => (
          <PillarCard
            key={pillar.title}
            title={pillar.title}
            description={pillar.description}
            icon={pillar.icon}
            variant="mobile"
          />
        ))}
      </div>
    );
}