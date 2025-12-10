import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { Info } from "lucide-react";
import React from "react";

export const TimeRender: React.FC<{
    time?: number;
    baseTime?: number;
}> = ({ time, baseTime }) => {
    if (time === undefined || time === null) {
        return <>-</>;
    }

    const adjustedTime = baseTime ? time - baseTime : time;
    const formattedTime = adjustedTime;
    return (
        <div
            title={formattedTime + " ms"}
            className="w-full flex items-center gap-1"
        >
            <div className="text-ellipsis overflow-hidden">{formattedTime}</div>{" "}
            ms
            {formattedTime === 0 && (
                <SimpleTooltip content="This is the base time for all log entries. It is subtracted from the request time to show the time taken from the first request.">
                    <Info className="size-3" />
                </SimpleTooltip>
            )}
        </div>
    );
};
