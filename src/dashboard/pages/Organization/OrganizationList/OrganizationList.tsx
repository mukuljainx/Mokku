import { Input } from "@/dashboard/components/ui/input";
import { useOrganizationListQuery } from "../queries/useOrganizationListQuery";
import { CreateOrganizationButton } from "../CreateOrganization";
import { Badge } from "@/dashboard/components/ui/badge";
import { Link } from "react-router";
import { getOrgRoute } from "@/dashboard/lib/routes";

export const OrganizationList = () => {
    const { data, isLoading, isError } = useOrganizationListQuery();

    if (isError) {
        return <div>Error loading organizations</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="w-full h-full overflow-hidden flex flex-col px-4 py-2">
            <h1 className="text-2xl font-medium mb-4">Organizations</h1>
            <div className="flex justify-between items-center mb-4">
                <Input
                    className="w-3xs h-8"
                    placeholder="Search for an organization"
                />
                <CreateOrganizationButton />
            </div>
            <div className="overflow-hidden h-full w-full">
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data?.map((org) => (
                        <li key={org.localId}>
                            <Link
                                to={`${getOrgRoute(org.slug)}/projects`}
                                className="p-3 border rounded-md block hover:shadow-sm hover:border-gray-300 transition cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="font-semibold">
                                        {org.name}
                                    </h2>
                                    {org?.isLocal && (
                                        <Badge variant="secondary">Local</Badge>
                                    )}
                                </div>
                                <p className=" text-sm leading-none text-gray-600">
                                    {org.description}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};
