import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/dashboard/components/ui/table";
import { Skeleton } from "@/dashboard/components/ui/skeleton";
import { getRandom } from "@/dashboard/lib";
import { memo } from "react";

export const MocksTableLoader = memo(() => {
    return (
        <div>
            <Table className="border rounded-sm">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Latency</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {new Array(getRandom(3, 5)).fill(0).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                <Skeleton className="h-[14px] w-[40px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton
                                    style={{ width: getRandom(10, 80) + "%" }}
                                    className="h-[14px]"
                                />
                            </TableCell>
                            <TableCell>
                                <Skeleton
                                    style={{ width: getRandom(10, 80) + "%" }}
                                    className="h-[14px]"
                                />
                            </TableCell>
                            <TableCell>
                                <Skeleton
                                    style={{ width: getRandom(10, 80) + "%" }}
                                    className="h-[14px]"
                                />
                            </TableCell>
                            <TableCell>
                                <Skeleton
                                    style={{ width: getRandom(10, 80) + "%" }}
                                    className="h-[14px]"
                                />
                            </TableCell>
                            <TableCell>
                                <Skeleton
                                    style={{ width: getRandom(10, 80) + "%" }}
                                    className="h-[14px]"
                                />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-[14px] w-[80%]" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
});
