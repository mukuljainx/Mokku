import { useCallback, useEffect, useRef, useState } from "react";
import { ILog } from "@/types";
import { MessageService } from "@/lib";

const messageService = new MessageService("PANEL");

export const useLogs = () => {
    const [logs, setLogs] = useState<number[]>([]);
    const [baseTime, setBaseTime] = useState<number>();
    const [logsMap, setLogsMap] = useState<Record<number, ILog>>({});
    const idSetRef = useRef(new Set<number>());

    const clearData = useCallback(() => {
        setLogs([]);
        setLogsMap({});
        setBaseTime(undefined);
        idSetRef.current = new Set<number>();
    }, []);

    useEffect(() => {
        messageService.listen((data) => {
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
