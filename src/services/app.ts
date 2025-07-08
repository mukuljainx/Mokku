import { urlConstants } from "@/lib";
import { APP_MESSAGE_TYPE } from "@/types";

export const openApp = ({
    onSuccess,
    url,
}: {
    onSuccess?: (tab?: chrome.tabs.Tab) => void;
    url?: string;
} = {}) => {
    chrome.tabs.query({ url: urlConstants.getQueryUrl() }, (tabs) => {
        if (tabs.length === 0) {
            chrome.tabs.create(
                {
                    url: url || urlConstants.getProjectsUrl(),
                },
                onSuccess,
            );
            return;
        }
        chrome.windows.update(
            tabs[0].windowId,
            {
                focused: true,
            },
            () => {
                if (tabs[0].id) {
                    chrome.tabs.update(
                        tabs[0].id,
                        {
                            active: true,
                            highlighted: true,
                            url: url || urlConstants.getProjectsUrl(),
                        },
                        onSuccess,
                    );
                }
            },
        );
    });
};

export const sendMessageToApp = (
    tabId: chrome.tabs.Tab["id"],
    message: { type: APP_MESSAGE_TYPE; data: unknown },
) => {
    if (tabId === undefined) {
        console.error("sendMessageToApp: tabId is undefined");
        return;
    }
    return chrome.tabs.sendMessage(tabId, message);
};
