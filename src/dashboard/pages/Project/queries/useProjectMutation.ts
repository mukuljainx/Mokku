import { createProject } from "@/dashboard/data-fetcher/mokku/project-data-fetcher";
import type { IProjectCreate } from "@/dashboard/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProjectMutation = ({
    onSuccess,
}: {
    onSuccess?: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (project: IProjectCreate) => createProject(project),
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ["mocks"] }),
        // onMutate: async (newTodo: string) => {
        //     // Cancel any outgoing refetch
        //     // (so they don't overwrite our optimistic update)
        //     // await queryClient.cancelQueries(todoListOptions);

        //     // Snapshot the previous value
        //     const previousMocks = queryClient.getQueryData(["mocks"]);

        //     // Optimistically update to the new value
        //     if (previousMocks) {
        //         queryClient.setQueryData(["mocks"], {
        //             ...previousMocks,
        //         });
        //     }

        //     return { previousMocks };
        // },
        // // If the mutation fails,
        // // use the context returned from onMutate to roll back
        // onError: (err, variables, context) => {
        //     if (context?.previousMocks) {
        //         queryClient.setQueryData<Todos>(
        //             ["todos"],
        //             context.previousMocks,
        //         );
        //     }
        // },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            onSuccess?.();
            console.log(123, data, variables, context);
        },
    });
};
