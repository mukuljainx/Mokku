import * as React from "react";
import { useLogs } from "@/panel/store/useLogs";
import { LogsTable } from "@/panel/screens/LogsTable";
import { ILog } from "@/types";

const mock: ILog[] = [
    {
        id: 6,
        request: {
            time: 0,
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
            time: 0,
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
    {
        id: 1,
        request: {
            time: 0,
            url: "http://demo5488429.mockable.io/a",
            method: "POST",
            headers: [
                {
                    name: "Accept",
                    value: "application/json, text/plain, */*",
                },
            ],
        },
        response: {
            time: 0,
            status: 300,
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
    {
        id: 2,
        request: {
            time: 0,
            url: "http://demo5488429.mockable.io/a",
            method: "PATCH",
            headers: [
                {
                    name: "Accept",
                    value: "application/json, text/plain, */*",
                },
            ],
        },
        response: {
            time: 0,
            status: 400,
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
    {
        id: 3,
        request: {
            time: 0,
            url: "http://demo5488429.mockable.io/a",
            method: "DELETE",
            headers: [
                {
                    name: "Accept",
                    value: "application/json, text/plain, */*",
                },
            ],
        },
        response: {
            time: 0,
            status: 500,
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
    {
        id: 4,
        request: {
            time: 0,
            url: "http://demo5488429.mockable.io/a",
            method: "DELETE",
            headers: [
                {
                    name: "Accept",
                    value: "application/json, text/plain, */*",
                },
            ],
        },
        response: {
            time: 0,
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

    return <LogsTable data={data} clearData={clearData} />;
};
