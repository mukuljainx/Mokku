import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/dashboard/components/ui/tooltip";
import { Info } from "lucide-react";
import { DEFAULT_DISALLOWED_APIS } from "./constant";
import { Separator } from "@/dashboard/components/ui/separator";

export const FunctionEditorDisabledTooltip = () => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <Info className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
                <h4 className="text-base">The Following API's are disabled</h4>
                <ul className="mt-2">
                    {DEFAULT_DISALLOWED_APIS.map((api) => (
                        <li key={api}>{api}</li>
                    ))}
                </ul>
                <Separator className="my-2" />
            </TooltipContent>
        </Tooltip>
    );
};
