import { Outlet } from "react-router";
import { MokkuSidebarProvider } from "./SidebarProvider";
import { TopBar } from "./TopBar/TopBar";
import { ProjectSidebar } from "./ProjectSidebar";
import { OrgSidebar } from "./OrgSidebar";
import { useOrganizationListener } from "../Organization";
import { useProjectListener } from "../Project";

interface AppWrapperProps {
    type?: "PROJECT" | "ORG";
}

export const AppWrapper = ({ type }: AppWrapperProps) => {
    useOrganizationListener();
    useProjectListener();

    return (
        <MokkuSidebarProvider className="w-full h-full p-0 overflow-auto bg-cover">
            <main className="w-full h-full overflow-hidden flex flex-col grow">
                <TopBar />
                <div className="flex grow overflow-scroll">
                    <div className="relative">
                        {type === "PROJECT" && <ProjectSidebar />}
                        {type === "ORG" && <OrgSidebar />}
                    </div>
                    <div className="h-full w-full overflow-auto">
                        <div className="max-w-7xl px-2 mx-auto h-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </MokkuSidebarProvider>
    );
};
