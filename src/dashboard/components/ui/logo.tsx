import { Cpu } from "lucide-react";
import { cn } from "@/dashboard/lib";

interface LogoProps {
    iconOnly?: boolean;
    small?: boolean;
}

export const Logo = ({ iconOnly, small }: LogoProps) => {
    if (iconOnly) {
        return (
            <span className="p-2 rounded-full bg-black text-white">
                <Cpu className={cn(small && "size-4")} />
            </span>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-black text-white relative top-1">
                <Cpu className={cn(small && "size-4")} />
            </span>
            {!iconOnly && (
                <h2
                    className={cn(
                        "text-3xl underline underline-offset-8",
                        small && "text-2xl"
                    )}
                >
                    Mokku
                </h2>
            )}
        </div>
    );
};
