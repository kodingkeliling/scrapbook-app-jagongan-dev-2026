import React from "react";
import { cn } from "@/lib/utils";

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
    glowColor?: "yellow" | "cyan" | "pink";
}

export default function NeonCard({
    children,
    className,
    glowColor = "yellow",
    ...props
}: NeonCardProps) {
    const glows = {
        yellow: "border-primary shadow-[0_0_10px_rgba(252,238,10,0.3)]",
        cyan: "border-secondary shadow-[0_0_10px_rgba(0,240,255,0.3)]",
        pink: "border-accent shadow-[0_0_10px_rgba(255,0,60,0.3)]",
    };

    return (
        <div
            className={cn(
                "bg-card border-2 p-4 clip-path-cyber relative",
                glows[glowColor],
                className
            )}
            {...props}
        >
            {/* Decorative corners */}
            <div className={cn("absolute top-0 right-0 w-8 h-8 pointer-events-none",
                glowColor === "yellow" ? "bg-primary" : glowColor === "cyan" ? "bg-secondary" : "bg-accent"
            )} style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}></div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}
