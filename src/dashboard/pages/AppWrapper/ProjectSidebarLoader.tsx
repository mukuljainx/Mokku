import { Skeleton } from "@/dashboard/components/ui/skeleton";

export const ProjectSidebarLoader = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-5 bg-gray-300" />
            <Skeleton className="h-5 bg-gray-300" />
            <Skeleton className="h-5 bg-gray-300" />
        </div>
    );
};
