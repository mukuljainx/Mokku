import { useCallback, useEffect } from "react";
import { MessageService } from "../../lib";
import { useAppStore } from "../store/useAppStore";
import { IErrorData, MESSAGE_TYPE } from "../../types";
import { getDomain } from "@/utils/getDomain";
import { getStoreKey } from "@/services/constants";

const messageService = new MessageService("PANEL");

// not a global listener
export const useMetaEventsListener = (initialTab: chrome.tabs.Tab) => {
    const { tab, setError, setTab, setHost, setActive, setLoading } =
        useAppStore();

    const initTab = useCallback(
        (tab: chrome.tabs.Tab) => {
            const host = getDomain(tab.url) || "invalid";
            const storeKey = getStoreKey(host);
            const isLocalhost = (tab.url || "").includes("http://localhost");

            setTab(tab);
            setHost(host);
            setActive(false);
            setLoading(true);

            chrome.storage.local.get([storeKey], (result) => {
                let tempActive = result[storeKey] || false;
                if (tempActive === false) {
                    setActive(false);
                    setLoading(false);
                    return;
                }

                // if tempActive is undefined, check if it's localhost
                if (isLocalhost || tempActive) {
                    setActive(true);
                }
                setLoading(false);
            });
        },
        [setTab, setHost, setActive, setLoading]
    );

    useEffect(() => {
        if (!tab) {
            initTab(initialTab);
        }

        const destroyer = messageService.listen((data, sender) => {
            const senderTab = sender?.tab as chrome.tabs.Tab;

            if (data.type === "RESET") {
                initTab(senderTab);
                return;
            }

            if (senderTab.id !== tab.id) {
                return;
            }

            if (data.type === MESSAGE_TYPE.ERROR) {
                const errorData = data.data as IErrorData;

                setError(errorData);
            }
        });

        return () => destroyer.forEach((destroy) => destroy());
    }, [initialTab, initTab, tab]);
};
