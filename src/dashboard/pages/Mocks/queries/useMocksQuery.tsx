import { useQuery } from "@tanstack/react-query";
import { getMocks } from "@/dashboard/data-fetcher/mokku/mocks-data-fetcher";
import { useAppStore } from "@/dashboard/service/useAppStore";

export const useMocksQuery = (
    filters: Parameters<typeof getMocks>[0],
    projectLocalId?: number
) => {
    const { isConnected } = useAppStore();

    return useQuery({
        staleTime: 10000,
        queryKey: ["mocks", { projectLocalId, filters }],
        queryFn: () => getMocks({ ...filters, projectLocalId }),
        enabled: !!projectLocalId && isConnected,
    });
};
