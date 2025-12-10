import { useState } from "react";
import { HeaderForm } from "./HeaderForm/HeaderForm";
import { useHeadersCreate } from "@/dashboard/pages/Headers/queries/useHeadersCreate";
import { toast } from "sonner";
import { useProjectStore } from "@/dashboard/pages/Project";
import { useAppNavigate } from "@/dashboard/hooks/use-app-navigate";
import type { IHeaderCreate } from "@/dashboard/types";

export const HeaderCreate = () => {
    const [key] = useState(0);
    const { project, loading: projectLoading } = useProjectStore();
    const { goToHeadersList } = useAppNavigate();

    const { mutate } = useHeadersCreate({
        onSuccess: () => {
            toast.success("Header created successfully");
            goToHeadersList();
        },
        onError: (message) => {
            toast.error(message);
        },
    });

    const handleSubmit = (headerData: IHeaderCreate) => {
        if (!project || !project.localId) {
            toast.error("No project found");
            return;
        }

        if (!headerData.name) {
            toast.error("Header name is required");
            return;
        }

        if (!headerData.action.requestHeaders?.length) {
            toast.error("Headers are required");
            return;
        }

        mutate({
            ...headerData,
            projectLocalId: project.localId,
        });
    };

    if (projectLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-full">
            <HeaderForm key={key} onSubmit={handleSubmit} />
        </div>
    );
};
