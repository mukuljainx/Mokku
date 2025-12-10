// import { useUserStore } from "./stores/useUserStore";
// import { supabase } from "./service/supabase";
import { Route, Routes, Navigate } from "react-router";
import { AuthRouter } from "./pages/Auth/auth-router";
// import { AuthCommon } from "./pages/Auth";
import { AppWrapper } from "./pages/AppWrapper";
import {
    Mocks,
    MockEdit,
    MockCreate,
    NavigateToMockDetails,
} from "./pages/Mocks";
// import { sendMessageToMokkuSW } from "./service/mokkuMessenger";
import { CreateOrganization, OrganizationList } from "./pages/Organization";
import {
    CreateProject,
    ProjectList,
    ProjectDetails,
    ProjectSettings,
} from "./pages/Project";
import { HeaderCreate, HeaderEdit, Headers } from "./pages/Headers";
import { OnboardingRoute } from "./pages/Onboarding";
import { ProjectDataManagement } from "./pages/Exports";
import { useEffect, useState } from "react";
// import { Spinner } from "./components/ui/spinner";
import type { IMessage } from "./types";
// import { Button } from "./components/ui/button";
import { UrlTester } from "./pages/Help";
import { useAppStore } from "./service/useAppStore";
import { Button } from "./components/ui/button";

// const orgBaseRoute = "/organizations/:organizationSlug";
const orgBaseRoute = "";

function App() {
    const { setIsConnected, isConnected } = useAppStore();
    const [showExtensionNotFound, setShowExtensionNotFound] = useState(false);

    useEffect(() => {
        const func = (event: WindowEventMap["message"]) => {
            // We only accept messages from ourselves

            if (event.source !== window) {
                return;
            }

            const data: IMessage = event.data;
            if (
                data.extensionName !== "MOKKU" ||
                data._mokku?.source === "APP"
            ) {
                return;
            }

            if (data.type === "APP_SCRIPT_READY") {
                setIsConnected(true);
                window.removeEventListener("message", func);
            }
        };
        window.addEventListener("message", func);
        return () => window.removeEventListener("message", func);
    }, [setIsConnected]);

    useEffect(() => {
        const interval = setTimeout(() => {
            if (!isConnected) {
                setShowExtensionNotFound(true);
            }
        }, 12 * 1000);

        return () => clearTimeout(interval);
    }, [isConnected]);

    if (showExtensionNotFound) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="flex flex-col gap-4 items-center">
                    <h3 className="text-lg">Mokku Extension Not Found</h3>
                    <p className="text-sm text-gray-500 max-w-xs text-center">
                        Unable to connect to Mokku extension. Please make sure
                        the Mokku browser extension is installed and enabled.
                    </p>
                    <Button>
                        <a
                            href="https://chromewebstore.google.com/detail/mokku/llflfcikklhgamfmnjkgpdadpmdplmji?hl=en"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Get Mokku Extension
                        </a>
                    </Button>
                </div>
            </div>
        );
    }

    // if (!isExtensionLoaded) {
    //     return (
    //         <div className="flex items-center justify-center h-full w-full">
    //             <div className="flex flex-col gap-4 items-center">
    //                 <Spinner className="size-12" />
    //                 <h3 className="text-lg">Connecting with Mokku extension</h3>
    //                 {waitTime <= 0 ? (
    //                     <p className="text-sm text-gray-500 max-w-xs text-center">
    //                         Unable to connect to Mokku extension. Please make
    //                         sure the Mokku browser extension is installed and
    //                         enabled.
    //                     </p>
    //                 ) : (
    //                     <p className="text-sm text-gray-500">
    //                         Waiting for extension to respond... {waitTime}s
    //                     </p>
    //                 )}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <Routes>
            {/* <Route path="/sign-in" element={<AuthCommon />} /> */}
            <Route path="/welcome" element={<OnboardingRoute />} />
            <Route element={<AppWrapper />}>
                <Route path="/help/url-tester" element={<UrlTester />} />
                <Route
                    path="/mock-details"
                    element={<NavigateToMockDetails />}
                />
                <Route
                    path="/header-details"
                    element={<NavigateToMockDetails />}
                />
                <Route path="/organizations" element={<OrganizationList />} />
                <Route
                    path="/organizations/create"
                    element={<CreateOrganization />}
                />
                <Route
                    path={`${orgBaseRoute}/projects/create`}
                    element={<CreateProject />}
                />
            </Route>
            <Route element={<AppWrapper type="ORG" />}>
                <Route
                    path={`${orgBaseRoute}/projects`}
                    element={<ProjectList />}
                />
            </Route>

            <Route element={<AppWrapper type="PROJECT" />}>
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug`}
                    element={<ProjectDetails />}
                />
                {/* <Route path="/projects/:projectId" element={<Project />} /> */}
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/mocks`}
                    element={<Mocks />}
                />
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/settings`}
                    element={<ProjectSettings />}
                />
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/exports`}
                    element={<ProjectDataManagement />}
                />

                {/* <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/migrations`}
                    element={<MocksMigration migrationMocks={migrationMocks} />}
                /> */}
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/mocks/create-mock`}
                    element={<MockCreate />}
                />
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/mocks/:mockId`}
                    element={<MockEdit />}
                />
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/headers`}
                    element={<Headers />}
                />
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/headers/create-header`}
                    element={<HeaderCreate />}
                />
                <Route
                    path={`${orgBaseRoute}/projects/:projectSlug/headers/:headerId`}
                    element={<HeaderEdit />}
                />
                <Route element={<AuthRouter />}>{/* Protected routes */}</Route>
            </Route>

            <Route element={<AuthRouter />}></Route>
            <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>
    );
}

export default App;

/**
 *
 * /orgs
 * /org/slug/projects [sidebar] [project listing]
 * /org/slug/project/slug [main app]
 *
 * /projects no org is selected, generally user will start from so do we
 *
 *
 */
