
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
            <TooltipContent className="max-w-80" portal={true}>
                <p >{content}</p>
            </TooltipContent>
        </Tooltip>
    );
};
