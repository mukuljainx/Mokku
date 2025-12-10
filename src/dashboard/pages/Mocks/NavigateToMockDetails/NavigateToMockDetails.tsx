import { Navigate, useSearchParams } from "react-router";
import { useProjectQuery } from "../../Project/queries/useProjectQuery";
import { useOrganizationQuery } from "../../Organization/queries/useOrganizationQuery";
import { Spinner } from "@/dashboard/components/ui/spinner";
import { OrgAndProjectSelector } from "./OrgAndProjectSelector";
import { getProjectRoute } from "@/dashboard/lib/routes";
import { CreateProjectButton } from "@/dashboard/pages/Project/CreateProject";
import { useProjectListQuery } from "@/dashboard/pages/Project/queries/useProjectListQuery";

export const NavigateToMockDetails = () => {
    const [searchParams] = useSearchParams();

    const localMockId = searchParams.get("localMockId") || "";
    const projectLocalId = searchParams.get("projectLocalId") || "";
    let type = (searchParams.get("type") || "MOCK") as "MOCK" | "HEADER";
    if (type !== "MOCK" && type !== "HEADER") {
        type = "MOCK";
    }
    const isMock = type === "MOCK";

    const projectDetails = useProjectQuery({
        localId: projectLocalId ? parseInt(projectLocalId) : undefined,
    });

    const allProjects = useProjectListQuery({}, !projectLocalId);

    const orgDetails = useOrganizationQuery({
        localId:
            projectDetails.data?.organizationLocalId ||
            allProjects?.data?.[0]?.organizationLocalId,
    });

    if (
        orgDetails.isLoading ||
        projectDetails.isLoading ||
        allProjects.isLoading
    ) {
        return <Spinner />;
    }

    if (!projectLocalId && allProjects.data?.length === 0) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div>
                    <h3 className="text-lg">No Project Found</h3>
                    <p className="mb-2">
                        To create mocks you need projects first.
                    </p>
                    <CreateProjectButton />
                </div>
            </div>
        );
    }

    if (orgDetails.data && projectDetails.data) {
        const baseUrl = getProjectRoute(
            orgDetails.data.slug,
            projectDetails.data.slug
        );
        return (
            <Navigate
                replace
                to={`${baseUrl}/${isMock ? "mocks" : "headers"}/${localMockId}`}
            />
        );
    }

    if (allProjects.data?.length && orgDetails.data) {
        const firstProject = allProjects.data[0];
        const baseUrl = getProjectRoute(
            orgDetails.data.slug,
            firstProject.slug
        );
        return (
            <Navigate
                replace
                to={`${baseUrl}/${isMock ? "mocks" : "headers"}/${localMockId}`}
            />
        );
    }
    return <OrgAndProjectSelector type={type} />;
};
