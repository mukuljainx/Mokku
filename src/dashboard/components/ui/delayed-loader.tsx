import { type ReactNode, useEffect, useState } from "react";
import { Spinner } from "./spinner";
import { Error } from "@/dashboard/components/ui/Error";

export interface DelayedLoaderProps {
    delay?: number;
    loader?: ReactNode;
    loading?: boolean;
    error?: boolean;
    errorComponent?: ReactNode;
    children: ReactNode;
    errorDescription?: string;
}

export const DelayedLoader = ({
    children,
    delay = 300,
    loader = <Spinner />,
    loading,
    error,
    errorDescription,
    errorComponent,
}: DelayedLoaderProps) => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoader(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay]);

    if (error) {
        return errorComponent || <Error details={errorDescription} />;
    }

    if (!loading) return children;

    if (showLoader) {
        return loader;
    }

    return null;
};
