import * as React from "react";
import { parseJSONIfPossible } from "@/lib/parseJson";
import { ILog } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JSONPreview } from "./JSONPreview";

interface LogDetailsProps {
    log: ILog;
    onClose: () => void;
}

export const LogDetails = ({ log, onClose }: LogDetailsProps) => {
    const { request, response } = log;

    return (
        <div className="log-details-container">
            <div className="flex items-center gap-1 px-1 py-1">
                <Button
                    size="icon"
                    variant="ghost"
                    className="log-details-close-button"
                    onClick={onClose}
                >
                    <X />
                </Button>
                <p className="text-sm font-medium">{request?.url}</p>
                {/* <button
                    onClick={() => {
                        location.reload();
                    }}
                >
                    Refresh
                </button> */}
            </div>

            <Tabs defaultValue="response" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="request">Request</TabsTrigger>
                </TabsList>
                <TabsContent
                    className="px-2 flex flex-col gap-6"
                    value="response"
                >
                    <JSONPreview
                        title="Headers"
                        jsonString={response?.headers}
                        placeholder="No Headers."
                    />

                    <JSONPreview
                        title="Body"
                        jsonString={response?.response}
                        placeholder="No response body."
                    />
                </TabsContent>
                <TabsContent
                    value="request"
                    className="px-2 flex flex-col gap-6"
                >
                    <JSONPreview
                        title="Headers"
                        jsonString={request?.headers}
                        placeholder="No Headers."
                    />
                    <JSONPreview
                        title="Query Params"
                        jsonString={request?.queryParams}
                        placeholder="No query parameters."
                    />

                    <JSONPreview
                        title="Body"
                        jsonString={request?.body}
                        placeholder="No request body."
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};
