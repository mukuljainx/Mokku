import { getOrganization } from "@/dashboard/data-fetcher/mokku/organization-data-fetcher";
import { useAppStore } from "@/dashboard/service/useAppStore";
import type { IOrganization } from "@/dashboard/types";
import { useQuery } from "@tanstack/react-query";

export const useOrganizationQuery = (args: Partial<IOrganization> = {}) => {
    const { isConnected } = useAppStore();
    return useQuery({
        staleTime: 10000,
        queryKey: ["organization", { args }],
        queryFn: () => getOrganization(args),
        enabled: isConnected && (!!args.slug || !!args.id || !!args.localId),
    });
};
