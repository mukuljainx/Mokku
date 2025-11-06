import { useCallback, useEffect, useRef, useState } from "react";
import { IHeader, ILog, IMock } from "@/types";
import { MessageService } from "@/lib";
import { useAppStore } from "./useAppStore";

const messageService = new MessageService("PANEL");

export const useLogs = () => {
    const [logs, setLogs] = useState<number[]>([]);
    const [baseTime, setBaseTime] = useState<number>();
    const [logsMap, setLogsMap] = useState<Record<number, ILog>>({});
    const idSetRef = useRef(new Set<number>());
    const { tab } = useAppStore();

    const clearData = useCallback(() => {
        setLogs([]);
        setLogsMap({});
        setBaseTime(undefined);
        idSetRef.current = new Set<number>();
    }, []);

    useEffect(() => {
        messageService.listen((data, sender) => {
            const senderTab = sender?.tab as chrome.tabs.Tab;
            console.log("Mokku Panel: Message received", data);

            if (senderTab.id !== tab.id) {
                return;
            }

            if (data.type === "LOG") {
                const log = data.data as ILog;
                const logId = log.id;

                if (logId === undefined) {
                    return;
                }

                if (!idSetRef.current.has(logId)) {
                    idSetRef.current.add(logId);
                    setLogs((logs) => [logId, ...logs]);
                }

                setBaseTime((prevVaseTime) => {
                    if (prevVaseTime === undefined) {
                        return log.request?.time;
                    }

                    return prevVaseTime;
                });

                setLogsMap((logsMap) => ({
                    ...logsMap,
                    [logId]: { ...logsMap[logId], ...log },
                }));
            } else if (data.type === "LOG_MOCK_STATUS") {
                const { log, mock } = data.data as { log: ILog; mock: IMock };
                const logId = log.id;
                if (logId === undefined) {
                    return;
                }
                if (idSetRef.current.has(logId)) {
                    console.log(
                        "Updating log mock status",
                        mock?.projectLocalId
                    );
                    setLogsMap((logsMap) => ({
                        ...logsMap,
                        [logId]: {
                            ...logsMap[logId],
                            status: mock?.active ? "MOCKED" : undefined,
                            mockData: mock?.localId
                                ? {
                                      localId: mock?.localId,
                                      projectLocalId: mock?.projectLocalId,
                                  }
                                : undefined,
                        },
                    }));
                }
            } else if (data.type === "LOG_HEADER_STATUS") {
                const { log, header } = data.data as {
                    log: ILog;
                    header: IHeader;
                };

                const logId = log.id;
                if (logId === undefined || !header) {
                    console.log("No logId or header found");
                    return;
                }
                if (idSetRef.current.has(logId)) {
                    setLogsMap((logsMap) => ({
                        ...logsMap,
                        [logId]: {
                            ...logsMap[logId],
                            status: header?.active
                                ? "HEADERS_MODIFIED"
                                : undefined,
                            headerData: header?.localId
                                ? {
                                      localId: header?.localId,
                                      projectLocalId: header?.projectLocalId,
                                  }
                                : undefined,
                        },
                    }));
                }
            }
        });
    }, []);

    console.log("LogsMap:", logsMap, logs);

    return { logs, logsMap, clearData, baseTime };
};
