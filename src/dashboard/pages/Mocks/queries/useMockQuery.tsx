import { useQuery } from "@tanstack/react-query";
import { useProjectId } from "../../../service/routes/useProjectId";
import { mocksService } from "@/dashboard/data-fetcher";
import { useAppStore } from "@/dashboard/service/useAppStore";

interface useMockQueryProps {
    localId?: number;
}

export const useMockQuery = (args: useMockQueryProps) => {
    const projectId = useProjectId();
    const { isConnected } = useAppStore();

    return useQuery({
        staleTime: 10000,
        queryKey: ["mocks", { projectId, args }],
        queryFn: async () => {
            const mock = await mocksService.getMock(args);
            return mock;
        },
        enabled: !!args.localId && isConnected,
    });
};
