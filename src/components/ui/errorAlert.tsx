import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IErrorData } from "@/types";

interface ErrorAlertProps {
    errorData: IErrorData;
    onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
    errorData,
    onDismiss,
}) => {
    return (
        <div className="p-4">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Mokku cannot work on this site</AlertTitle>
                <AlertDescription>
                    <div className="space-y-2">
                        <p className="text-sm">Reason: {errorData.reason}</p>
                        <p>
                            Website: <strong>{errorData.site}</strong>
                        </p>
                        <div className="flex gap-2 mt-3">
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
