import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { ILog } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Cpu, Server } from "lucide-react";
import React from "react";
import { SortableHeader } from "./SortableHeader";
import { Button } from "@/components/ui/button";
import { ColumnSelector } from "./ColumnSelector";
import { StatusBadge } from "./StatusBadge";
import { urlConstants } from "@/lib";
import { TimeRender } from "./TimeRender";
import { openApp, sendMessageToApp } from "@/services/app";

export const useLogTableColumns = ({
    columnVisibility,
    toggleColumn,
    baseTime,
}: {
    columnVisibility: Record<string, boolean>;
    toggleColumn: (columnId: string) => void;
    baseTime?: number;
}) => {
    const onActionClick = (log: ILog) => {
        chrome.tabs.query({ url: urlConstants.getQueryUrl() }, (tabs) => {
            const sendMockToTab = (tab?: chrome.tabs.Tab) => {
                setTimeout(() => {
                    if (tab?.id) {
                        sendMessageToApp(tab.id, {
                            type: "ADD_EDIT_MOCK",
                            data: log,
                        });
                    }
                }, 500);
            };

            const projectUrl = urlConstants.getMockDetailsUrl(
                log.projectLocalId,
                log.mockLocalId
            );

            openApp({ onSuccess: sendMockToTab, url: projectUrl });
        });
    };

    const columnConfig = React.useMemo(
        () => [
            {
                id: "mock-status",
                label: "Mocked Status",
                isVisible: columnVisibility["mock-status"],
            },
            {
                id: "method",
                label: "Method",
                isVisible: columnVisibility["method"],
            },
            { id: "url", label: "URL", isVisible: columnVisibility["url"] },
            {
                id: "request-time",
                label: "Start Time",
                isVisible: columnVisibility["request-time"],
            },
            {
                id: "response-time",
                label: "End Time",
                isVisible: columnVisibility["response-time"],
            },
            {
                id: "status",
                label: "Status",
                isVisible: columnVisibility["status"],
            },
        ],
        [columnVisibility]
    );

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
                header: ({ column }) => (
                    <SortableHeader column={column} name="Method" />
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "request.url",
                id: "url",
                header: ({ column }) => (
                    <SortableHeader column={column} name="URL" />
                ),
                cell: (info) => (
                    <span
                        title={info.getValue()}
                        className="logs-table-url-cell"
                    >
                        {info.getValue()}
                    </span>
                ),
            },
            {
                accessorKey: "response.status",
                id: "status",
                header: ({ column }) => (
                    <SortableHeader column={column} name="Status" />
                ),
                accessorFn: (row) =>
                    row.response?.status?.toString() ?? "pending",
                cell: (info) => <StatusBadge status={info.getValue()} />,
            },
            {
                accessorKey: "request.time",
                id: "request-time",
                header: ({ column }) => (
                    <SortableHeader column={column} name="Start Time" />
                ),
                cell: (info) => (
                    <TimeRender time={info.getValue()} baseTime={baseTime} />
                ),
            },
            {
                accessorKey: "response.time",
                accessorFn: (row) => row.response?.time,
                id: "response-time",
                header: ({ column }) => (
                    <SortableHeader column={column} name="End Time" />
                ),
                cell: (info) => (
                    <TimeRender time={info.getValue()} baseTime={baseTime} />
                ),
            },
            {
                id: "action",
                header: () => (
                    <div className="logs-table-action-header flex justify-between items-center w-full gap-2">
                        Action
                        <ColumnSelector
                            columns={columnConfig}
                            onColumnToggle={toggleColumn}
                        />
                    </div>
                ),
                cell: (info) => {
                    return (
                        <div className="logs-table-action-cell">
                            {info.row.original.isMocked ? (
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
                                    Add Mock
                                </Button>
                            )}
                        </div>
                    );
                },
            },
        ],
        [columnConfig, baseTime]
    );

    return columns;
};
