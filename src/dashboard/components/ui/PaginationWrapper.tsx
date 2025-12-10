import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationWrapperProps {
    hasPrevious: boolean;
    hasNext: boolean;
    onNextClick: () => void;
    onPreviousClick: () => void;
}

export function PaginationWrapper({
    hasNext,
    hasPrevious,
    onNextClick,
    onPreviousClick,
}: PaginationWrapperProps) {
    return (
        <div className="flex items-center gap-2 justify-end">
            <Button
                variant="outline"
                size="sm"
                onClick={onPreviousClick}
                disabled={!hasPrevious}
            >
                <ChevronLeft />
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={onNextClick}
                disabled={!hasNext}
            >
                Next
                <ChevronRight />
            </Button>
        </div>
    );
}
