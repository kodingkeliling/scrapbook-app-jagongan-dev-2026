import React from "react";
import { cn } from "@/lib/utils";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent";
}

export default function CyberButton({
    children,
    className,
    variant = "primary",
    ...props
}: CyberButtonProps) {
    const variants = {
        primary: "bg-primary text-black hover:bg-yellow-400",
        secondary: "bg-secondary text-black hover:bg-cyan-400",
        accent: "bg-accent text-white hover:bg-red-600",
    };

    return (
        <button
            className={cn(
                "relative px-6 py-2 font-bold uppercase tracking-widest transition-all clip-path-cyber active:translate-y-1 active:translate-x-1",
                variants[variant],
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute top-0 right-0 w-2 h-2 bg-black clip-path-cyber"></div>
        </button>
    );
}
