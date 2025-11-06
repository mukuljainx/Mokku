import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { ILog } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Cpu, Heading2, Server } from "lucide-react";
import React from "react";
import { SortableHeader } from "./SortableHeader";
import { Button } from "@/components/ui/button";
import { ColumnSelector } from "./ColumnSelector";
import { StatusBadge } from "./StatusBadge";
import { parseJSONIfPossible, urlConstants } from "@/lib";
import { TimeRender } from "./TimeRender";
import { openApp, sendMessageToApp } from "@/services/app";
import { Badge } from "@/components/ui/badge";
import { LogActions } from "./LogAction";

export const useLogTableColumns = ({
    columnVisibility,
    toggleColumn,
    baseTime,
}: {
    columnVisibility: Record<string, boolean>;
    toggleColumn: (columnId: string) => void;
    baseTime?: number;
}) => {
    const onActionClick = (type: "MOCK" | "HEADER", log: ILog) => {
        chrome.tabs.query({ url: urlConstants.getQueryUrl() }, (tabs) => {
            const sendMockToTab = (tab?: chrome.tabs.Tab) => {
                setTimeout(() => {
                    if (tab?.id) {
                        sendMessageToApp(tab.id, {
                            type: "ADD_EDIT_MOCK",
                            data: log,
                        });
                    }
                }, 1500);
            };

            let url = "";
            if (type === "MOCK") {
                url = urlConstants.getMockDetailsUrl(
                    log.mockData?.localId,
                    log.mockData?.projectLocalId
                );
            } else {
                url = urlConstants.getHeaderDetailsUrl(
                    log.headerData?.localId,
                    log.headerData?.projectLocalId
                );
            }

            openApp({ onSuccess: sendMockToTab, url });
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
                accessorKey: "status",
                id: "mock-status",
                header: "",
                cell: (info) => {
                    const status = info.getValue() as ILog["status"];
                    return (
                        <span className="logs-table-mock-status-cell flex items-center justify-center">
                            {status === "MOCKED" && (
                                <SimpleTooltip content="Mocked call">
                                    <Cpu className="size-4 text-blue-400" />
                                </SimpleTooltip>
                            )}
                            {status === "HEADERS_MODIFIED" && (
                                <SimpleTooltip content="Headers Modified">
                                    <Heading2 className="size-4 text-blue-400" />
                                </SimpleTooltip>
                            )}
                            {!status && (
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
                accessorFn: (row) => {
                    if (row.request?.method === "POST" && row.request.body) {
                        const { json } = parseJSONIfPossible(
                            row.request.body || ""
                        );
                        if (
                            json?.operationName &&
                            typeof json.operationName === "string"
                        ) {
                            return "GraphQL";
                        }
                    }

                    return row.request?.method || "";
                },
            },
            {
                accessorKey: "request.url",
                id: "url",
                header: ({ column }) => (
                    <SortableHeader column={column} name="URL / Operation" />
                ),
                accessorFn: (row) => {
                    if (row.request?.method === "POST" && row.request.body) {
                        const { json } = parseJSONIfPossible(
                            row.request.body || ""
                        );
                        if (
                            json?.operationName &&
                            typeof json.operationName === "string"
                        ) {
                            return {
                                graphqlOperation: json.operationName,
                                url: null,
                            };
                        }
                    }

                    return {
                        graphqlOperation: null,
                        url: row.request?.url || "",
                    };
                },
                cell: (info) => {
                    const { graphqlOperation, url } = info.getValue();

                    return (
                        <span
                            title={graphqlOperation || url}
                            className="logs-table-url-cell"
                        >
                            {graphqlOperation && graphqlOperation}
                            {url && url}
                        </span>
                    );
                },
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

                cell: (info) => (
                    <LogActions
                        log={info.row.original}
                        index={info.row.index}
                        onActionClick={onActionClick}
                    />
                ),
            },
        ],
        [columnConfig, baseTime, onActionClick]
    );

    return columns;
};
