import { HeadersTable } from "./HeadersTable";
import { useHeadersQuery } from "@/dashboard/pages/Headers/queries/useHeadersQuery";
import { useCallback, useState } from "react";
import { HeaderFilter } from "./HeaderFilter";
import { PaginationWrapper } from "@/dashboard/components/ui/PaginationWrapper";
import { useDebouncedState } from "@/dashboard/hooks/useDebouncedState";
import { useHeaderDelete } from "@/dashboard/pages/Headers/queries/useHeaderDelete";
import { useHeaderUpdate } from "@/dashboard/pages/Headers/queries/useHeaderUpdate";
import type { IHeader } from "@/dashboard/types";
import { Separator } from "@/dashboard/components/ui/separator";
import { useProjectStore } from "../Project";
import { toast } from "sonner";
import { HeaderDetails } from "./HeaderDetails";

export interface IFilter {
    limit: number;
    page: number;
    active?: boolean;
    dynamic?: boolean;
    search: string;
}

export const Headers = () => {
    const [filter, setFilter, debouncedFilter] = useDebouncedState<IFilter>(
        {
            search: "",
            limit: 20,
            page: 0,
        },
        500
    );
    const { project } = useProjectStore();

    const { data, isLoading, isError } = useHeadersQuery(
        debouncedFilter,
        project?.localId
    );
    const [sideBarHeader, setSideBarHeader] = useState<IHeader | null>(null);

    const { mutate: deleteHeader } = useHeaderDelete({
        onSuccess: () => {
            toast.success("Header deleted successfully");
        },
    });

    const { mutate: updateHeader } = useHeaderUpdate({
        onSuccess: () => {
            toast.success("Header updated successfully");
        },
        onError: (error) => {
            toast.error(`Error updating header: ${error}`);
        },
    });

    const handleFilterChange = useCallback(
        <T extends keyof IFilter>(key: T, value: IFilter[T]) => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                [key]: value,
                page: 0,
            }));
        },
        [setFilter]
    );

    const handleDelete = useCallback(
        (localId: number) => {
            deleteHeader({ localId });
        },
        [deleteHeader]
    );

    const handleUpdate = useCallback(
        (localId: number, header?: Partial<IHeader>) => {
            if (localId && header) {
                updateHeader({ localId, header });
            }
        },
        [updateHeader]
    );

    return (
        <div className="flex gap-2 flex-col h-full overflow-hidden">
            <h2 className="px-4 pt-2 text-lg font-medium">Headers</h2>
            <Separator />
            <div className="flex gap-2 flex-col grow overflow-hidden">
                <HeaderFilter value={filter} onChange={handleFilterChange} />
                <div className="flex items-start gap-2 overflow-hidden">
                    <div className="flex flex-col grow overflow-hidden max-h-full">
                        <HeadersTable
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            error={isError}
                            loading={isLoading}
                            data={data?.headers || []}
                            onRowClick={setSideBarHeader}
                        />
                    </div>
                    {sideBarHeader && (
                        <HeaderDetails
                            onClose={() => setSideBarHeader(null)}
                            header={sideBarHeader}
                        />
                    )}
                </div>
                <PaginationWrapper
                    hasNext={
                        (data?.total || 0) > filter.limit * (filter.page + 1)
                    }
                    hasPrevious={filter.page > 0}
                    onNextClick={() =>
                        setFilter((prevFilter) => ({
                            ...prevFilter,
                            page: prevFilter.page + 1,
                        }))
                    }
                    onPreviousClick={() =>
                        setFilter((prevFilter) => ({
                            ...prevFilter,
                            page: prevFilter.page - 1,
                        }))
                    }
                />
            </div>
        </div>
    );
};
