import React, { useMemo, useState } from "react";
import { allMethods } from "./constant";
import { LogsTableRows } from "./LogsTableRows";
import { ILog } from "@/types";
import { LayoutTemplate, RefreshCcw, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const LogsTable = ({
    data,
    clearData,
}: {
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
                (log) => log.request?.method === methodFilter,
            );
        }
        if (statusFilter !== "ALL") {
            const statusPrefix = statusFilter.slice(0, 1); // e.g., '2' for '2xx'
            result = result.filter((log) =>
                String(log.response?.status).startsWith(statusPrefix),
            );
        }
        return result;
    }, [data, methodFilter, statusFilter]);

    return (
        <div className="logs-table-page-container">
            <div className="logs-table-main-box">
                {/* Filters */}
                <div className="flex justify-between p-2">
                    <div className="flex gap-2">
                        <div className="relative flex items-center">
                            <Search className="absolute size-4 ml-2" />
                            <Input
                                type="text"
                                value={search ?? ""}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search all logs..."
                                className="pl-7"
                            />
                        </div>
                        <Select
                            onValueChange={(value) => setMethodFilter(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All</SelectItem>
                                {allMethods.map((method) => (
                                    <SelectItem key={method} value={method}>
                                        {method}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            onValueChange={(value) => setStatusFilter(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All</SelectItem>
                                <SelectItem value="2xx">2xx Success</SelectItem>
                                <SelectItem value="3xx">
                                    3xx Redirection
                                </SelectItem>
                                <SelectItem value="4xx">
                                    4xx Client Error
                                </SelectItem>
                                <SelectItem value="5xx">
                                    5xx Server Error
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            size="sm"
                            onClick={clearData}
                            className="logs-table-clear-Button"
                        >
                            <Trash2 />
                            <span>Clear</span>
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => window.location.reload()}
                            className="logs-table-refresh-Button"
                        >
                            <RefreshCcw />
                        </Button>
                    </div>
                </div>
                {filteredData.length === 0 && data.length === 0 && (
                    <div className="logs-empty-state-container">
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
                    <div className="logs-empty-state-container mx-2 py-10 text-center border rounded-sm">
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
                        filteredData={filteredData}
                        search={search}
                        setSearch={setSearch}
                    />
                )}
            </div>
        </div>
    );
};
