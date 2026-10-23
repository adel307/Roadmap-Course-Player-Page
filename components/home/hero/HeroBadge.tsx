import { Sparkles } from "lucide-react";

type HeroBadgeProps = {
    size?: "sm" | "md";
};

export function HeroBadge({ size = "md" }: HeroBadgeProps) {
    const isSmall = size === "sm";

    const containerClasses = isSmall
        ? "mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-card/80 px-2.5 py-1.5 shadow-sm backdrop-blur"
        : "inline-flex items-center gap-2 rounded-full border border-brand/20 bg-card/80 px-4 py-2.5 shadow-sm backdrop-blur";

    const dotClasses = isSmall
        ? "h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(43,174,142,0.35)]"
        : "h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_12px_rgba(43,174,142,0.35)]";

    const textClasses = isSmall
        ? "text-[9px] font-bold tracking-wide text-ink"
        : "text-xs font-bold tracking-wide text-ink";

    return (
        <div className={containerClasses}>
            <span className={dotClasses} />
            <span className={textClasses}>
                YOUR FUTURE STARTS HERE
            </span>
            <Sparkles
                size={isSmall ? 11 : 15}
                className="text-brand-dark"
            />
        </div>
    );
}