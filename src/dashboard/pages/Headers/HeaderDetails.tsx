import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Badge } from "@/dashboard/components/ui/badge";
import { Switch } from "@/dashboard/components/ui/switch";
import { Separator } from "@/dashboard/components/ui/separator";
import type { IHeader } from "@/dashboard/types";
import { format } from "date-fns";
import { Button } from "@/dashboard/components/ui/button";
import { X } from "lucide-react";
import { Link } from "react-router";
import { useProjectStore } from "../Project";
import { useOrganizationStore } from "../Organization";
import { getProjectRoute } from "@/dashboard/lib/routes";

interface HeaderDetailsProps {
    header: IHeader;
    onClose: () => void;
}

export const HeaderDetails = ({ header, onClose }: HeaderDetailsProps) => {
    const { project } = useProjectStore();
    const { organization } = useOrganizationStore();

    const formatResourceTypes = (resourceTypes?: string[]) => {
        if (!resourceTypes || resourceTypes.length === 0) return "All";
        return resourceTypes.join(", ");
    };

    const formatRequestMethods = (requestMethods?: string[]) => {
        if (!requestMethods || requestMethods.length === 0) return "All";
        return requestMethods.join(", ");
    };

    return (
        <Card className="gap-0 pt-1 pb-4 min-w-[480px] overflow-auto h-full">
            <CardHeader className="px-4 flex justify-between items-center">
                <CardTitle>Header Rule Details</CardTitle>
                <div className="flex items-center">
                    <Link
                        to={`${getProjectRoute(organization!.slug, project!.slug)}/headers/${header.localId}`}
                    >
                        <Button variant="link-info">Edit Header</Button>
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
                            <p className="text-sm font-medium">{header.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Status
                            </label>
                            <div className="flex items-center gap-2">
                                <Switch checked={header.active} disabled />
                                <span className="text-sm">
                                    {header.active ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                        {header.description && (
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Description
                                </label>
                                <p className="text-sm">{header.description}</p>
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Created
                            </label>
                            <p className="text-sm">
                                {format(
                                    new Date(header.createdOn),
                                    "MMM dd, yyyy 'at' HH:mm"
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <Separator />

                {/* Request Matching Conditions */}
                <div className="px-4">
                    <h4>Request Matching</h4>
                    <div className="grid grid-cols-1 gap-4">
                        {header.condition.initiatorDomains &&
                            header.condition.initiatorDomains.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Domains
                                    </label>
                                    <div>
                                        {header.condition.initiatorDomains.join(
                                            ","
                                        )}
                                    </div>
                                </div>
                            )}
                        {header.filterType === "pattern" &&
                            header.condition.urlFilter && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        URL Filter
                                    </label>
                                    <p className="text-sm font-mono bg-muted p-2 rounded border break-all">
                                        {header.condition.urlFilter}
                                    </p>
                                </div>
                            )}

                        {header.filterType === "regex" &&
                            header.condition.regexFilter && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Regex Filter
                                    </label>
                                    <p className="text-sm font-mono bg-muted p-2 rounded border break-all">
                                        {header.condition.regexFilter}
                                    </p>
                                </div>
                            )}

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Resource Types
                                </label>
                                <p className="text-sm">
                                    {formatResourceTypes(
                                        header.condition.resourceTypes
                                    )}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Request Methods
                                </label>
                                <p className="text-sm">
                                    {formatRequestMethods(
                                        header.condition.requestMethods
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />

                {/* Action Configuration */}
                <div className="px-4">
                    <h4>Headers</h4>
                    <div className="grid grid-cols-1 gap-4">
                        {header.action.requestHeaders &&
                            header.action.requestHeaders.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        Request Headers
                                    </label>
                                    <div className="space-y-2">
                                        {header.action.requestHeaders.map(
                                            (headerItem, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-muted p-3 rounded border"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                                        <div>
                                                            <span className="font-medium">
                                                                Header:{" "}
                                                            </span>
                                                            <code>
                                                                {
                                                                    headerItem.header
                                                                }
                                                            </code>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Value:{" "}
                                                            </span>
                                                            <code>
                                                                {headerItem.value ||
                                                                    "-"}
                                                            </code>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Operation:{" "}
                                                            </span>
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {
                                                                    headerItem.operation
                                                                }
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                        {header.action.responseHeaders &&
                            header.action.responseHeaders.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        Response Headers
                                    </label>
                                    <div className="space-y-2">
                                        {header.action.responseHeaders.map(
                                            (headerItem, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-muted p-3 rounded border"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                                        <div>
                                                            <span className="font-medium">
                                                                Operation:{" "}
                                                            </span>
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {
                                                                    headerItem.operation
                                                                }
                                                            </Badge>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Header:{" "}
                                                            </span>
                                                            <code>
                                                                {
                                                                    headerItem.header
                                                                }
                                                            </code>
                                                        </div>
                                                        {headerItem.value && (
                                                            <div>
                                                                <span className="font-medium">
                                                                    Value:{" "}
                                                                </span>
                                                                <code>
                                                                    {
                                                                        headerItem.value
                                                                    }
                                                                </code>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                        {header.action.redirect && (
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Redirect Configuration
                                </label>
                                <div className="bg-muted p-3 rounded border">
                                    <pre className="text-xs">
                                        {JSON.stringify(
                                            header.action.redirect,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
