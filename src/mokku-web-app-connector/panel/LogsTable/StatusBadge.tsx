import React from "react";

export const StatusBadge = ({ status }) => {
    const statusCode = parseInt(status, 10);
    let colorClasses = "bg-gray-500/20 text-gray-300";
    if (statusCode >= 200 && statusCode < 300)
        colorClasses = "bg-green-500/20 text-green-300";
    else if (statusCode >= 400 && statusCode < 500)
        colorClasses = "bg-yellow-500/20 text-yellow-300";
    else if (statusCode >= 500) colorClasses = "bg-red-500/20 text-red-300";

    return (
        <span
            className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses}`}
        >
            {status}
        </span>
    );
};
