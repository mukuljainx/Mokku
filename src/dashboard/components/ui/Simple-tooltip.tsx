import { type ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export const SimpleTooltip = ({
    children,
    content,
    asChild = true,
    portal,
    className,
}: {
    children: ReactNode;
    content: string;
    asChild?: boolean;
    portal?: boolean;
    className?: string;
}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild={asChild} className={className}>
                {children}
            </TooltipTrigger>
            <TooltipContent portal={portal}>
                <p className="max-w-80">{content}</p>
            </TooltipContent>
        </Tooltip>
    );
};
