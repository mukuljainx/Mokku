import { Input } from "@/dashboard/components/ui/input";
import { Fragment, useState } from "react";
import { getUrlInfo, isUrlDynamic } from "@/dashboard/lib/url-utils";
import { cn } from "@/dashboard/lib";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/dashboard/components/ui/table";

export const UrlTester = () => {
    const [state, setState] = useState<string>(
        "www.example.com/users/:userId/posts/:postId"
    );

    const dynamic = isUrlDynamic(state);
    const urlInfo = getUrlInfo(state || "");

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>URL Tester</CardTitle>
                <CardDescription>
                    Test and analyze your URLs for dynamic segments.
                    <br />
                    We use{" "}
                    <a
                        href="https://www.npmjs.com/package/path-to-regexp/v/8.2.0"
                        target="_blank"
                        className="text-blue-500"
                    >
                        path-to-regexp v8.2.0
                    </a>{" "}
                    for route matching
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Input
                    value={state}
                    onChange={(event) => {
                        setState(event.target.value);
                    }}
                    placeholder="Enter an URL"
                />
                {!dynamic && (
                    <div className="mt-4 text-sm text-gray-500">
                        Url is static.
                    </div>
                )}
                {dynamic && (
                    <div className="mt-4">
                        <div className="mt-2 underline text-sm">
                            {urlInfo.segmentInfos.map((segment, index) => (
                                <Fragment key={index}>
                                    <span
                                        className={cn(
                                            !segment.error &&
                                                segment.dynamic &&
                                                "bg-blue-100 text-blue-700",
                                            segment.error &&
                                                "bg-red-100 text-red-700"
                                        )}
                                    >
                                        {segment.value}
                                    </span>
                                    <span>
                                        {index ===
                                        urlInfo.segmentInfos.length - 1
                                            ? ""
                                            : "/"}
                                    </span>
                                </Fragment>
                            ))}
                        </div>
                        <div className="border mt-4 rounded no-underline">
                            <Table>
                                <TableHeader className="bg-gray-100 border-b">
                                    <TableHead>Segment</TableHead>
                                    <TableHead>is dynamic</TableHead>
                                    <TableHead>Param</TableHead>
                                    <TableHead>Error</TableHead>
                                </TableHeader>
                                <TableBody>
                                    {urlInfo.segmentInfos.map((segment) => (
                                        <TableRow className="even:bg-gray-50">
                                            <TableCell>
                                                {segment.value}
                                            </TableCell>
                                            <TableCell>
                                                {segment.dynamic ? "Yes" : "No"}
                                            </TableCell>
                                            <TableCell>
                                                {segment.param || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {segment.error}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
