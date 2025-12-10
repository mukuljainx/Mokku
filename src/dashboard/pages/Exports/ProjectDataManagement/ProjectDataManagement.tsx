import { Separator } from "@/dashboard/components/ui/separator";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/dashboard/components/ui/tabs";
import { ProjectExports } from "./ProjectExports";
import { ProjectImport } from "./ProjectImport";

export const ProjectDataManagement = () => {
    return (
        <div className="flex gap-2 flex-col h-full overflow-hidden">
            <h2 className="px-4 pt-2 text-lg font-medium">
                Export Project Data
            </h2>
            <Separator />
            <Tabs className="w-full" defaultValue="import">
                <TabsList className="w-full">
                    <TabsTrigger value="import">Import</TabsTrigger>
                    <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>
                <TabsContent value="export">
                    <ProjectExports />
                </TabsContent>
                <TabsContent value="import">
                    <ProjectImport />
                </TabsContent>
            </Tabs>
        </div>
    );
};
