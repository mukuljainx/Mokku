import {
    createSelectors,
    type ErrorState,
    type LoadingState,
} from "@/dashboard/lib";
import { create } from "zustand";
import { useParams } from "react-router";
import { useEffect } from "react";
import type { IProject } from "@/dashboard/types";
import { useProjectQuery } from "../queries/useProjectQuery";

export interface useProjectState extends LoadingState, ErrorState {
    project: IProject | null;
    setProject: (x: IProject | null) => void;
}

const useProjectStoreBase = create<useProjectState>()((set) => ({
    setLoading: (x) => set({ loading: x }),
    setError: (x) => set({ error: x }),
    project: null,
    setProject: (x) => set({ project: x }),
}));

export const useProjectStore = createSelectors(useProjectStoreBase);

export const useProjectListener = () => {
    const { projectSlug } = useParams<{ projectSlug: string }>();
    const { setProject, setError, setLoading } = useProjectStore();
    const { data, error, isLoading } = useProjectQuery({
        slug: projectSlug,
    });

    useEffect(() => {
        console.log("Project Listener Mounted", new Date().toISOString());
    }, []);

    useEffect(() => {
        setError(error?.message);
    }, [error?.message, setError]);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    useEffect(() => {
        if (projectSlug === data?.slug) {
            setProject(data || null);
        }
        if (!projectSlug) {
            setProject(null);
        }
    }, [projectSlug, data, setProject]);
};
