import { getProjectRoute } from "@/dashboard/lib/routes";
import { useOrganizationStore } from "@/dashboard/pages/Organization";
import { useProjectStore } from "@/dashboard/pages/Project";
import { useNavigate } from "react-router";

export const useAppNavigate = () => {
    const navigate = useNavigate();

    const { project } = useProjectStore();
    const { organization } = useOrganizationStore();

    const goToMocksList = () => {
        navigate(`${getProjectRoute(organization?.slug, project?.slug)}/mocks`);
    };

    const goToHeadersList = () => {
        navigate(
            `${getProjectRoute(organization?.slug, project?.slug)}/headers`
        );
    };

    return {
        goToMocksList,
        goToHeadersList,
    };
};
