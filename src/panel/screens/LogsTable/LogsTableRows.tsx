import { StatusBadge } from "./StatusBadge";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import * as React from "react";
import { SidebarDraggable } from "../SidebarDraggable/SidebarDraggable";
import { LogDetails } from "./LogDetails";
import { ILog } from "@/types";
import { Cpu, Server } from "lucide-react";
import { urlConstants } from "@/lib";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
} from "@/components/ui/table";
import "./LogsTableRow.css";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";

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
    const [log, setLog] = React.useState<ILog>();

    // React.useEffect(() => {
    //     setLog(filteredData[0]);
    // }, [filteredData]);

    const columns: ColumnDef<ILog, any>[] = React.useMemo(
        () => [
            {
                accessorKey: "isMocked",
                id: "mock-status",
                header: "",
                cell: (info) => {
                    return (
                        <span className="logs-table-mock-status-cell flex items-center justify-center">
                            {info.getValue() ? (
                                <SimpleTooltip content="Mocked call">
                                    <Cpu className="size-4 text-blue-400" />
                                </SimpleTooltip>
                            ) : (
                                <SimpleTooltip content="Network call">
                                    <Server className="size-4 text-gray-600" />
                                </SimpleTooltip>
                            )}
                        </span>
                    );
                },
            },
            {
                accessorKey: "request.method",
                id: "method",
                header: "Method",
                cell: (info) => info.getValue(),
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
                            {!info.row.original.isMocked ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    data-log-index={info.row.index}
                                    className="px-4"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        onActionClick(info.row.original);
                                    }}
                                >
                                    Edit Mock
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    data-log-index={info.row.index}
                                    className="px-4"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        onActionClick(info.row.original);
                                    }}
                                >
                                    Mock
                                </Button>
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
            const sendMockToTab = (tab?: chrome.tabs.Tab) => {
                setTimeout(() => {
                    if (tab?.id) {
                        chrome.tabs.sendMessage(tab.id, {
                            type: "NEW_MOCK",
                            data: log,
                        });
                    }
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
                    if (tabs[0].id) {
                        chrome.tabs.update(
                            tabs[0].id,
                            {
                                active: true,
                                highlighted: true,
                                url: urlConstants.getNewMockUrl(log.projectId),
                            },
                            sendMockToTab,
                        );
                    }
                },
            );
        });
    };

    const openLog = (event: React.MouseEvent) => {
        const index = parseInt(
            event.currentTarget.getAttribute("data-log-index") || "",
        );
        if (index !== null && index !== undefined && !isNaN(index)) {
            setLog(filteredData[index]);
        }
    };

    return (
        <>
            <div
                ref={tableContainerRef}
                className="logs-table-virtualized-container border rounded-sm"
            >
                {log && (
                    <SidebarDraggable
                        onClose={() => setLog(undefined)}
                        width="80%"
                        minWidth={120}
                    >
                        <LogDetails
                            log={log}
                            onClose={() => setLog(undefined)}
                        />
                    </SidebarDraggable>
                )}
                <Table className="w-full logs-table-element">
                    <TableHeader className="sticky top-0 z-50 w-full">
                        {/* <TableRow className="logs-table-head flex sticky top-0 z-50"> */}
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="logs-table-head w-full"
                            >
                                {headerGroup.headers.map((header, index) => (
                                    <TableHead
                                        key={header.id}
                                        // scope="col"
                                        className={`logs-table-th cell-${columns[index].id}`}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                        {/* </TableRow> */}
                    </TableHeader>
                    <TableBody
                        className="logs-table-body"
                        style={{
                            height: `${totalSize}px`,
                            position: "relative",
                        }}
                    >
                        {paddingTop > 0 && (
                            <TableRow style={{ height: `${paddingTop}px` }}>
                                <TableCell colSpan={columns.length} />
                            </TableRow>
                        )}
                        {virtualRows.map((virtualRow) => {
                            const row = rows[virtualRow.index];
                            return (
                                <TableRow
                                    onClick={openLog}
                                    data-log-index={virtualRow.index}
                                    key={row.id}
                                    className="logs-table-row cursor-pointer odd:bg-gray-50 hover:bg-gray-200"
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
                                            <TableCell
                                                key={cell.id}
                                                className={`logs-table-td  cell-${columns[index].id}`}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            );
                        })}
                        {paddingBottom > 0 && (
                            <tr style={{ height: `${paddingBottom}px` }}>
                                <td colSpan={columns.length} />
                            </tr>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
