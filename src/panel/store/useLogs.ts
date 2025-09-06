import { useCallback, useEffect, useRef, useState } from "react";
import { ILog } from "@/types";
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
                console.log("Mokku Panel: LOG_MOCK_STATUS received", data);
                const log = data.data as ILog;
                const logId = log.id;
                if (logId === undefined) {
                    return;
                }
                if (idSetRef.current.has(logId)) {
                    setLogsMap((logsMap) => ({
                        ...logsMap,
                        [logId]: {
                            ...logsMap[logId],
                            isMocked: log.isMocked,
                        },
                    }));
                }
            }
        });
    }, []);

    return { logs, logsMap, clearData, baseTime };
};
