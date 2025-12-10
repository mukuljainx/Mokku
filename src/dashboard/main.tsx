import * as Sentry from "@sentry/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import App from "./App";
import { TooltipProvider } from "./components/ui/tooltip";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/dashboard/components/ui/sonner";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

Sentry.init({
    dsn: "https://af4e3da0fb24c2120f0f819b18f49644@o4510482950586368.ingest.de.sentry.io/4510482952355920",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: [Sentry.replayIntegration()],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0,
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 1, // 1 hours
        },
    },
});

const asyncStoragePersister = createAsyncStoragePersister({
    storage: localStorage,
});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <BrowserRouter>
                <TooltipProvider>
                    {/* <QueryClientProvider client={queryClient}> */}
                    <PersistQueryClientProvider
                        client={queryClient}
                        persistOptions={{ persister: asyncStoragePersister }}
                    >
                        <App />
                        <Toaster richColors />
                        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                    </PersistQueryClientProvider>
                </TooltipProvider>
            </BrowserRouter>
        </StrictMode>
    );
}
