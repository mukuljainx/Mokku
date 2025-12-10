import { projectService } from "@/dashboard/data-fetcher";
import type { IHeader, IMock } from "@/dashboard/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IProjectAllDataArgs {
    localId: number;
    mocks?: IMock[];
    headers?: IHeader[];
}

export const useProjectBulkDataMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (args: IProjectAllDataArgs) =>
            projectService.addBulkProjectData(args),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mocks"] });
            queryClient.invalidateQueries({ queryKey: ["headers"] });
        },
    });
};
