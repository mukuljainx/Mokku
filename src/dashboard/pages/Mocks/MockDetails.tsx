import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Badge } from "@/dashboard/components/ui/badge";
import { MethodBadge } from "@/dashboard/components/ui/MethodBadge";
import { Switch } from "@/dashboard/components/ui/switch";
import { Separator } from "@/dashboard/components/ui/separator";
import type { IMock } from "@/dashboard/types";
import { format } from "date-fns";
import { Button } from "@/dashboard/components/ui/button";
import { X } from "lucide-react";
import { Link } from "react-router";
import { useProjectStore } from "../Project";
import { useOrganizationStore } from "../Organization";
import { getProjectRoute } from "@/dashboard/lib/routes";

interface MockDetails {
    mock: IMock;
    onClose: () => void;
}

export const MockDetails = ({ mock, onClose }: MockDetails) => {
    const { project } = useProjectStore();
    const { organization } = useOrganizationStore();

    const headersObject = (mock.headers || []).reduce<Record<string, string>>(
        (acc, curr) => {
            acc[curr.name] = curr.value;
            return acc;
        },
        {}
    );

    return (
        <Card className="gap-0 pt-1 pb-4 min-w-[480px] overflow-auto h-full">
            <CardHeader className="px-4 flex justify-between items-center">
                <CardTitle>Mock Details</CardTitle>
                <div className="flex items-center">
                    <Link
                        to={`${getProjectRoute(organization!.slug, project!.slug)}/mocks/${mock.localId}`}
                    >
                        <Button variant="link-info">Edit Mock</Button>
                    </Link>
                    <Button variant="ghost" onClick={onClose} size={"icon"}>
                        <X />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
                <Separator />

                <div className="px-4">
                    <h4>Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Name
                            </label>
                            <p className="text-sm font-medium">{mock.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Status
                            </label>
                            <div className="flex items-center gap-2">
                                <Switch checked={mock.active} disabled />
                                <span className="text-sm">
                                    {mock.active ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                        {mock.description && (
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Description
                                </label>
                                <p className="text-sm">{mock.description}</p>
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Type
                            </label>
                            <div className="flex items-center gap-2">
                                {mock.dynamic && (
                                    <Badge variant="secondary">Dynamic</Badge>
                                )}
                                <Badge variant="outline">
                                    {mock.dynamic
                                        ? "Dynamic Mock"
                                        : "Static Mock"}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Created
                            </label>
                            <p className="text-sm">
                                {format(
                                    new Date(mock.createdAt),
                                    "MMM dd, yyyy 'at' HH:mm"
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <Separator />

                {/* Request Matching */}

                <div className="px-4">
                    <h4>Request Matching</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Request Type
                            </label>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={
                                        mock.requestType === "REST"
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {mock.requestType}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Method
                            </label>
                            <div className="flex items-center gap-2">
                                <MethodBadge method={mock.method} />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                URL
                            </label>
                            <p className="text-sm font-mono bg-muted p-2 rounded border break-all">
                                {mock.url}
                            </p>
                        </div>
                        {mock.requestType === "GRAPHQL" &&
                            mock.operationName && (
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Operation Name
                                    </label>
                                    <p className="text-sm font-mono bg-muted p-2 rounded border">
                                        {mock.operationName}
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
                <Separator />
                <div className="px-4">
                    {/* Response Configuration */}
                    <h4>Response Configuration</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Status Code
                            </label>
                            <p className="text-sm font-medium">{mock.status}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Delay (ms)
                            </label>
                            <p className="text-sm">{mock.delay || 0}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Response Type
                            </label>
                            <Badge
                                variant={
                                    mock.responseType === "STATIC"
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {mock.responseType}
                            </Badge>
                        </div>
                    </div>

                    {/* Response Headers */}
                    {mock.headers && mock.headers.length > 0 && (
                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                Response Headers
                            </label>
                            <div className="space-y-2">
                                <pre className="text-xs bg-muted p-3 rounded border">
                                    {JSON.stringify(headersObject, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Response Body */}
                    {mock.responseType === "STATIC" && mock.response && (
                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                Response Body
                            </label>
                            <pre className="text-xs bg-muted p-3 rounded border">
                                {typeof mock.response === "string"
                                    ? (() => {
                                          try {
                                              return JSON.stringify(
                                                  JSON.parse(mock.response),
                                                  null,
                                                  2
                                              );
                                          } catch {
                                              return mock.response;
                                          }
                                      })()
                                    : JSON.stringify(mock.response, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Function Response */}
                {mock.responseType === "FUNCTION" && mock.function && (
                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Response Function
                        </label>
                        <pre className="text-xs bg-muted p-3 rounded border overflow-auto max-h-60 font-mono">
                            {mock.function}
                        </pre>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
