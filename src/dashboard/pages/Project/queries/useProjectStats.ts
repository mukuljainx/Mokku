import { mocksService } from "@/dashboard/data-fetcher";
import { useAppStore } from "@/dashboard/service/useAppStore";
import { useQuery } from "@tanstack/react-query";

export const useProjectStats = (projectLocalId: number) => {
    const { isConnected } = useAppStore();

    return useQuery({
        staleTime: 30000,
        queryKey: ["project-stats", projectLocalId],
        queryFn: () => mocksService.getCountByStatus(projectLocalId),
        enabled: isConnected && !!projectLocalId,
        retry: 1,
    });
};
