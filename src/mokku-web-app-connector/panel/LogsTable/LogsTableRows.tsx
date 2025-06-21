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
import { FiCpu } from "react-icons/fi";
import { MdNetworkWifi2Bar } from "react-icons/md";

import { ILog } from "@mokku/types";
import * as React from "react";

interface LogsTableRowsProps {
    filteredData: ILog[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const LogsTableRows = ({
    filteredData,
    search,
    setSearch,
}: LogsTableRowsProps) => {
    const columns = React.useMemo(
        () => [
            {
                accessorKey: "isMocked",
                id: "mock-status",
                header: "",
                cell: (info) => (
                    <span className="logs-table-mock-status-cell">
                        {info.getValue() ? <FiCpu /> : <MdNetworkWifi2Bar />}
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
                accessorKey: "response.status",
                id: "status",
                header: "Status",
                cell: (info) => <StatusBadge status={info.getValue()} />,
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

    const tableContainerRef = React.useRef(null);
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

    return (
        <div
            ref={tableContainerRef}
            className="logs-table-virtualized-container"
        >
            <table className="logs-table-element">
                <thead className="logs-table-head">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    key={header.id}
                                    scope="col"
                                    className={`logs-table-th cell-${columns[index].id}`}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
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
                                {row.getVisibleCells().map((cell, index) => (
                                    <td
                                        key={cell.id}
                                        className={`logs-table-td  cell-${columns[index].id}`}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
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
    );
};
