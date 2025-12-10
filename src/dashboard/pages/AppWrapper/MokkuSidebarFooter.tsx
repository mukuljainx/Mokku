import { SidebarTrigger } from "@/dashboard/components/ui/sidebar";
import { SimpleTooltip } from "@/dashboard/components/ui/Simple-tooltip";

export const MokkuSidebarFooter = () => {
    return (
        <div className="w-full">
            <SimpleTooltip content="Toggle Sidebar">
                <SidebarTrigger className="size-4 cursor-pointer" />
            </SimpleTooltip>
        </div>
    );
};
