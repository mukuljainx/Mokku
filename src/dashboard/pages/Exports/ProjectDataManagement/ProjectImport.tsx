import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/dashboard/components/ui/card";
import { Button } from "@/dashboard/components/ui/button";
import { useProjectStore } from "@/dashboard/pages/Project";
import { toast } from "sonner";
import { Input } from "@/dashboard/components/ui/input";
import { useProjectBulkDataMutation } from "@/dashboard/pages/Project/queries/useProjectBulkMutation";
import { useEffect } from "react";
import { Error } from "@/dashboard/components/ui/Error";
import { Separator } from "@/dashboard/components/ui/separator";

export const ProjectImport = () => {
    const { project } = useProjectStore();

    const { mutate, isSuccess, error } = useProjectBulkDataMutation();

    const handleSubmit = () => {
        const input = document.getElementById("file-input") as HTMLInputElement;
        const file = input?.files?.[0];

        if (!file || !project?.localId) {
            toast.error("Please select a valid file and project");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const jsonData = JSON.parse(content);
                mutate({
                    localId: project.localId,
                    mocks: jsonData.mocks,
                    headers: jsonData.headers,
                });
            } catch (err) {
                toast.error("Failed to read or parse the file");
            }
        };
        reader.readAsText(file);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Project data imported successfully!");
        }

        if (error) {
            toast.error("Failed to import project data.");
        }
    }, [isSuccess, error]);

    return (
        <div className="flex gap-2 flex-col grow overflow-hidden ">
            <Card className="">
                <CardHeader>
                    <CardTitle>Choose the file you want to import</CardTitle>
                    <CardDescription>
                        All the entities will be imported into the current
                        project as new
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div>
                            <Input
                                id="file-input"
                                className="cursor-pointer"
                                type="file"
                                accept="application/json,.json"
                                onChange={(e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (!file) return;
                                    const isJson =
                                        file.type === "application/json" ||
                                        file.name
                                            .toLowerCase()
                                            .endsWith(".json");
                                    if (!isJson) {
                                        toast.error(
                                            "Please upload a .json file"
                                        );
                                        e.currentTarget.value = "";
                                        return;
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <Button className="cursor-pointer" type="submit">
                                Import
                            </Button>
                        </div>
                    </form>
                    {error && (
                        <>
                            <Separator className="my-2" />
                            <Error
                                details={
                                    <>
                                        <pre className="text-xs bg-muted p-3 rounded border overflow-auto max-h-60">
                                            {error.message}
                                        </pre>
                                    </>
                                }
                            ></Error>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
