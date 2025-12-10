import { updateMock } from "@/dashboard/data-fetcher/mokku/mocks-data-fetcher";
import type { IMock } from "@/dashboard/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMockUpdate = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateMock,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["mocks"] });

            let previousMocks;

            queryClient.setQueriesData(
                { queryKey: ["mocks"] },
                (oldData?: { mocks: IMock[] }) => {
                    if (!Array.isArray(oldData?.mocks)) return oldData;

                    const updatedMocks = oldData?.mocks.map((mock) => {
                        if (mock.localId === variables.localId) {
                            previousMocks = mock;
                        }
                        return mock.localId === variables.localId
                            ? { ...mock, ...variables.mock, isUpdating: true }
                            : mock;
                    });

                    return { ...oldData, mocks: updatedMocks };
                }
            );

            return { previousMocks };
        },
        onSuccess: (_, variables) => {
            onSuccess?.();
            queryClient.setQueriesData(
                { queryKey: ["mocks"] },
                (oldData?: { mocks: IMock[] }) => {
                    if (!Array.isArray(oldData?.mocks)) return oldData;

                    const updatedMocks = oldData?.mocks.map((mock) => {
                        if (variables.localId === mock.localId) {
                            return { ...mock, isUpdating: false };
                        }
                        return mock;
                    });

                    return { ...oldData, mocks: updatedMocks };
                }
            );
        },
        onError: (error, _, context) => {
            const previousMocks = context?.previousMocks as IMock | undefined;

            if (previousMocks) {
                queryClient.setQueriesData(
                    { queryKey: ["mocks"] },
                    (oldData?: { mocks: IMock[] }) => {
                        if (!Array.isArray(oldData?.mocks)) return oldData;

                        const revertedMocks = oldData?.mocks.map((mock) =>
                            mock.localId === previousMocks.localId
                                ? previousMocks
                                : mock
                        );

                        return { ...oldData, mocks: revertedMocks };
                    }
                );
            }
            onError?.(error.message);
            // reverse the update
        },
    });
};
