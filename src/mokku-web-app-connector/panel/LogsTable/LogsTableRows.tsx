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
import { SidebarDraggable } from "../SidebarDraggable/SidebarDraggable";
import { LogDetails } from "./LogDetails";
import { urlConstants } from "../../constants";

interface LogsTableRowsProps {
    filteredData: ILog[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    logMap: Record<string, ILog>;
}

export const LogsTableRows = ({
    filteredData,
    search,
    setSearch,
    logMap,
}: LogsTableRowsProps) => {
    const [log, setLog] = React.useState<ILog>();

    const columns = React.useMemo(
        () => [
            {
                accessorKey: "isMocked",
                id: "mock-status",
                header: "",
                cell: (info) => {
                    return (
                        <span className="logs-table-mock-status-cell">
                            {info.getValue() ? (
                                <FiCpu />
                            ) : (
                                <MdNetworkWifi2Bar />
                            )}
                        </span>
                    );
                },
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
                cell: (info) => {
                    return (
                        <div className="logs-table-action-cell">
                            {info.row.original.isMocked ? (
                                <button
                                    data-log-index={info.row.index}
                                    className="logs-table-mock-button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        onActionClick(info.row.original);
                                    }}
                                >
                                    Edit Mock
                                </button>
                            ) : (
                                <button
                                    data-log-index={info.row.index}
                                    className="logs-table-mock-button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        onActionClick(info.row.original);
                                    }}
                                >
                                    Mock
                                </button>
                            )}
                        </div>
                    );
                },
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

    const onActionClick = (log: ILog) => {
        chrome.tabs.query({ url: urlConstants.getQueryUrl() }, (tabs) => {
            const sendMockToTab = (tab: chrome.tabs.Tab) => {
                setTimeout(() => {
                    chrome.tabs.sendMessage(tab.id, {
                        type: "NEW_MOCK",
                        data: log,
                    });
                }, 500);
            };

            if (tabs.length === 0) {
                chrome.tabs.create(
                    {
                        url: urlConstants.getNewMockUrl(log.projectId),
                    },
                    sendMockToTab,
                );
                return;
            }
            chrome.windows.update(
                tabs[0].windowId,
                {
                    focused: true,
                },
                () => {
                    chrome.tabs.update(
                        tabs[0].id,
                        {
                            active: true,
                            highlighted: true,
                            url: urlConstants.getNewMockUrl(log.projectId),
                        },
                        sendMockToTab,
                    );
                },
            );
        });
    };

    const openLog = (event: React.MouseEvent) => {
        const index = event.currentTarget.getAttribute("data-log-index");
        setLog(filteredData[index]);
    };

    return (
        <>
            <div
                ref={tableContainerRef}
                className="logs-table-virtualized-container"
            >
                {log && (
                    <SidebarDraggable>
                        <LogDetails
                            log={log}
                            onClose={() => setLog(undefined)}
                        />
                    </SidebarDraggable>
                )}
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
                                                  header.column.columnDef
                                                      .header,
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
                                    onClick={openLog}
                                    data-log-index={virtualRow.index}
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
        </>
    );
};
