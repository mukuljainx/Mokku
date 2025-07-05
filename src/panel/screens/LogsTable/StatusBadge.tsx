import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib";
import * as React from "react";

export const StatusBadge = ({ status }: { status: string }) => {
    const statusCode = parseInt(status, 10);
    let badgeStatus = ""; // Default gray badge
    // Green for 2xx
    // Green for 3xx
    if (statusCode >= 200 && statusCode < 400) badgeStatus = "success";
    // Yellow for 4xx
    else if (statusCode >= 400 && statusCode < 500) badgeStatus = "warning";
    else if (statusCode >= 500) badgeStatus = "danger";

    return (
        <Badge
            className={cn(
                badgeStatus === "" && "bg-gray-100 text-gray-700",
                badgeStatus === "success" && "bg-green-100 text-green-700",
                badgeStatus === "warning" && "bg-yellow-100 text-yellow-700",
                badgeStatus === "danger" && "bg-red-100 text-red-700",
            )}
        >
            {status}
        </Badge>
    );
};
