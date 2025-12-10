/**
 * Generated using Gemini
 */

import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

interface FunctionEditorProps {
    value?: string; // Represents only the editable part of the code
    onChange?: (editableValue: string) => void;
    readOnly?: boolean;
    height?: string;
    theme?: "vs-dark" | "vs-light";
    customLinter?: (
        fullCode: string,
        monacoInstance: typeof monaco,
    ) => monaco.editor.IMarkerData[];
    setUri: (id: string, uri: monaco.Uri) => void;
    id: string;
}

const fixedHeader = "function handler(urlParams, searchQuery, body) {";
const fixedFooter = "}";

export const FunctionEditor: React.FC<FunctionEditorProps> = ({
    value = `  // your code here
  // use 'return' to send response
  // urlParams, searchQuery, body, are objects containing request data`,
    onChange,
    readOnly = false,
    height = "400px",
    theme = "vs-dark",
    customLinter,
    setUri,
    id,
}) => {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef =
        useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const onChangeRef = useRef(onChange); // To keep onChange callback fresh in listener
    const isApplyingCorrectionRef = useRef(false); // To prevent infinite loops
    const linterId = "custom-function-linter"; // Unique ID for markers from this linter

    const getEffectivePaths = () => {
        const effectivePrefix = fixedHeader ? fixedHeader + "\n" : "";
        const effectiveSuffix = fixedFooter ? "\n" + fixedFooter : "";
        return { effectivePrefix, effectiveSuffix };
    };

    // Update ref when onChange prop changes
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    const runCustomLinter = () => {
        if (!editorInstanceRef.current) return;
        const model = editorInstanceRef.current.getModel();
        if (!model) return;

        if (!customLinter) {
            // Clear previous custom markers if linter is removed or not provided
            monaco.editor.setModelMarkers(model, linterId, []);
            return;
        }

        const fullCode = model.getValue();
        const markers = customLinter(fullCode, monaco);
        monaco.editor.setModelMarkers(model, linterId, markers);
    };

    // Run linter if the customLinter prop itself changes or on initial mount if available
    useEffect(runCustomLinter, [customLinter]);

    useEffect(() => {
        let handleMarkersChange: monaco.IDisposable | undefined;
        if (editorContainerRef.current && !editorInstanceRef.current) {
            const { effectivePrefix, effectiveSuffix } = getEffectivePaths();
            const initialEditorValue =
                effectivePrefix + value + effectiveSuffix;

            const editor = monaco.editor.create(editorContainerRef.current, {
                value: initialEditorValue,
                language: "javascript",
                theme: theme,
                automaticLayout: true,
                readOnly: readOnly,
                minimap: { enabled: false },
            });
            editorInstanceRef.current = editor;
            const model = editor.getModel();
            if (model) {
                setUri(id, model.uri);
            }

            setTimeout(() => {
                // Set cursor position after fixedHeader on mount/change
                // The target line is the one where the 'value' (editable content) begins.
                const targetLineNumber = effectivePrefix.split("\n").length;
                // Determine initial indentation of the 'value' prop to place cursor after it.
                const firstLineOfValue = value.split("\n")[0];
                const initialIndentationLength =
                    firstLineOfValue.match(/^(\s*)/)?.[0]?.length || 0;
                const targetColumn = initialIndentationLength + 1;

                editor.setPosition({
                    lineNumber: targetLineNumber,
                    column: targetColumn,
                });
                editor.focus(); // Ensure editor has focus for cursor to be visible
            }, 0);

            editor.onDidChangeModelContent(() => {
                if (
                    isApplyingCorrectionRef.current ||
                    !editorInstanceRef.current
                ) {
                    return;
                }

                const currentFullText = editorInstanceRef.current.getValue();
                const { effectivePrefix, effectiveSuffix } =
                    getEffectivePaths();

                // Determine the editable part based on the current full text
                // This will be used for onChange if no correction is needed,
                // or as a basis for newEditableContent if correction is needed.
                let editableContentForOnChange = currentFullText.substring(
                    effectivePrefix.length,
                    Math.max(
                        effectivePrefix.length,
                        currentFullText.length - effectiveSuffix.length,
                    ),
                );

                const actualCurrentPrefix = currentFullText.substring(
                    0,
                    effectivePrefix.length,
                );
                const actualCurrentSuffix = currentFullText.substring(
                    Math.max(
                        effectivePrefix.length, // Ensure start index is not negative
                        currentFullText.length - effectiveSuffix.length,
                    ),
                );

                if (
                    actualCurrentPrefix !== effectivePrefix ||
                    actualCurrentSuffix !== effectiveSuffix
                ) {
                    isApplyingCorrectionRef.current = true;

                    // Recalculate editable content based on what will be in correctedFullText
                    // This ensures the onChange callback receives the content that will actually
                    // be present in the editable section after correction.
                    const potentialEditableStart = effectivePrefix.length;
                    const potentialEditableEnd =
                        currentFullText.length - effectiveSuffix.length;

                    if (potentialEditableEnd > potentialEditableStart) {
                        editableContentForOnChange = currentFullText.substring(
                            potentialEditableStart,
                            potentialEditableEnd,
                        );
                    } else {
                        editableContentForOnChange = ""; // Handle cases where fixed parts might overlap or consume content
                    }

                    const correctedFullText =
                        effectivePrefix +
                        editableContentForOnChange +
                        effectiveSuffix;

                    // Call onChange with the editable content that WILL BE SET.
                    // This is crucial to keep react-hook-form and other external listeners
                    // in sync with the state that will result from setValue.
                    onChangeRef.current?.(editableContentForOnChange);

                    editorInstanceRef.current.setValue(correctedFullText);
                    // setValue will trigger onDidChangeModelContent again.
                    // The isApplyingCorrectionRef flag will ensure it returns early.
                    isApplyingCorrectionRef.current = false;
                    return; // Explicitly return after handling correction and setValue
                }

                // If no correction was made, call onChange with the current editable part.
                onChangeRef.current?.(editableContentForOnChange);

                // Run custom linter after content change and potential corrections
                runCustomLinter();
            });
        }

        return () => {
            // Clear markers from this linter when the component unmounts
            const model = editorInstanceRef.current?.getModel(); // Check if model still exists
            if (model) {
                monaco.editor.setModelMarkers(model, linterId, []);
            }

            if (editorInstanceRef.current) {
                editorInstanceRef.current.dispose();
                editorInstanceRef.current = null;
            }

            if (handleMarkersChange) {
                handleMarkersChange.dispose();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Recreate if fixed parts change

    // Handle external value changes
    useEffect(() => {
        if (editorInstanceRef.current && !isApplyingCorrectionRef.current) {
            const { effectivePrefix, effectiveSuffix } = getEffectivePaths();
            const expectedFullText = effectivePrefix + value + effectiveSuffix;
            if (editorInstanceRef.current.getValue() !== expectedFullText) {
                isApplyingCorrectionRef.current = true; // Prevent loop from internal onChange
                editorInstanceRef.current.setValue(expectedFullText);
                isApplyingCorrectionRef.current = false;
                // Run linter after external value change
                runCustomLinter();
            }
        }
    }, [value, fixedHeader, fixedFooter]);

    // Handle readOnly and theme changes
    useEffect(() => {
        if (editorInstanceRef.current) {
            editorInstanceRef.current.updateOptions({
                readOnly: readOnly,
                theme: theme,
            });
        }
    }, [readOnly, theme]);

    return (
        <div
            ref={editorContainerRef}
            style={{ height: height, border: "1px solid #ccc" }}
        />
    );
};
