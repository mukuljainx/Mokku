import { useMutation, useQueryClient } from "@tanstack/react-query";
import { headersService } from "@/dashboard/data-fetcher";
import type { IHeader } from "@/dashboard/types";

export const useHeaderUpdate = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            localId,
            header,
        }: {
            localId: number;
            header: Partial<IHeader>;
        }) => headersService.updateHeader({ localId, header }),
        onSuccess: (_data, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["headers"] });
            onSuccess?.();
        },
        onError: (error) => {
            onError?.(error.message);
        },
    });
};
