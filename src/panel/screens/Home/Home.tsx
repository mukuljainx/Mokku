import * as React from "react";
import { useLogs } from "@/panel/store/useLogs";
import { LogsTable } from "@/panel/screens/LogsTable";
import { ErrorAlert } from "@/components/ui/errorAlert";
import { useAppStore } from "../../store/useAppStore";

export const Home = () => {
    const { logs, logsMap, clearData, baseTime } = useLogs();
    const { error } = useAppStore();

    const data = React.useMemo(
        () => logs.map((id) => logsMap[id]),
        [logs, logsMap]
    );

    return (
        <div className="flex flex-col h-full">
            {error ? (
                <ErrorAlert errorData={error} />
            ) : (
                <div className="flex-1">
                    <LogsTable
                        baseTime={baseTime}
                        data={data}
                        clearData={clearData}
                    />
                </div>
            )}
        </div>
    );
};
