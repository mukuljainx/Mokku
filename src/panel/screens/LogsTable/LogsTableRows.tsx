import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import * as React from "react";
import { SidebarDraggable } from "../SidebarDraggable/SidebarDraggable";
import { LogDetails } from "./LogDetails";
import { ILog } from "@/types";
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
} from "@/components/ui/table";
import "./LogsTableRow.css";
import { useLogTableColumns } from "./useLogTableColumns";

interface LogsTableRowsProps {
    filteredData: ILog[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    baseTime?: number;
}

export const LogsTableRows = ({
    filteredData,
    search,
    setSearch,
    baseTime,
}: LogsTableRowsProps) => {
    const [log, setLog] = React.useState<ILog>();
    const [
        columnVisibility,
        setColumnVisibility,
    ] = React.useState<VisibilityState>({
        "mock-status": true,
        method: true,
        url: true,
        status: true,
        action: true,
        "request-time": true,
        "response-time": true,
    });

    const toggleColumn = React.useCallback((columnId: string) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [columnId]: !prev[columnId],
        }));
    }, []);

    const columns = useLogTableColumns({
        columnVisibility,
        toggleColumn,
        baseTime,
    });

    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            globalFilter: search,
            sorting,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
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

    const openLog = (event: React.MouseEvent) => {
        const index = parseInt(
            event.currentTarget.getAttribute("data-log-index") || "",
        );
        if (index !== null && index !== undefined && !isNaN(index)) {
            setLog(filteredData[index]);
        }
    };

    return (
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
                    <LogDetails log={log} onClose={() => setLog(undefined)} />
                </SidebarDraggable>
            )}
            <Table className="w-full logs-table-element">
                <TableHeader className="sticky top-0 z-50 w-full">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="logs-table-head w-full"
                        >
                            {headerGroup.headers.map((header, index) => (
                                <TableHead
                                    key={header.id}
                                    // scope="col"
                                    className={`logs-table-th cell-${header.id}`}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
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
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={`logs-table-td  cell-${cell.column.id}`}
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
    );
};
