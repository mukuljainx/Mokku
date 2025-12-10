import { Button } from "@/dashboard/components/ui/button";
import { getBaseOrgRoute } from "@/dashboard/lib/routes";
import { Plus } from "lucide-react";
import { Link } from "react-router";

export const CreateOrganizationButton = () => {
    return (
        <Link to={`${getBaseOrgRoute()}/create`}>
            <Button className="items-center gap-2 flex">
                <Plus />
                Create Organization
            </Button>
        </Link>
    );
};
