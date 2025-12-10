import type { IMessage } from "@/dashboard/types";

export const getMokkuListener = (callback: (data: IMessage) => void) => {
    const func = (event: WindowEventMap["message"]) => {
        // We only accept messages from ourselves
        if (event.source !== window) {
            return;
        }

        const data: IMessage = event.data;
        console.log("Mokku Listener Data XXX:", data);
        if (data.extensionName !== "MOKKU") {
            return;
        }

        callback(data);
    };
    window.addEventListener("message", func);
    return () => window.removeEventListener("message", func);
};
