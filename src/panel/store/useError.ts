import { useCallback, useEffect, useState } from "react";
import { MessageService } from "@/lib";
import { useAppStore } from "./useAppStore";
import { MESSAGE_TYPE, ErrorData } from "@/types";

const messageService = new MessageService("PANEL");

export const useError = () => {
    const [error, setError] = useState<ErrorData | null>(null);
    const { tab } = useAppStore();

    const dismissError = useCallback(() => {
        setError(null);
    }, []);

    useEffect(() => {
        messageService.listen((data, sender) => {
            const senderTab = sender?.tab as chrome.tabs.Tab;

            if (senderTab.id !== tab.id) {
                return;
            }

            if (data.type === MESSAGE_TYPE.ERROR) {
                const errorData = data.data as ErrorData;
                setError(errorData);
            }
        });
    }, [tab.id]);

    return { error, dismissError };
};
