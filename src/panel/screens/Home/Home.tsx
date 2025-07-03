import * as React from "react";
import { useLogs } from "@/panel/store/useLogs";
import { LogsTable } from "@/panel/screens/LogsTable";

export const Home = () => {
    const { logs, logsMap, clearData } = useLogs();
    const data = React.useMemo(() => logs.map((id) => logsMap[id]), [
        logs,
        logsMap,
    ]);

    return <LogsTable data={data} clearData={clearData} />;
};
