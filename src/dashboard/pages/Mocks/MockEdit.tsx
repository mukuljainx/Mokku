import { useMockQuery } from "@/dashboard/pages/Mocks/queries/useMockQuery";
import { useMockId } from "@/dashboard/service/routes/useMockId";
import type { IMock } from "@/dashboard/types";
import { useLocation } from "react-router";
import { MockForm } from "./MockCreate/MockForm/MockForm";
import { Spinner } from "@/dashboard/components/ui/spinner";
import { Error } from "@/dashboard/components/ui/Error";
import { useMockUpdate } from "./queries/useMockUpdate";
import { toast } from "sonner";
import { useAppNavigate } from "@/dashboard/hooks/use-app-navigate";
import { useMockDelete } from "./queries/useMockDelete";
import { useCallback } from "react";

export const MockEdit = () => {
    const { state } = useLocation();
    const stateMock = state?.mock as IMock;
    const { goToMocksList } = useAppNavigate();
    const paramMockId = useMockId();

    const { data, isLoading, isError, error } = useMockQuery({
        localId: paramMockId,
    });

    console.log("Mock Details Data:", data, error);

    const updateMutation = useMockUpdate({
        onSuccess: () => {
            toast.success("Mock updated successfully");
            goToMocksList();
        },
    });

    const deleteMutation = useMockDelete({
        onSuccess: () => {
            toast.success("Mock deleted successfully");
            goToMocksList();
        },
        onError: () => {
            toast.error("Error deleting mock");
        },
    });

    const mock = stateMock ? stateMock : data;

    const handleDeleteClick = useCallback(() => {
        if (mock?.localId) {
            deleteMutation.mutate({ localId: mock.localId });
        }
    }, [deleteMutation, mock]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <Error message="Failed to load mock details." />;
    }

    const handleSubmit = (updatedMock: Partial<IMock>) => {
        if (mock?.localId) {
            updateMutation.mutate({
                localId: mock.localId,
                mock: updatedMock,
            });
        }
    };

    return (
        <div className="h-full">
            <MockForm
                onDeleteClick={handleDeleteClick}
                error={
                    updateMutation.error?.message ||
                    deleteMutation.error?.message
                }
                isLoading={updateMutation.isPending || deleteMutation.isPending}
                mock={mock}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
