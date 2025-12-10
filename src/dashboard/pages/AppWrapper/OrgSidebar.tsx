import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/dashboard/components/ui/sidebar";
import { FolderKanban } from "lucide-react";
import { useEffect, useMemo } from "react";
import { chromeStorage } from "@/dashboard/service/chromeStorage";
import { Link, useMatch } from "react-router";
import { ShowIf } from "@/dashboard/components/ui/show-if";
import { MokkuSidebarFooter } from "./MokkuSidebarFooter";
import { cn } from "@/dashboard/lib";
import type { IOrganization } from "@/dashboard/types";
import { useOrganizationStore } from "../Organization";
import { ProjectSidebarLoader } from "./ProjectSidebarLoader";
import { getOrgRoute } from "@/dashboard/lib/routes";

const getItems = (organization: IOrganization | null) => {
    if (organization == null) {
        return null;
    }

    return [
        {
            title: "Projects",
            url: `${getOrgRoute(organization.slug)}/projects`,
            icon: FolderKanban,
            matchKey: "PROJECTS",
        },
        // {
        //     title: "Users",
        //     url: "/",
        //     icon: Home,
        // },
        // {
        //     title: "Setting",
        //     url: "/",
        //     icon: Home,
        // },
    ] as const;
};

export function OrgSidebar() {
    const { open } = useSidebar();

    useEffect(() => {
        chromeStorage.set("sideBarOpen", open);
    }, [open]);

    const isActive = {
        PROJECTS: !!useMatch("organizations/:organizationSlug/projects"),
    };

    const { organization } = useOrganizationStore();

    const items = useMemo(() => getItems(organization), [organization]);

    return (
        <Sidebar className="" collapsible="icon">
            <SidebarContent className="flex flex-col justify-between">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {!items && <ProjectSidebarLoader />}
                            {items &&
                                items.map((item) => {
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            {!!item.url && (
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={
                                                        isActive[item.matchKey]
                                                    }
                                                    className={cn(
                                                        "hover:bg-primary/20!",
                                                        isActive[item.matchKey]
                                                            ? "bg-primary/10! text-primary"
                                                            : ""
                                                    )}
                                                >
                                                    <Link to={item.url}>
                                                        <item.icon />
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            )}
                                        </SidebarMenuItem>
                                    );
                                })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="overflow-x-hidden">
                <MokkuSidebarFooter />
            </SidebarFooter>
        </Sidebar>
    );
}
