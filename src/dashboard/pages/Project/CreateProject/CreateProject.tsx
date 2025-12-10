import type { IProjectCreate } from "@/dashboard/types";
import { useProjectMutation } from "../queries/useProjectMutation";
import { ProjectForm } from "./ProjectForm";
import { toast } from "sonner";
import { Navigate } from "react-router";
import { useOrganizationStore } from "@/dashboard/pages/Organization";
import { useEffect } from "react";
import { getProjectRoute } from "@/dashboard/lib/routes";

export const CreateProject = () => {
    const { mutate, data, isSuccess, error } = useProjectMutation({});
    const { organization } = useOrganizationStore();

    useEffect(() => {
        if (error) {
            toast.error("Failed to create project. Please try again.", {
                description: error.message,
            });
        }
    }, [error]);

    if (isSuccess && data.slug) {
        toast.success("Project created successfully");
        return (
            <Navigate
                to={`${getProjectRoute(organization!.slug, data.slug)}/mocks`}
            />
        );
    }

    const handleSubmit = (data: IProjectCreate) => {
        if (!data.organizationLocalId) {
            toast.error("Organization is required for projects");
            return;
        }

        mutate(data);
    };

    if (organization?.localId === undefined) {
        return "Failed to load organization";
    }

    return (
        <div className="mx-auto">
            <ProjectForm
                project={{
                    organizationLocalId: organization?.localId,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
