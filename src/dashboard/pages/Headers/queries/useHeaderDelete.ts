import { useMutation, useQueryClient } from "@tanstack/react-query";
import { headersService } from "@/dashboard/data-fetcher";
import type { IHeader } from "@/dashboard/types";

export const useHeaderDelete = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: headersService.deleteHeader,
        // onSuccess: (_data, _variables, _context) => {
        //     queryClient.invalidateQueries({
        //         predicate: (query) => query.queryKey[0] === "headers",
        //     });
        //     onSuccess?.();
        // },
        // onError: (_error, _variables, _context) => {
        //     onError?.();
        // },

        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["headers"] });

            let deletedHeader;

            queryClient.setQueriesData(
                { queryKey: ["headers"] },
                (oldData?: { headers: IHeader[] }) => {
                    if (!Array.isArray(oldData?.headers)) return oldData;

                    const updatedHeaders = oldData?.headers.map((header) => {
                        if (header.localId === variables.localId) {
                            deletedHeader = header;
                        }
                        return header.localId === variables.localId
                            ? { ...header, isUpdating: true }
                            : header;
                    });

                    return { ...oldData, headers: updatedHeaders };
                }
            );

            return { deletedHeader };
        },
        onError: (_, __, context) => {
            const deletedHeader = context?.deletedHeader as IHeader | undefined;
            onError?.();

            if (deletedHeader) {
                queryClient.setQueriesData(
                    { queryKey: ["headers"] },
                    (oldData?: { headers: IHeader[] }) => {
                        if (!Array.isArray(oldData?.headers)) return oldData;

                        const revertedHeaders = oldData?.headers.map(
                            (header) =>
                                header.localId === deletedHeader.localId
                                    ? deletedHeader
                                    : header
                        );

                        return { ...oldData, headers: revertedHeaders };
                    }
                );
            }
        },
        onSuccess: (_, variables) => {
            // remove the mock from the cache
            queryClient.setQueriesData(
                { queryKey: ["headers"] },
                (oldData?: { mocks: IHeader[] }) => {
                    if (!Array.isArray(oldData?.mocks)) return oldData;

                    const updatedMocks = oldData?.mocks.filter(
                        (mock) => mock.localId !== variables.localId
                    );

                    return { ...oldData, headers: updatedMocks };
                }
            );
            queryClient.invalidateQueries({ queryKey: ["mocks"] });
            onSuccess?.();
        },
    });
};
