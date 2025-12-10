import { useHeaderQuery } from "@/dashboard/pages/Headers/queries/useHeaderQuery";
import type { IHeader } from "@/dashboard/types";
import { useLocation, useParams } from "react-router";
import { HeaderForm } from "./HeaderCreate/HeaderForm/HeaderForm";
import { useHeaderUpdate } from "./queries/useHeaderUpdate";
import { toast } from "sonner";
import { useAppNavigate } from "@/dashboard/hooks/use-app-navigate";
import { useHeaderDelete } from "./queries/useHeaderDelete";
import { useCallback } from "react";

export const HeaderEdit = () => {
    const { state } = useLocation();
    const { headerId } = useParams();
    const stateHeader = state?.header as IHeader;
    const { goToHeadersList } = useAppNavigate();

    const { data, isLoading, isError } = useHeaderQuery({
        localId: stateHeader ? undefined : parseInt(headerId || ""),
    });

    const updateHeaderMutation = useHeaderUpdate({
        onSuccess: () => {
            toast.success("Header updated successfully");
            goToHeadersList();
        },
        onError: (error) => {
            toast.error(`Error updating header: ${error}`);
        },
    });

    const deleteMutation = useHeaderDelete({
        onSuccess: () => {
            toast.success("Header deleted successfully");
            goToHeadersList();
        },
        onError: () => {
            toast.error("Error deleting header");
        },
    });

    const header = stateHeader ? stateHeader : data;

    const handleSubmit = (headerData: IHeader) => {
        if (!header?.id && !header?.localId) {
            toast.error("Header ID not found");
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

        updateHeaderMutation.mutate({
            localId: header.localId,
            header: headerData,
        });
    };

    const handleDeleteClick = useCallback(() => {
        if (!header?.localId) {
            toast.error("Header ID not found");
            return;
        }
        deleteMutation.mutate({ localId: header.localId });
    }, [deleteMutation, header]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading header</div>;
    }

    return (
        <div className="h-full">
            <HeaderForm
                header={header}
                onSubmit={handleSubmit}
                isLoading={
                    updateHeaderMutation.isPending || deleteMutation.isPending
                }
                onDeleteClick={handleDeleteClick}
                error={
                    updateHeaderMutation.error?.message ||
                    deleteMutation.error?.message
                }
            />
        </div>
    );
};
