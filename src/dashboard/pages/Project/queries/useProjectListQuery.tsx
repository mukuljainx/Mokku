import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../../data-fetcher/mokku/project-data-fetcher";
import { useAppStore } from "@/dashboard/service/useAppStore";

interface useProjectListQueryProps {
    search?: string;
}

export const useProjectListQuery = (
    args: useProjectListQueryProps,
    enabled = true
) => {
    const { isConnected } = useAppStore();
    return useQuery({
        retry: 1,
        staleTime: 10000,
        queryKey: ["projects", { args }],
        queryFn: getProjects,
        enabled: enabled && isConnected,
    });
};
