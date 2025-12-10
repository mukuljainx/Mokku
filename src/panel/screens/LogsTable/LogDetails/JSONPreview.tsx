import { parseJSONIfPossible } from "@/lib";
import { LayoutTemplate } from "lucide-react";
import * as React from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

interface JSONPreviewProps {
    jsonString?: string | null | object;
    placeholder: string;
    title: string;
}

const Wrapper = ({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) => (
    <div>
        <h3 className="mb-2 text-base font-medium">{title}</h3>
        <div className="px-4 py-2 border rounded-sm">{children}</div>
    </div>
);

export const JSONPreview = ({
    jsonString,
    placeholder = "Nothing to show",
    title,
}: JSONPreviewProps) => {
    if (jsonString === null || jsonString === undefined || jsonString === "") {
        return (
            <Wrapper title={title}>
                <p className="flex items-center gap-2">
                    <LayoutTemplate className="size-3" />
                    {placeholder}
                </p>
            </Wrapper>
        );
    }

    const { json, original, parsed } = parseJSONIfPossible(jsonString || "");

    let content = parsed ? json : original;

    return (
        <Wrapper title={title}>
            <JsonView src={content} />
        </Wrapper>
    );
};
