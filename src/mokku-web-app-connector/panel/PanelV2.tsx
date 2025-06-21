import * as React from "react";
import { useLogs } from "./useLogs";
import { LogsTable } from "./LogsTable/LogsTable";

export const PanelV2 = () => {
    const { logs, logsMap, clearData } = useLogs();
    const data = React.useMemo(() => logs.map((id) => logsMap[id]), [
        logs,
        logsMap,
    ]);

    return <LogsTable data={data} clearData={clearData} logMap={logsMap} />;
};
