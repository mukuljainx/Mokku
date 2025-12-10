import { useParams } from "react-router";

export const useOrgId = () => {
    const { orgId } = useParams();

    return orgId;
};
