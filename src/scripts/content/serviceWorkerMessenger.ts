export const createServiceWorkerMessenger = () => {
    const port = chrome.runtime.connect({ name: "mokku-content-script" });

    port.onDisconnect.addListener(() => {
        console.warn(
            "Mokku Inject: Content script disconnected from service worker.",
        );
    });

    const portKeepAliveInterval = setInterval(() => {
        // Keep the connection alive
        port.postMessage("PING");
    }, 1000 * 25);

    window.addEventListener("onbeforeunload", () => {
        console.log("Mokku Inject: Unloading content script.");
        window.clearInterval(portKeepAliveInterval);
        port.disconnect();
    });

    return port;
};
