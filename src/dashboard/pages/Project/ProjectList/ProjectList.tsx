/**
 * Users can have upto n projects in offline mode
 */

import { useProjectListQuery } from "../queries/useProjectListQuery";
import { CreateProjectButton } from "../CreateProject";
import { Input } from "@/dashboard/components/ui/input";
import { useOrganizationStore } from "@/dashboard/pages/Organization";
import { ProjectCard } from "./ProjectCard";

export const ProjectList = () => {
    // get offline projects from local storage or API
    const { data, isLoading, isError } = useProjectListQuery({});
    const { organization } = useOrganizationStore();

    console.log({ organization });

    if (data?.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2 pt-16">
                    <p>No projects found</p>
                    <CreateProjectButton />
                </div>
            </div>
        );
    }

    if (isError) {
        return <div>Error loading projects</div>;
    }

    if (isLoading || !organization) {
        return <div>Loading</div>;
    }

    return (
        <main className="w-full h-full overflow-hidden flex flex-col px-4 py-2">
            <h1 className="text-2xl font-medium mb-4">Projects</h1>
            <div className="flex justify-between items-center mb-4">
                <Input
                    className="w-3xs h-8"
                    placeholder="Search for an organization"
                />
                <CreateProjectButton />
            </div>
            <div className="overflow-hidden h-full w-full">
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data?.map((project) => (
                        <li key={project.localId}>
                            <ProjectCard
                                project={project}
                                organizationSlug={organization.slug}
                            />
                        </li>
                    ))}
                </ul>
                <div className="mt-4 border-2 border-blue-500 rounded-lg bg-blue-500 p-4 text-white">
                    Mokku has changed, have questions? Check out our{" "}
                    <a
                        target="_blank"
                        className="underline"
                        href="https://get.mokku.app/faq"
                    >
                        FAQ's
                    </a>
                </div>
            </div>
        </main>
    );
};
