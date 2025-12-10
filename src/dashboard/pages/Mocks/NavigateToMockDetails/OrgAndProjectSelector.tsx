import { BasicSelect } from "@/dashboard/components/ui/basic-select";
import { Button } from "@/dashboard/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Spinner } from "@/dashboard/components/ui/spinner";
import { getProjectRoute } from "@/dashboard/lib/routes";
import { CreateOrganizationButton } from "@/dashboard/pages/Organization";
import { useOrganizationListQuery } from "@/dashboard/pages/Organization/queries/useOrganizationListQuery";
import { CreateProjectButton } from "@/dashboard/pages/Project/CreateProject";
import { useProjectListQuery } from "@/dashboard/pages/Project/queries/useProjectListQuery";
import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";

interface OrgAndProjectSelectorProps {
    type: "MOCK" | "HEADER";
}

export const OrgAndProjectSelector = ({ type }: OrgAndProjectSelectorProps) => {
    const projectData = useProjectListQuery({});
    const orgData = useOrganizationListQuery({});

    const projectOptions = useMemo(
        () =>
            projectData.data?.map((project) => ({
                label: project.name,
                value: project.slug,
            })) || [],
        [projectData.data]
    );

    const orgOptions = useMemo(
        () =>
            orgData.data?.map((org) => ({
                label: org.name,
                value: org.slug,
            })) || [],
        [orgData.data]
    );

    const [org, setOrg] = useState("");
    const [project, setProject] = useState("");

    useEffect(() => {
        if (projectOptions.length > 0) {
            setProject(projectOptions[0].value);
        }
    }, [projectOptions]);

    useEffect(() => {
        if (orgOptions.length > 0) {
            setOrg(orgOptions[0].value);
        }
    }, [orgOptions]);

    if (!org || !project) {
        return <Spinner />;
    }

    if (orgOptions.length === 0) {
        return (
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>
                        Please create an organization to proceed
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateOrganizationButton />
                </CardContent>
            </Card>
        );
    }

    if (projectOptions.length === 0) {
        return (
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Please create an project to proceed</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateProjectButton />
                </CardContent>
            </Card>
        );
    }

    const formLink =
        type === "MOCK" ? "mocks/create-mock" : "headers/create-header";

    if (orgOptions.length === 1 && projectOptions.length === 1) {
        const baseRoute = getProjectRoute(
            orgOptions[0].value,
            projectOptions[0].value
        );
        return <Navigate to={`${baseRoute}/${formLink}`} />;
    }

    return (
        <form>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Please select an organization and project to proceed
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <BasicSelect
                            required
                            options={orgOptions}
                            value={org}
                            onChange={setOrg}
                        />
                        <BasicSelect
                            required
                            options={projectOptions}
                            value={project}
                            onChange={setProject}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Next</Button>
                </CardFooter>
            </Card>
        </form>
    );
};
