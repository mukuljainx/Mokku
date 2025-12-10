import { useMutation, useQueryClient } from "@tanstack/react-query";
import { headersService } from "@/dashboard/data-fetcher";
import type { IHeaderCreate } from "@/dashboard/types";

export const useHeadersCreate = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (header: IHeaderCreate) =>
            headersService.createHeader(header),
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["headers"] });
            onSuccess?.();
        },
        onError: (error) => {
            onError?.(error.message);
        },
    });
};
