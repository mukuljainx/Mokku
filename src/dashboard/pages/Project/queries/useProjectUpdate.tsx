import { projectService } from "@/dashboard/data-fetcher";
import type { IProject } from "@/dashboard/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProjectUpdate = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: projectService.updateProject,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["projects"] });

            let previousProjects;

            queryClient.setQueriesData(
                { queryKey: ["projects"] },
                (oldData?: { projects: IProject[] }) => {
                    if (!Array.isArray(oldData?.projects)) return oldData;

                    const updatedProjects = oldData?.projects.map((project) => {
                        if (project.localId === variables.localId) {
                            previousProjects = project;
                        }
                        return project.localId === variables.localId
                            ? {
                                  ...project,
                                  ...variables.project,
                                  isUpdating: true,
                              }
                            : project;
                    });

                    return { ...oldData, projects: updatedProjects };
                }
            );

            return { previousProjects };
        },
        onSuccess: (_, variables) => {
            onSuccess?.();
            queryClient.setQueriesData(
                { queryKey: ["projects"] },
                (oldData?: { projects: IProject[] }) => {
                    if (!Array.isArray(oldData?.projects)) return oldData;

                    const updatedProjects = oldData?.projects.map((project) => {
                        if (variables.localId === project.localId) {
                            return { ...project, isUpdating: false };
                        }
                        return project;
                    });

                    return { ...oldData, projects: updatedProjects };
                }
            );
        },
        onError: (error, _, context) => {
            const previousProjects = context?.previousProjects as
                | IProject
                | undefined;

            if (previousProjects) {
                queryClient.setQueriesData(
                    { queryKey: ["projects"] },
                    (oldData?: { projects: IProject[] }) => {
                        if (!Array.isArray(oldData?.projects)) return oldData;

                        const revertedProjects = oldData?.projects.map(
                            (project) =>
                                project.localId === previousProjects.localId
                                    ? previousProjects
                                    : project
                        );

                        return { ...oldData, projects: revertedProjects };
                    }
                );
            }
            onError?.(error.message);
            // reverse the update
        },
    });
};
