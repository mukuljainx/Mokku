import { type IMock } from "@/dashboard/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/dashboard/components/ui/table";
import { Switch } from "@/dashboard/components/ui/switch";
import { MocksTableLoader } from "./MocksTableLoader";
import { Error } from "@/dashboard/components/ui/Error";
import { SimpleTooltip } from "@/dashboard/components/ui/Simple-tooltip";
import { Button } from "@/dashboard/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/dashboard/lib";

interface MocksTableProps {
    data?: IMock[];
    onFilterChange?: () => void;
    loading?: boolean;
    error?: boolean;
    onDelete: (id?: number) => void;
    onUpdate: (mockId?: number, mock?: Partial<IMock>) => void;
    onRowClick: (mock: IMock) => void;
    className?: string;
}

// Name	Method	URL	Status	Delay

export const MocksTable = ({
    data = [],
    loading,
    error,
    onDelete,
    onUpdate,
    onRowClick,
    className,
}: MocksTableProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    if (loading) {
        return <MocksTableLoader />;
    }

    if (error) {
        return (
            <div>
                <Error />
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className={cn("border rounded-sm overflow-auto", className)}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Latency</TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <div className="text-sm w-full text-center p-4">No Mocks</div>
            </div>
        );
    }

    return (
        <div className={cn("border rounded-sm overflow-auto", className)}>
            <Table className="overflow-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px]"></TableHead>
                        <TableHead className="w-[120px] max-w-[160px]">
                            Name
                        </TableHead>
                        <TableHead className="w-[80px]">Type</TableHead>
                        <TableHead className="w-[100px]">Method</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px]">Latency</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((mock) => (
                        <TableRow
                            onClick={() => onRowClick(mock)}
                            key={mock.localId}
                            className={cn(mock.isUpdating ? "opacity-50" : "")}
                        >
                            <TableCell className="font-medium">
                                <Switch
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    disabled={mock.isUpdating}
                                    onCheckedChange={(value) => {
                                        onUpdate?.(mock.localId, {
                                            active: value,
                                        });
                                    }}
                                    checked={mock.active}
                                />
                            </TableCell>
                            <TableCell className="w-[120px] max-w-[160px]">
                                <SimpleTooltip
                                    className="w-full text-ellipsis"
                                    content={mock.name || ""}
                                >
                                    <div className="text-ellipsis overflow-hidden w-full">
                                        {mock.name}
                                    </div>
                                </SimpleTooltip>
                            </TableCell>
                            <TableCell className="w-[80px] max-w-[160px]">
                                <div className="text-ellipsis overflow-hidden w-full">
                                    {mock.requestType}
                                </div>
                            </TableCell>
                            <TableCell>{mock.method}</TableCell>
                            <TableCell>
                                <SimpleTooltip
                                    className="w-full text-ellipsis"
                                    content={mock.url || ""}
                                >
                                    <div className="text-ellipsis overflow-hidden w-full">
                                        {mock.url}
                                    </div>
                                </SimpleTooltip>
                            </TableCell>
                            <TableCell>{mock.status}</TableCell>
                            <TableCell>{mock.delay} ms</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <SimpleTooltip asChild content="Edit mock">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                const mockId = mock.localId;

                                                navigate(
                                                    `${pathname}/${mockId}`,
                                                    {
                                                        state: {
                                                            mock: mock,
                                                        },
                                                    }
                                                );
                                            }}
                                        >
                                            <Edit />
                                        </Button>
                                    </SimpleTooltip>
                                    <SimpleTooltip
                                        asChild
                                        content="Delete mock"
                                    >
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onDelete(mock.localId);
                                            }}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </SimpleTooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
