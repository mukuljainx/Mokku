export const createForcedAlivePort = (name: string) => {
    const port = chrome.runtime.connect({ name });

    port.onDisconnect.addListener(() => {
        console.warn(
            "Mokku Inject: Content script disconnected from service worker.",
        );
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
