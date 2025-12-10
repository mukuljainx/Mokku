/**
 * Generated using Gemini
 */

import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

interface JsonEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    height?: string;
    theme?: "vs-dark" | "vs-light";
    setUri: (id: string, uri: monaco.Uri) => void;
    id: string;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
    value = "{\n\n}",
    onChange,
    readOnly = false,
    height = "400px",
    theme = "vs-dark",
    setUri,
    id,
}) => {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef =
        useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const onChangeRef = useRef(onChange); // To keep onChange callback fresh in listener

    // Update ref when onChange prop changes
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    const formatDocument = () => {
        editorInstanceRef.current
            ?.getAction("editor.action.formatDocument")
            ?.run();
    };

    useEffect(() => {
        const container = editorContainerRef.current;

        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "s") {
                event.preventDefault();
            }
        };

        if (container && !editorInstanceRef.current) {
            container.addEventListener("keydown", handleKeyDown);

            const editor = monaco.editor.create(container, {
                value: value,
                language: "json",
                theme: theme,
                automaticLayout: true,
                readOnly: readOnly,
                minimap: { enabled: false },

                // Ensures JSON specific validation and other language features are active
                // You can further configure monaco.languages.json.jsonDefaults here if needed
            });

            editorInstanceRef.current = editor;

            editor.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                () => {
                    formatDocument();
                },
            );

            editor.onDidBlurEditorWidget(() => {
                formatDocument();
            });

            editor.onDidChangeModelContent(() => {
                const currentValue = editor.getValue();
                if (onChangeRef.current) {
                    onChangeRef.current(currentValue);
                }
            });

            const model = editor.getModel();
            if (model) {
                setUri(id, model.uri);
            }
        }

        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.dispose();
                editorInstanceRef.current = null;
            }
            container?.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to create and dispose editor once

    // Handle external value changes
    useEffect(() => {
        if (
            editorInstanceRef.current &&
            editorInstanceRef.current.getValue() !== value
        ) {
            editorInstanceRef.current.setValue(value);
        }
    }, [value]);

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
