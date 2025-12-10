import { Button } from "@/dashboard/components/ui/button";

export const ReportAnIssue = () => {
    return (
        <Button
            // className="fixed bottom-4 right-4 z-50"
            size="tiny"
            variant="outline"
        >
            <a
                href="https://github.com/mukuljainx/Mokku/issues"
                target="_blank"
                rel="noreferrer"
            >
                Report an Issue
            </a>
        </Button>
    );
};
