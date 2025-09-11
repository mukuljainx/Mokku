import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorData } from "@/types";

interface ErrorAlertProps {
    errorData: ErrorData;
    onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
    errorData,
    onDismiss,
}) => {
    const handleRefresh = () => {
        location.reload();
    };

    return (
        <div className="p-4">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Mokku cannot work on this site</AlertTitle>
                <AlertDescription>
                    <div className="space-y-2">
                        <p>
                            <strong>{errorData.site}</strong> blocks API mocking
                            functionality.
                        </p>
                        <p className="text-sm">{errorData.reason}</p>
                        <div className="flex gap-2 mt-3">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleRefresh}
                            >
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Refresh Page
                            </Button>
                            {onDismiss && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={onDismiss}
                                >
                                    Dismiss
                                </Button>
                            )}
                        </div>
                    </div>
                </AlertDescription>
            </Alert>
        </div>
    );
};
