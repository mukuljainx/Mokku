import * as React from "react";

const methodColors = {
    GET: "text-cyan-400",
    POST: "text-purple-400",
    PUT: "text-orange-400",
    DELETE: "text-red-400",
    PATCH: "text-yellow-400",
    OPTIONS: "text-gray-400",
};

export const MethodBadge = ({
    method,
}: {
    method: keyof typeof methodColors;
}) => {
    return (
        <span
            className={`text-sm font-medium ${
                methodColors[method] || "text-gray-300"
            }`}
        >
            {method}
        </span>
    );
};
