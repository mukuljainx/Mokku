import { projectService } from "@/dashboard/data-fetcher";
import { useMutation } from "@tanstack/react-query";

interface IProjectAllDataArgs {
    localId: number;
    mocks?: boolean;
    headers?: boolean;
}

export const useProjectDataQuery = () => {
    return useMutation({
        mutationFn: (args: IProjectAllDataArgs) =>
            projectService.getAllProjectData(args),
    });
};
