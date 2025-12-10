import { Link } from "react-router";
import { Badge } from "@/dashboard/components/ui/badge";
import { getProjectRoute } from "@/dashboard/lib/routes";
import type { IProject } from "@/dashboard/types";
import { useProjectStats } from "../queries/useProjectStats";

export const ProjectCard = ({
    project,
    organizationSlug,
}: {
    project: IProject;
    organizationSlug: string;
}) => {
    const { data, isLoading, isError } = useProjectStats(project.localId);

    return (
        <Link
            to={getProjectRoute(organizationSlug, project.slug)}
            className="p-3 border rounded-md block hover:shadow-sm hover:border-gray-300 transition cursor-pointer"
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">{project.name}</h2>
                {project?.isLocal && <Badge variant="secondary">Local</Badge>}
            </div>
            <p className=" text-sm leading-none text-gray-600">
                {project.description}
            </p>
            <div className="mt-4 flex items-center gap-x-5 text-sm text-gray-500">
                {isLoading && (
                    <>
                        <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200" />
                        <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200" />
                        <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200" />
                    </>
                )}
                {isError && (
                    <span className="text-red-300">Could not load stats</span>
                )}
                {data &&
                    [
                        {
                            value: data.active,
                            label: "Active",
                            className: "text-green-400 text-lg",
                        },
                        {
                            value: data.dynamic,
                            label: "Dynamic",
                            className: "text-blue-400 text-lg",
                        },
                        {
                            value: data.total,
                            label: "Total",
                            className: "text-dark text-lg",
                        },
                    ].map(({ value, label, className }, index) => (
                        // <span>
                        //     <span className={className}>{value}</span> {label}
                        // </span>
                        <span key={index} className="flex items-baseline gap-1">
                            <span className="font-semibold">{label}:</span>
                            <span className={className}>{value}</span>
                        </span>
                    ))}
            </div>
        </Link>
    );
};
