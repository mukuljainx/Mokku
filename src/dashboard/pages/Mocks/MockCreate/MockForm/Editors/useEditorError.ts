import { useCallback, useRef } from "react";
import * as monaco from "monaco-editor";

export const useEditorError = () => {
    const uriRef = useRef<Record<string, monaco.Uri>>({});
    const doesEditorHasError = useCallback((id: string) => {
        const uri = uriRef.current[id];
        if (!uri) {
            return null;
        }

        return monaco.editor
            .getModelMarkers({ resource: uri })
            .some((error) => error.severity === monaco.MarkerSeverity.Error);
    }, []);

    const setUri = useCallback((id: string, uri: monaco.Uri) => {
        uriRef.current[id] = uri;
    }, []);

    return { setUri, doesEditorHasError };
};
