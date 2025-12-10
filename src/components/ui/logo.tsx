import React from "react";
import { Cpu } from "lucide-react";
import { cn } from "@/lib";

interface LogoProps {
    iconOnly?: boolean;
    small?: boolean;
    className?: string;
}

export const Logo = ({ iconOnly, small, className }: LogoProps) => {
    if (iconOnly) {
        return (
            <span
                className={cn(
                    "p-2 rounded-full bg-black text-white",
                    className,
                )}
            >
                <Cpu className={cn(small && "size-4")} />
            </span>
        );
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span className="p-2 rounded-full bg-black text-white relative top-1">
                <Cpu className={cn(small && "size-4")} />
            </span>

            <h2
                className={cn(
                    "text-3xl underline underline-offset-8",
                    small && "text-2xl",
                )}
            >
                Mokku
            </h2>
        </div>
    );
};
