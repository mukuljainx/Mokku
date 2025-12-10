import { getProject } from "@/dashboard/data-fetcher/mokku/project-data-fetcher";
import { useAppStore } from "@/dashboard/service/useAppStore";
import type { IProject } from "@/dashboard/types";
import { useQuery } from "@tanstack/react-query";

export const useProjectQuery = (args: Partial<IProject> = {}) => {
    const { isConnected } = useAppStore();
    return useQuery({
        staleTime: 10000,
        queryKey: ["project", { args }],
        queryFn: () => getProject(args),
        enabled: isConnected && (!!args.slug || !!args.id || !!args.localId),
        retry: 1,
    });
};
