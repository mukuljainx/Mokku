export const createForcedAlivePort = (name: string) => {
    const port = chrome.runtime.connect({ name });

    port.onDisconnect.addListener(() => {
        console.log("Mokku Inject: Port disconnected. Host: ", location.host);
    });

    const portKeepAliveInterval = setInterval(() => {
        // Keep the connection alive
        port.postMessage("PING");
    }, 1000 * 25);

    if (window) {
        window.addEventListener("onbeforeunload", () => {
            console.log("Mokku Inject: Unloading content script.");
            window.clearInterval(portKeepAliveInterval);
            port.disconnect();
        });
    }

    return port;
};
