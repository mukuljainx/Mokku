import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/dashboard/components/ui/breadcrumb";
import { getOrgRoute, getProjectRoute } from "@/dashboard/lib/routes";
import { useOrganizationStore } from "@/dashboard/pages/Organization";
import { useProjectStore } from "@/dashboard/pages/Project";
import { Fragment } from "react";
import { Link, Navigate } from "react-router";
import { toast } from "sonner";

export const TopBarBreadCrumb = () => {
    const { organization, error: organizationError } = useOrganizationStore();
    const { project, error: projectError } = useProjectStore();

    if (organizationError) {
        toast.error(organizationError);
        return <Navigate replace to="/500" />;
    }

    if (projectError) {
        toast.error(projectError);
        return (
            <Navigate
                replace
                to={`${getOrgRoute(organization?.slug)}/projects`}
            />
        );
    }

    const paths = [
        // { name: "Organizations", link: "/organizations", id: "organizations" },
    ];

    if (organization) {
        // paths.push({
        //     name: organization.name,
        //     link: `${getOrgRoute(organization.slug)}/projects`,
        //     id: "organization-" + organization.localId,
        // });

        if (project) {
            paths.push(
                {
                    name: "Projects",
                    link: `${getOrgRoute(organization.slug)}/projects`,
                    id: "project",
                },
                {
                    name: project.name,
                    link: getProjectRoute(organization.slug, project.slug),
                    id: "project-" + project.localId,
                }
            );
        }
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/projects">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {paths.map((path) => {
                    return (
                        <Fragment key={path.id}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild className="capitalize">
                                    <Link to={path.link}>{path.name}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
