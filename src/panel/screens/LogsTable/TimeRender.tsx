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
    return <>{formattedTime}</>;
};
