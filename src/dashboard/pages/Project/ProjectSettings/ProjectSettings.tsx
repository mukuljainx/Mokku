import type { IProject } from "@/dashboard/types";
import { useProjectMutation } from "../queries/useProjectMutation";
import { ProjectForm } from "../CreateProject/ProjectForm";
import { toast } from "sonner";
import { Navigate, useNavigate } from "react-router";
import { useOrganizationStore } from "@/dashboard/pages/Organization";
import { useCallback, useEffect } from "react";
import { getOrgRoute, getProjectRoute } from "@/dashboard/lib/routes";
import { useProjectStore } from "../hooks/useProjectStore";
import { Spinner } from "@/dashboard/components/ui/spinner";
import { Error } from "@/dashboard/components/ui/Error";
import { useProjectDelete } from "../queries/useProjectDelete";
import { useProjectUpdate } from "../queries/useProjectUpdate";

export const ProjectSettings = () => {
    const { mutate, data, isSuccess, error } = useProjectMutation({});

    const orgData = useOrganizationStore();
    const projectData = useProjectStore();
    const navigate = useNavigate();
    const projectDeleteMutation = useProjectDelete({
        onSuccess: () => {
            toast.success("Project deleted successfully");
            navigate(`${getOrgRoute(orgData.organization?.slug)}/projects`);
        },
        onError: () => {
            toast.error("Error deleting project");
        },
    });
    const projectUpdate = useProjectUpdate({
        onSuccess: () => {
            toast.success("Project updated successfully");
        },
        onError: () => {
            toast.error("Error updating project");
        },
    });

    useEffect(() => {
        if (error) {
            toast.error("Failed to create project. Please try again.", {
                description: error.message,
            });
        }
    }, [error]);

    useEffect(() => {
        if (!projectData.project || !projectUpdate.data) return;
        if (projectData.project.slug !== projectUpdate.data.slug) {
            navigate(
                `${getProjectRoute(orgData.organization!.slug, projectUpdate.data.slug)}/settings`
            );
        }
    }, [
        projectData.project,
        projectUpdate.data,
        navigate,
        orgData.organization?.slug,
    ]);

    const handleDeleteClick = useCallback(() => {
        if (projectData.project == null) return;

        projectDeleteMutation.mutate({ localId: projectData.project.localId });
    }, [projectData.project, projectDeleteMutation]);

    if (isSuccess && data.slug) {
        toast.success("Project created successfully");
        return (
            <Navigate
                to={`${getProjectRoute(orgData.organization!.slug, data.slug)}/mocks`}
            />
        );
    }

    const handleSubmit = (data: IProject) => {
        if (!data.organizationLocalId) {
            toast.error("Organization is required for projects");
            return;
        }

        if (data.localId !== undefined || data.localId !== null) {
            // Update existing project
            projectUpdate.mutate({ localId: data.localId, project: data });
            return;
        }

        mutate(data);
    };

    if (projectData.loading || orgData.loading) {
        return <Spinner />;
    }

    if (
        orgData.organization?.localId === undefined ||
        projectData.project == null
    ) {
        return <Error message="Failed to load organization/project data." />;
    }

    return (
        <div className="mx-auto">
            <ProjectForm
                loading={
                    projectUpdate.isPending || projectDeleteMutation.isPending
                }
                error={
                    projectUpdate.error?.message ||
                    projectDeleteMutation.error?.message
                }
                onDeleteClick={handleDeleteClick}
                project={{ ...projectData.project }}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
