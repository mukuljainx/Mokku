import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMock } from "@/dashboard/data-fetcher/mokku/mocks-data-fetcher";
import type { IMock } from "@/dashboard/types";

export const useMockDelete = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMock,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["mocks"] });

            let deletedMock;

            queryClient.setQueriesData(
                { queryKey: ["mocks"] },
                (oldData?: { mocks: IMock[] }) => {
                    if (!Array.isArray(oldData?.mocks)) return oldData;

                    const updatedMocks = oldData?.mocks.map((mock) => {
                        if (mock.localId === variables.localId) {
                            deletedMock = mock;
                        }
                        return mock.localId === variables.localId
                            ? { ...mock, isUpdating: true }
                            : mock;
                    });

                    return { ...oldData, mocks: updatedMocks };
                }
            );

            return { deletedMock };
        },
        onError: (_, __, context) => {
            const deletedMock = context?.deletedMock as IMock | undefined;
            onError?.();

            if (deletedMock) {
                queryClient.setQueriesData(
                    { queryKey: ["mocks"] },
                    (oldData?: { mocks: IMock[] }) => {
                        if (!Array.isArray(oldData?.mocks)) return oldData;

                        const revertedMocks = oldData?.mocks.map((mock) =>
                            mock.localId === deletedMock.localId
                                ? deletedMock
                                : mock
                        );

                        return { ...oldData, mocks: revertedMocks };
                    }
                );
            }
        },
        onSuccess: (_, variables) => {
            // remove the mock from the cache
            queryClient.setQueriesData(
                { queryKey: ["mocks"] },
                (oldData?: { mocks: IMock[] }) => {
                    if (!Array.isArray(oldData?.mocks)) return oldData;

                    const updatedMocks = oldData?.mocks.filter(
                        (mock) => mock.localId !== variables.localId
                    );

                    return { ...oldData, mocks: updatedMocks };
                }
            );
            queryClient.invalidateQueries({ queryKey: ["mocks"] });
            onSuccess?.();
        },
    });
};
