import { useEffect } from "react";
import { MessageService } from "../../lib";
import { useAppStore } from "../store/useAppStore";
import { IErrorData, MESSAGE_TYPE } from "../../types";

const messageService = new MessageService("PANEL");

export const useGlobalListener = () => {
    const { tab, setError } = useAppStore();

    useEffect(() => {
        messageService.listen((data, sender) => {
            const senderTab = sender?.tab as chrome.tabs.Tab;

            if (senderTab.id !== tab.id) {
                return;
            }

            if (data.type === MESSAGE_TYPE.ERROR) {
                const errorData = data.data as IErrorData;

                setError(errorData);
            }
        });
    }, [tab.id]);
};
