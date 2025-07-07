import { urlConstants } from "@/lib";

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
