import * as React from "react";

export const StatusBadge = ({ status }: { status: string }) => {
    const statusCode = parseInt(status, 10);
    let modifierClass = "status-badge--default"; // Default gray badge
    if (statusCode >= 200 && statusCode < 300)
        modifierClass = "status-badge--success";
    // Green for 2xx
    else if (statusCode >= 400 && statusCode < 500)
        modifierClass = "status-badge--client-error";
    // Yellow for 4xx
    else if (statusCode >= 500) modifierClass = "status-badge--server-error"; // Red for 5xx

    return <span className={`status-badge ${modifierClass}`}>{status}</span>;
};
