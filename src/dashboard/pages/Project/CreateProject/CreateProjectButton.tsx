import { Button } from "@/dashboard/components/ui/button";
import { getOrgRoute } from "@/dashboard/lib/routes";
import { useOrganizationStore } from "@/dashboard/pages/Organization";
import { Plus } from "lucide-react";
import { Link } from "react-router";

export const CreateProjectButton = () => {
    const { organization } = useOrganizationStore();
    return (
        <Button className="" disabled={!organization}>
            <Link
                className="items-center gap-2 flex"
                to={`${getOrgRoute(organization?.slug)}/projects/create`}
            >
                <Plus />
                Create Project
            </Link>
        </Button>
    );
};
