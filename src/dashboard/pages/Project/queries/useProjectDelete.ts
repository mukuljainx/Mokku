import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectService } from "@/dashboard/data-fetcher";
import type { IProject } from "@/dashboard/types";

export const useProjectDelete = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: projectService.deleteProject,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["projects"] });

            let deletedProject;

            queryClient.setQueriesData(
                { queryKey: ["projects"] },
                (oldData?: { projects: IProject[] }) => {
                    if (!Array.isArray(oldData?.projects)) return oldData;

                    const updatedProjects = oldData?.projects.map((project) => {
                        if (project.localId === variables.localId) {
                            deletedProject = project;
                        }
                        return project.localId === variables.localId
                            ? { ...project, isUpdating: true }
                            : project;
                    });

                    return { ...oldData, projects: updatedProjects };
                }
            );

            return { deletedProject };
        },
        onError: (_, __, context) => {
            onError?.();
            const deletedProject = context?.deletedProject as
                | IProject
                | undefined;

            if (deletedProject) {
                queryClient.setQueriesData(
                    { queryKey: ["projects"] },
                    (oldData?: { projects: IProject[] }) => {
                        if (!Array.isArray(oldData?.projects)) return oldData;

                        const revertedProjects = oldData?.projects.map(
                            (project) =>
                                project.localId === deletedProject.localId
                                    ? deletedProject
                                    : project
                        );

                        return { ...oldData, projects: revertedProjects };
                    }
                );
            }
        },
        onSuccess: (_, variables) => {
            // remove the project from the cache
            queryClient.setQueriesData(
                { queryKey: ["projects"] },
                (oldData?: { projects: IProject[] }) => {
                    if (!Array.isArray(oldData?.projects)) return oldData;

                    const updatedProjects = oldData?.projects.filter(
                        (project) => project.localId !== variables.localId
                    );

                    return { ...oldData, projects: updatedProjects };
                }
            );
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            onSuccess?.();
        },
    });
};
