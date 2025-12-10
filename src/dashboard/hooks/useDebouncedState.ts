import { debounce } from "lodash-es";
import { useEffect, useRef, useState } from "react";

export const useDebouncedState = <T>(initialState: T, delay = 300) => {
    const [state, setState] = useState(initialState);
    const [debouncedState, useDebouncedState] = useState(initialState);
    const setDebouncedState = useRef(debounce(useDebouncedState, delay));

    useEffect(() => {
        setDebouncedState.current(state);
    }, [state]);

    return [state, setState, debouncedState] as const;
};
