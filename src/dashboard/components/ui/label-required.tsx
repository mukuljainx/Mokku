import { Info } from "lucide-react";
import { Label } from "./label";
import { TooltipTrigger, Tooltip, TooltipContent } from "./tooltip";

interface LabelRequiredProps extends React.ComponentProps<typeof Label> {
    required?: boolean;
    info?: string;
}

export const LabelRequired = ({
    required,
    children,
    info,
    ...props
}: LabelRequiredProps) => (
    <span className="flex items-center gap-1">
        <Label {...props}>
            {children}
            {required && (
                <span className="text-red-500 relative -left-2 -top-1">*</span>
            )}
        </Label>
        {info && (
            <Tooltip>
                <TooltipTrigger>
                    <Info className="size-4 relative top-[0.5px]" />
                </TooltipTrigger>
                <TooltipContent portal>{info}</TooltipContent>
            </Tooltip>
        )}
    </span>
);
