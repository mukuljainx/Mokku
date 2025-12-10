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
import { Heading2, Printer, Settings, Shuffle } from "lucide-react";
import { useEffect, useMemo } from "react";
import { chromeStorage } from "@/dashboard/service/chromeStorage";
import { Link, useMatch } from "react-router";
import { MokkuSidebarFooter } from "./MokkuSidebarFooter";
import { useProjectStore } from "../Project";
import { useOrganizationStore } from "../Organization";
import type { IOrganization, IProject } from "@/dashboard/types";
import { ProjectSidebarLoader } from "./ProjectSidebarLoader";
import { cn } from "@/dashboard/lib";
import { getProjectRoute } from "@/dashboard/lib/routes";

const getItems = (
    organization: IOrganization | null,
    project: IProject | null
) => {
    if (organization == null || project == null) {
        return null;
    }
    return [
        {
            title: "Mocks",
            url: `${getProjectRoute(organization.slug, project.slug)}/mocks`,
            icon: Shuffle,
            matchKey: "MOCKS",
            isVisible: undefined,
        },
        {
            title: "Headers",
            url: `${getProjectRoute(organization.slug, project.slug)}/headers`,
            icon: Heading2,
            matchKey: "HEADERS",
            isVisible: undefined,
        },
        {
            title: "Export/Import",
            url: `${getProjectRoute(organization.slug, project.slug)}/exports`,
            icon: Printer,
            matchKey: "EXPORTS",
            isVisible: undefined,
        },
        {
            title: "Settings",
            url: `${getProjectRoute(organization.slug, project.slug)}/settings`,
            icon: Settings,
            matchKey: "SETTINGS",
            isVisible: undefined,
        },
        // {
        //     title: "Docs",
        //     url: `${getProjectRoute(organization.slug, project.slug)}/docs`,
        //     icon: BookText,
        //     matchKey: "DOCS",
        //     isVisible: undefined,
        // },
        // {
        //     title: "Migrations",
        //     url: `${getProjectRoute(organization.slug, project.slug)}/migrations`,
        //     icon: ClipboardCopy,
        //     matchKey: "MIGRATIONS",
        //     isVisible: ({ projectId }: { projectId: string }) =>
        //         projectId === "local",
        // },
    ] as const;
};

export function ProjectSidebar() {
    const { open } = useSidebar();

    useEffect(() => {
        chromeStorage.set("sideBarOpen", open);
    }, [open]);

    const { project } = useProjectStore();
    const { organization } = useOrganizationStore();

    const isActive = {
        MOCKS: !!useMatch(
            "organizations/:organizationSlug/projects/:projectSlug/mocks/*"
        ),
        HEADERS: !!useMatch(
            "organizations/:organizationSlug/projects/:projectSlug/headers/*"
        ),
        DOCS: !!useMatch(
            "organizations/:organizationSlug/projects/:projectSlug/docs/*"
        ),
        EXPORTS: !!useMatch(
            "organizations/:organizationSlug/projects/:projectSlug/exports/*"
        ),
        SETTINGS: !!useMatch(
            "organizations/:organizationSlug/projects/:projectSlug/settings/*"
        ),
        // MIGRATIONS: !!useMatch("/projects/local/migrations/*"),
    };

    const items = useMemo(
        () => getItems(organization, project),
        [organization, project]
    );

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
