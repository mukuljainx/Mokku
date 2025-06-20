import React, { useEffect, useMemo, useRef, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { MethodBadge } from "./MethodBadge";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { allMethods } from "./constant";
import { ILog } from "@mokku/types";
import { IoRefreshOutline } from "react-icons/io5";
import "./LogsTable.css";

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

    const onActionClick = () => {
        chrome.tabs.query({ url: "http://localhost:5173/*" }, (tabs) => {
            console.log(tabs);

            // chrome.tabs.highlight(
            //     {
            //         tabs: tabs[0].index,
            //         windowId: tabs[0].windowId,
            //     },
            //     console.log,
            // );
            chrome.windows.update(
                tabs[0].windowId,
                {
                    focused: true,
                },
                () => {
                    chrome.tabs.update(tabs[0].id, {
                        active: true,
                        highlighted: true,
                        url: "http://localhost:5173/mock",
                    });
                },
            );
        });
    };

    // Load initial data on mount
    useEffect(() => {}, []);

    // Derived/Memoized data for performance, applying local filters before TanStack's global filter
    const filteredData = useMemo(() => {
        let result = data;
        if (methodFilter !== "All") {
            result = result.filter(
                (log) => log.request.method === methodFilter,
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

    const columns = useMemo(
        () => [
            {
                accessorKey: "response.status",
                id: "status",
                header: "Status",
                cell: (info) => <StatusBadge status={info.getValue()} />,
            },
            {
                accessorKey: "request.url",
                id: "url",
                header: "URL",
                cell: (info) => (
                    <span className="logs-table-url-cell">
                        {info.getValue()}
                    </span>
                ),
            },
            {
                accessorKey: "request.method",
                id: "method",
                header: "Method",
                cell: (info) => <MethodBadge method={info.getValue()} />,
            },
            {
                id: "action",
                header: () => (
                    <div className="logs-table-action-header">Action</div>
                ),
                cell: () => (
                    <div className="logs-table-action-cell">
                        <button
                            className="logs-table-mock-button"
                            onClick={onActionClick}
                        >
                            Mock
                        </button>
                    </div>
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { globalFilter: search },
        onGlobalFilterChange: setSearch,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const tableContainerRef = useRef(null);
    const { rows } = table.getRowModel();

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => tableContainerRef.current,
        estimateSize: () => 50,
    });

    const { getVirtualItems, getTotalSize } = rowVirtualizer;

    const totalSize = getTotalSize();
    const virtualRows = getVirtualItems();

    const paddingTop =
        virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom =
        virtualRows.length > 0
            ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
            : 0;

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
                            <FiTrash2 />
                            <span>Clear</span>
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="logs-table-refresh-button"
                        >
                            <IoRefreshOutline />
                        </button>
                    </div>
                </header>

                {/* Filters */}
                <div className="logs-table-filters-section">
                    <div className="logs-table-search-container">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            value={search ?? ""}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search all columns..."
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

                {/* Virtualized Table */}
                <div
                    ref={tableContainerRef}
                    className="logs-table-virtualized-container"
                >
                    <table className="logs-table-element">
                        <thead className="logs-table-head">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(
                                        (header, index) => (
                                            <th
                                                key={header.id}
                                                scope="col"
                                                className={`logs-table-th cell-${columns[index].id}`}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </th>
                                        ),
                                    )}
                                </tr>
                            ))}
                        </thead>
                        <tbody
                            className="logs-table-body"
                            style={{
                                height: `${totalSize}px`,
                                position: "relative",
                            }}
                        >
                            {paddingTop > 0 && (
                                <tr style={{ height: `${paddingTop}px` }}>
                                    <td colSpan={columns.length} />
                                </tr>
                            )}
                            {virtualRows.map((virtualRow) => {
                                const row = rows[virtualRow.index];
                                return (
                                    <tr
                                        key={row.id}
                                        className="logs-table-row"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell, index) => (
                                                <td
                                                    key={cell.id}
                                                    className={`logs-table-td  cell-${columns[index].id}`}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                );
                            })}
                            {paddingBottom > 0 && (
                                <tr style={{ height: `${paddingBottom}px` }}>
                                    <td colSpan={columns.length} />
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
