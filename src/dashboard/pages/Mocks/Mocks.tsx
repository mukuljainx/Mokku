import { MocksTable } from "./MocksTable";
import { useMocksQuery } from "@/dashboard/pages/Mocks/queries/useMocksQuery";
import { useCallback, useState } from "react";
import { MockFilter } from "./MockFilter";
import { PaginationWrapper } from "@/dashboard/components/ui/PaginationWrapper";
import { useDebouncedState } from "@/dashboard/hooks/useDebouncedState";
import { useMockDelete } from "@/dashboard/pages/Mocks/queries/useMockDelete";
import { useMockUpdate } from "@/dashboard/pages/Mocks/queries/useMockUpdate";
import type { IMock } from "@/dashboard/types";
import { Separator } from "@/dashboard/components/ui/separator";
import { useProjectStore } from "../Project";
import { toast } from "sonner";
import { MockDetails } from "./MockDetails";

export interface IFilter {
    limit: number;
    page: number;
    active?: boolean;
    dynamic?: boolean;
    search: string;
}

export const Mocks = () => {
    const [filter, setFilter, debouncedFilter] = useDebouncedState<IFilter>(
        {
            search: "",
            limit: 20,
            page: 0,
        },
        500
    );
    const { project } = useProjectStore();

    const { data, isLoading, isError } = useMocksQuery(
        debouncedFilter,
        project?.localId
    );

    const { mutate: deleteMock } = useMockDelete({
        onSuccess: () => {
            toast.success("Mock deleted successfully");
        },
        onError: () => {
            toast.error(`Error deleting mock`);
        },
    });
    const { mutate: updateMock } = useMockUpdate({
        onSuccess: () => {
            toast.success("Mock updated successfully");
        },
        onError: (error) => {
            toast.error(`Error updating mock: ${error}`);
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
        (id?: number) => {
            if (id) {
                deleteMock({ localId: id });
            }
        },
        [deleteMock]
    );

    const handleUpdate = useCallback(
        (id?: number, mock?: Partial<IMock>) => {
            if (id && mock) {
                updateMock({ localId: id, mock: mock });
            }
        },
        [updateMock]
    );

    const [sideBarMock, setSideBarMock] = useState<IMock | null>(null);

    return (
        <div className="flex gap-2 flex-col h-full overflow-hidden">
            <h2 className="px-4 pt-2 text-lg font-medium">Mocks</h2>
            <Separator />
            <div className="flex gap-2 flex-col grow overflow-hidden">
                <MockFilter value={filter} onChange={handleFilterChange} />
                <div className="flex items-start gap-2 overflow-hidden ">
                    <div className="flex flex-col grow overflow-hidden max-h-full">
                        <MocksTable
                            className="grow overflow-auto"
                            onRowClick={setSideBarMock}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            error={isError}
                            loading={isLoading}
                            data={data?.mocks || []}
                        />
                    </div>
                    {sideBarMock && (
                        <MockDetails
                            onClose={() => setSideBarMock(null)}
                            mock={sideBarMock}
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
