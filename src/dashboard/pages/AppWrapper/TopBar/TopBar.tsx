import { SidebarTrigger, useSidebar } from "@/dashboard/components/ui/sidebar";
import { TopBarBreadCrumb } from "./TopBar.BreadCrumb";
// import { TopBarThemeToggle } from "./Topbar.Theme";
// import { chromeService } from "@/dashboard/service/chrome";
import { SimpleTooltip } from "@/dashboard/components/ui/Simple-tooltip";
import { Logo } from "@/dashboard/components/ui/logo";
import { Button } from "@/dashboard/components/ui/button";
import { ReportAnIssue } from "@/dashboard/blocks/ReportAnIssue";
import { useEffect, useState } from "react";
// import { webAppServices } from "@/dashboard/service/webAppServices";

const isDataBannerSeen = localStorage.getItem("seen-data-storage-banner");

export const TopBar = () => {
    // const appAvailable = webAppServices.useIsAppAvailable();

    const { isMobile } = useSidebar();

    const [seen, setIsSeen] = useState(false);
    useEffect(() => {
        setIsSeen(!!isDataBannerSeen);
    }, []);

    return (
        <div>
            <div className="border-b bg-card backdrop-blur-[2px] flex items-center py-2 justify-between px-2 shrink-0">
                <div className="flex gap-2 items-center">
                    {isMobile && (
                        <SimpleTooltip content="Toggle Sidebar">
                            <SidebarTrigger className="size-4" />
                        </SimpleTooltip>
                    )}
                    {!isMobile && (
                        <>
                            <Logo iconOnly small /> /
                        </>
                    )}

                    <TopBarBreadCrumb />
                </div>
                <div className="flex gap-2 items-center">
                    {/* <TopBarThemeToggle className="size-8" /> */}
                    {/* <ShowIf iff={!chromeService.isApiAvailable}>
                    <Button
                        size="tiny"
                        variant="primary-outline-transparent"
                        onClick={() =>
                            webAppServices.openApp({ search: "?email=hello" })
                        }
                    >
                        {appAvailable ? "Open App" : "Install App"} ⚡️
                    </Button>
                </ShowIf>
                <ShowIf iff={chromeService.isApiAvailable}>
                    <Button
                        size="tiny"
                        variant="outline"
                        onClick={chromeService.openSidePanel}
                    >
                        Open Side Panel <PanelRightOpen />
                    </Button>
                </ShowIf> */}
                    <Button size="tiny" variant="outline">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png?20240107144800"
                            className="h-4 mr-2"
                        />
                        <a
                            target="_blank"
                            href="https://www.youtube.com/watch?v=NDJ-UifByiE"
                        >
                            Video Walkthrough
                        </a>
                    </Button>
                    <ReportAnIssue />
                </div>
            </div>
            {!seen && (
                <div className="bg-blue-500 px-8 py-1 border-b text-white justify-between flex items-center">
                    <span>
                        All you data in stored in chrome only, we do not collect
                        any data. Data is stored using indexedDB. For more
                        checkout{" "}
                        <a
                            href="https://github.com/mukuljainx/Mokku/tree/master/src/services/db"
                            target="_blank"
                        >
                            Database Code
                        </a>
                    </span>
                    <Button
                        onClick={() => {
                            localStorage.setItem(
                                "seen-data-storage-banner",
                                "1"
                            );
                            setIsSeen(true);
                        }}
                        variant="link"
                    >
                        Close
                    </Button>
                </div>
            )}
        </div>
    );
};
