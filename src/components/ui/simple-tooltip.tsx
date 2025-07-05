
import React, { type ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export const SimpleTooltip = ({
    children,
    content,
    asChild = false,
    portal = true,
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
            <TooltipTrigger asChild={false} className={className}>
                {children}
            </TooltipTrigger>
            <TooltipContent portal={true}>
                <p className="max-w-80">{content}</p>
            </TooltipContent>
        </Tooltip>
    );
};
