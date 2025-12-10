import * as monaco from "monaco-editor";
import { useCallback } from "react";
import { DEFAULT_DISALLOWED_APIS } from "./constant";

export function useDisallowedApisLinter() {
    const disallowedApis = DEFAULT_DISALLOWED_APIS;

    const customLinter = useCallback(
        (
            code: string,
            monacoInstance: typeof monaco,
        ): monaco.editor.IMarkerData[] => {
            const markers: monaco.editor.IMarkerData[] = [];
            const model = monacoInstance.editor
                .getModels()
                .find((m) => m.getValue() === code); // A way to get a model if needed for position conversion

            disallowedApis.forEach((apiName) => {
                // Using a regex to find whole word occurrences, potentially followed by ( or .
                const regex = new RegExp(
                    `\\b${apiName}\\b(\\s*\\(|\\s*\\.)`,
                    "g",
                );

                let match;
                while ((match = regex.exec(code)) !== null) {
                    const startOffset = match.index;
                    const endOffset = startOffset + apiName.length; // Mark just the API name

                    // Convert offset to position if model is available, otherwise use line/column 1 as fallback for simplicity
                    const startPosition = model?.getPositionAt(startOffset) || {
                        lineNumber: 1,
                        column: 1,
                    };
                    const endPosition = model?.getPositionAt(endOffset) || {
                        lineNumber: 1,
                        column: apiName.length + 1,
                    };

                    markers.push({
                        startLineNumber: startPosition.lineNumber,
                        startColumn: startPosition.column,
                        endLineNumber: endPosition.lineNumber,
                        endColumn: endPosition.column,
                        message: `Usage of '${apiName}' is disallowed. Even if the code is some how passed here like directly hitting the API, the method will be blocked while executing it.`,
                        severity: monacoInstance.MarkerSeverity.Error,
                    });
                }
            });
            return markers;
        },
        [disallowedApis],
    );

    return customLinter;
}
