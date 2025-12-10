import { type IHeader } from "@/dashboard/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/dashboard/components/ui/table";
import { Switch } from "@/dashboard/components/ui/switch";
import { HeadersTableLoader } from "./HeadersTableLoader";
import { Error } from "@/dashboard/components/ui/Error";
import { SimpleTooltip } from "@/dashboard/components/ui/Simple-tooltip";
import { Button } from "@/dashboard/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

interface HeadersTableProps {
    data?: IHeader[];
    loading?: boolean;
    error?: boolean;
    onDelete: (id: number) => void;
    onUpdate: (headerId: number, header?: Partial<IHeader>) => void;
    onRowClick: (row: IHeader) => void;
}

export const HeadersTable = ({
    data = [],
    loading,
    error,
    onDelete,
    onUpdate,
    onRowClick,
}: HeadersTableProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (loading) {
        return <HeadersTableLoader />;
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
            <div className="border rounded-sm grow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px]"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Headers Count</TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <div className="text-sm w-full text-center p-4">No Headers</div>
            </div>
        );
    }

    return (
        <Table className="border rounded-sm">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[60px]"></TableHead>
                    <TableHead className="w-[120px] max-w-[160px]">
                        Name
                    </TableHead>
                    <TableHead>Domains</TableHead>
                    <TableHead className="w-[120px]">Headers Count</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((header) => (
                    <TableRow
                        key={header.id || header.localId}
                        onClick={() => onRowClick(header)}
                    >
                        <TableCell className="font-medium">
                            <Switch
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                onCheckedChange={(value) => {
                                    onUpdate?.(header.localId, {
                                        active: value,
                                    });
                                }}
                                checked={header.active}
                            />
                        </TableCell>
                        <TableCell className="w-[120px] max-w-[160px]">
                            <SimpleTooltip
                                className="w-full text-ellipsis"
                                content={header.name || ""}
                            >
                                <div className="text-ellipsis overflow-hidden w-full">
                                    {header.name}
                                </div>
                            </SimpleTooltip>
                        </TableCell>
                        <TableCell>
                            <SimpleTooltip
                                className="w-full text-ellipsis"
                                content={
                                    header.condition.initiatorDomains?.join(
                                        ","
                                    ) || "Applicable on all domains"
                                }
                            >
                                <div className="text-ellipsis overflow-hidden w-full">
                                    {header.condition.initiatorDomains?.join(
                                        ","
                                    ) || "*"}
                                </div>
                            </SimpleTooltip>
                        </TableCell>
                        <TableCell>
                            {header.action.requestHeaders?.length || 0}
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <SimpleTooltip asChild content="Edit header">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            const headerId =
                                                header.localId || header.id;
                                            navigate(
                                                `${pathname}/${headerId}`,
                                                {
                                                    state: {
                                                        header: header,
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        <Edit />
                                    </Button>
                                </SimpleTooltip>
                                <SimpleTooltip asChild content="Delete header">
                                    <Button
                                        data-header-id={header.id}
                                        size="icon"
                                        variant="outline"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onDelete(header.localId);
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
    );
};
