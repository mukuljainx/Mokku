import {
    createSelectors,
    type ErrorState,
    type LoadingState,
} from "@/dashboard/lib";
import { create } from "zustand";
// import { useParams } from "react-router";
import { useEffect } from "react";
import type { IOrganization } from "@/dashboard/types";
import { useOrganizationQuery } from "../queries/useOrganizationQuery";

export interface useOrganizationState extends LoadingState, ErrorState {
    organization: IOrganization | null;
    setOrganization: (x: IOrganization | null) => void;
}

export const useOrganizationStoreBase = create<useOrganizationState>()(
    (set) => ({
        setLoading: (x) => set({ loading: x }),
        setError: (x) => set({ error: x }),
        organization: null,
        setOrganization: (x) => set({ organization: x }),
    })
);

export const useOrganizationStore = createSelectors(useOrganizationStoreBase);

export const useOrganizationListener = () => {
    // const { organizationSlug } = useParams<{ organizationSlug: string }>();
    const organizationSlug = "users-organization";
    const { setOrganization, setError, setLoading } = useOrganizationStore();
    const { data, isLoading, error } = useOrganizationQuery({
        slug: organizationSlug,
    });

    useEffect(() => {
        console.log("Organization Listener Mounted", new Date().toISOString());
    }, []);

    useEffect(() => {
        setError(error?.message);
    }, [error?.message, setError]);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    useEffect(() => {
        if (organizationSlug === data?.slug) {
            setOrganization(data || null);
        }
        if (!organizationSlug) {
            setOrganization(null);
        }
    }, [organizationSlug, data, setOrganization]);
};
