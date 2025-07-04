import * as React from "react";
import { useLogs } from "@/panel/store/useLogs";
import { LogsTable } from "@/panel/screens/LogsTable";
import { ILog } from "@/types";

const mock: ILog[] = [
    {
        id: 6,
        request: {
            url: "http://demo5488429.mockable.io/a",
            method: "GET",
            headers: [
                {
                    name: "Accept",
                    value: "application/json, text/plain, */*",
                },
            ],
        },
        response: {
            status: 200,
            response: '{\n "msg": "Hello World."\n}',
            headers: [
                {
                    name: "content-length",
                    value: "46",
                },
                {
                    name: "content-type",
                    value: "application/json; charset=UTF-8",
                },
            ],
        },
    },
];

export const Home = () => {
    const { logs, logsMap, clearData } = useLogs();
    const data = React.useMemo(() => logs.map((id) => logsMap[id]), [
        logs,
        logsMap,
    ]);

    return <LogsTable data={mock} clearData={clearData} />;
};
