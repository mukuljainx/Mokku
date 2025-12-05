import React, { useMemo, useState } from "react";
import { LogsTableRows } from "./LogsTableRows";
import { ILog } from "@/types";
import { LayoutTemplate } from "lucide-react";
import { LogTableFilter } from "./LogTableFilter";

export const LogsTable = ({
    data,
    clearData,
    baseTime,
}: {
    baseTime?: number;
    data: ILog[];
    clearData: () => void;
}) => {
    const [search, setSearch] = React.useState("");
    const [methodFilter, setMethodFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Derived/Memoized data for performance, applying local filters before TanStack's global filter
    const filteredData = useMemo(() => {
        let result = data;
        if (methodFilter !== "ALL") {
            result = result.filter(
                (log) => log.request?.method === methodFilter
            );
        }
        if (statusFilter !== "ALL") {
            const statusPrefix = statusFilter.slice(0, 1); // e.g., '2' for '2xx'
            result = result.filter((log) =>
                String(log.response?.status).startsWith(statusPrefix)
            );
        }
        return result;
    }, [data, methodFilter, statusFilter]);

    return (
        <div className="logs-table-page-container px-2 h-full flex flex-col">
            <div className="logs-table-main-box flex-1 min-h-0 flex flex-col">
                {/* Filters */}
                <LogTableFilter
                    search={search}
                    setSearch={setSearch}
                    setStatusFilter={setStatusFilter}
                    setMethodFilter={setMethodFilter}
                    clearData={clearData}
                />
                {filteredData.length === 0 && data.length === 0 && (
                    <div className="py-10 text-center border rounded-sm">
                        <div className="flex flex-col items-center gap-2">
                            <LayoutTemplate />
                            <p className="text-sm">
                                No Logs! Perform a request or reload the page to
                                see logs here.
                            </p>
                        </div>
                    </div>
                )}
                {filteredData.length === 0 && data.length > 0 && (
                    <div className="py-10 text-center border rounded-sm">
                        <div className="flex flex-col items-center gap-2">
                            <LayoutTemplate />
                            <p className="text-sm">
                                No Logs! Try removing the applied filters.
                            </p>
                        </div>
                    </div>
                )}
                {filteredData.length > 0 && (
                    <LogsTableRows
                        baseTime={baseTime}
                        filteredData={filteredData}
                        search={search}
                        setSearch={setSearch}
                    />
                )}
            </div>
        </div>
    );
};
