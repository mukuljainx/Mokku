import { OnboardingMokku } from "@/dashboard/pages/Onboarding/OnboardingMokku";
import { useAppNavigate } from "@/dashboard/hooks/use-app-navigate";

export const Home = () => {
    const { goToMocksList } = useAppNavigate();

    const handleGetStarted = () => {
        // Navigate to organizations to start the user journey
        window.location.href = "/projects";
    };

    const handleCreateMock = () => {
        // Navigate to mocks list (requires organization/project context)
        goToMocksList();
    };

    return (
        <main className="w-full h-full overflow-hidden flex flex-col">
            <div className="overflow-hidden h-full w-full">
                <OnboardingMokku
                    onGetStarted={handleGetStarted}
                    onCreateMock={handleCreateMock}
                    showInteractive={true}
                />
            </div>
        </main>
    );
};
