import React, { useMemo, useState } from "react";
import { allMethods } from "./constant";
import "./LogsTable.css";
import { LogsTableRows } from "./LogsTableRows";
import { ILog } from "@/types";
import { RefreshCcw, Search, Trash2 } from "lucide-react";

export const LogsTable = ({
    data,
    clearData,
}: {
    data: ILog[];
    clearData: () => void;
}) => {
    const [search, setSearch] = React.useState("");
    const [methodFilter, setMethodFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // Derived/Memoized data for performance, applying local filters before TanStack's global filter
    const filteredData = useMemo(() => {
        let result = data;
        if (methodFilter !== "All") {
            result = result.filter(
                (log) => log.request?.method === methodFilter,
            );
        }
        if (statusFilter !== "All") {
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
                {/* Header */}
                <header className="logs-table-header-section">
                    <div className="logs-table-header-title-group">
                        <h1 className="logs-table-title">Mokku Logs</h1>
                    </div>
                    <div className="logs-table-header-action-group">
                        <button
                            onClick={clearData}
                            className="logs-table-clear-button"
                        >
                            <Trash2 />
                            <span>Clear</span>
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="logs-table-refresh-button"
                        >
                            <RefreshCcw />
                        </button>
                    </div>
                </header>

                {/* Filters */}
                <div className="logs-table-filters-section">
                    <div className="logs-table-search-container">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            value={search ?? ""}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search all logs..."
                            className="logs-table-search-input"
                        />
                    </div>
                    <select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        className="logs-table-select-filter"
                    >
                        <option>All</option>
                        {allMethods.map((m) => (
                            <option key={m}>{m}</option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="logs-table-select-filter"
                    >
                        <option>All</option>
                        <option value="2xx">2xx Success</option>
                        <option value="3xx">3xx Redirection</option>
                        <option value="4xx">4xx Client Error</option>
                        <option value="5xx">5xx Server Error</option>
                    </select>
                </div>
                {filteredData.length === 0 && data.length === 0 && (
                    <div className="logs-empty-state-container">
                        <p>
                            No Logs! Perform a request or reload the page to see
                            logs here.
                        </p>
                    </div>
                )}
                {filteredData.length === 0 && data.length > 0 && (
                    <div className="logs-empty-state-container">
                        <p>No Logs! Try removing the applied filters.</p>
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
