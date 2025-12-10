import { useQuery } from "@tanstack/react-query";
import { headersService } from "@/dashboard/data-fetcher";
import { useAppStore } from "@/dashboard/service/useAppStore";

interface GetHeadersArgs {
    page: number;
    limit: number;
    active?: boolean;
    dynamic?: boolean;
    search?: string;
    projectLocalId?: number;
}

export const useHeadersQuery = (
    filter: GetHeadersArgs,
    projectLocalId?: number
) => {
    const { isConnected } = useAppStore();
    return useQuery({
        queryKey: ["headers", filter, projectLocalId],
        queryFn: () =>
            headersService.getHeaders({
                ...filter,
                projectLocalId,
            }),
        enabled: !!projectLocalId && isConnected,
    });
};
