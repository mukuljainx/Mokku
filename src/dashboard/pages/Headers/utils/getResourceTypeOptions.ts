export const getResourceTypeOptions = () => [
    {
        label: "Main Frame",
        value: "main_frame",
    },
    {
        label: "Sub Frame",
        value: "sub_frame",
    },
    {
        label: "Stylesheet",
        value: "stylesheet",
    },
    {
        label: "Script",
        value: "script",
    },
    {
        label: "Image",
        value: "image",
    },
    {
        label: "Font",
        value: "font",
    },
    {
        label: "Object",
        value: "object",
    },
    {
        label: "XMLHttpRequest",
        value: "xmlhttprequest",
    },
    {
        label: "Ping",
        value: "ping",
    },
    {
        label: "CSP Report",
        value: "csp_report",
    },
    {
        label: "Media",
        value: "media",
    },
    {
        label: "WebSocket",
        value: "websocket",
    },
    {
        label: "WebTransport",
        value: "webtransport",
    },
    {
        label: "WebBundle",
        value: "webbundle",
    },
    {
        label: "Other",
        value: "other",
    },
];

export const getResourceTypeValues = () =>
    getResourceTypeOptions().map(({ value }) => value);
