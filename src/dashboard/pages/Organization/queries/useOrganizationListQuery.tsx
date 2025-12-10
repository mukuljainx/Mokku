import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "../../../data-fetcher/mokku/organization-data-fetcher";
import { useAppStore } from "@/dashboard/service/useAppStore";

interface useOrganizationListQueryProps {
    name?: string;
}

export const useOrganizationListQuery = (
    args: useOrganizationListQueryProps = {}
) => {
    const { isConnected } = useAppStore();

    return useQuery({
        staleTime: 10000,
        queryKey: ["organizations", { args }],
        queryFn: getOrganizations,
        enabled: isConnected,
    });
};
