import { SidebarProvider as OriginalSidebarProvider } from "@/dashboard/components/ui/sidebar";
import { chromeStorage } from "@/dashboard/service/chromeStorage";
import { type ReactNode, useEffect, useState } from "react";

export const MokkuSidebarProvider = ({
    children,
    className,
    id,
}: {
    children: ReactNode;
    className?: string;
    id?: string;
}) => {
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        chromeStorage.get("sideBarOpen").then((v) => {
            setLoading(false);
            setDefaultOpen(v === undefined ? true : v);
        });
    }, []);

    if (loading) {
        return null;
    }

    return (
        <OriginalSidebarProvider
            id={id}
            defaultOpen={defaultOpen}
            className={className}
        >
            {children}
        </OriginalSidebarProvider>
    );
};
