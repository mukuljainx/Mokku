import * as React from "react";
import { ILog } from "@mokku/types";

interface LogDetailsProps {
    log: ILog;
    onClose: () => void;
}

const CodeBlock = ({
    placeholder,
    code,
}: {
    code?: string | null;
    placeholder: string;
}) => (
    <>
        {code ? (
            <pre className="log-details-code-block">{code}</pre>
        ) : (
            <span>{placeholder}</span>
        )}
    </>
);

export const LogDetails = ({ log, onClose }: LogDetailsProps) => {
    const { request, response } = log;
    const [activeTab, setActiveTab] = React.useState("Response"); // State to manage active tab

    return (
        <div className="log-details-container">
            <div className="log-details-header">
                <button className="log-details-close-button" onClick={onClose}>
                    &times;{" "}
                    {/* HTML entity for multiplication sign, commonly used for close buttons */}
                </button>
                <div className="log-details-url">{request.url}</div>
            </div>

            <div className="log-details-tabs">
                <button
                    className={`log-details-tab-button ${
                        activeTab === "Response" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Response")}
                >
                    Response
                </button>
                <button
                    className={`log-details-tab-button ${
                        activeTab === "Request" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Request")}
                >
                    Request
                </button>
            </div>

            <div className="log-details-content">
                {activeTab === "Response" && (
                    <div className="log-details-response-tab">
                        <h3>Headers</h3>
                        <pre className="log-details-code-block">
                            {JSON.stringify(response.headers, null, 2)}
                        </pre>
                        <h3>Body</h3>
                        <CodeBlock
                            code={response.response}
                            placeholder="No response body."
                        />
                        {/* <pre className="log-details-code-block">
                            {response.response}
                        </pre> */}
                    </div>
                )}

                {activeTab === "Request" && (
                    <div className="log-details-request-tab">
                        <h3>Headers</h3>
                        <pre className="log-details-code-block">
                            {JSON.stringify(request.headers, null, 2)}
                        </pre>
                        <h3>Query Params</h3>
                        <CodeBlock
                            code={request.queryParams}
                            placeholder="No query parameters."
                        />
                        <h3>Body</h3>
                        <CodeBlock
                            code={request.body}
                            placeholder="No request body."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
