import { useQuery } from "@tanstack/react-query";
import { headersService } from "@/dashboard/data-fetcher";
import type { IHeader } from "@/dashboard/types";
import { useAppStore } from "@/dashboard/service/useAppStore";

export const useHeaderQuery = (args: Partial<IHeader>) => {
    const { isConnected } = useAppStore();
    return useQuery({
        queryKey: ["header", args],
        queryFn: () => headersService.getHeader(args),
        enabled: (!!args.id || !!args.localId) && isConnected,
    });
};
