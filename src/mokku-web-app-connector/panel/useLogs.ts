import { useCallback, useEffect, useRef, useState } from "react";
import messageService from "../../panel/App/service/messageService";
import { ILog } from "@mokku/types";

export const useLogs = () => {
    const [logs, setLogs] = useState<number[]>([]);
    const [logsMap, setLogsMap] = useState<Record<number, ILog>>({});
    const idSetRef = useRef(new Set<number>());

    const clearData = useCallback(() => {
        setLogs([]);
        setLogsMap({});
        idSetRef.current = new Set<number>();
    }, []);

    useEffect(() => {
        messageService.listen("PANEL", (data) => {
            if (data.type === "LOG") {
                const log = data.message as ILog;
                console.log(811, log);
                if (!idSetRef.current.has(log.id)) {
                    idSetRef.current.add(log.id);
                    setLogs((logs) => [log.id, ...logs]);
                }
                setLogsMap((logsMap) => ({
                    ...logsMap,
                    [log.id]: log,
                }));
            }
        });
    }, []);

    return { logs, logsMap, clearData };
};
