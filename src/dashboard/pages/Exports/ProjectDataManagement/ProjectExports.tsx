import { Checkbox } from "@/dashboard/components/ui/checkbox";
import { Label } from "@/dashboard/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/dashboard/components/ui/card";
import { Button } from "@/dashboard/components/ui/button";
import { useProjectDataQuery } from "@/dashboard/pages/Project/queries/useProjectAllDataQuery";
import { useProjectStore } from "@/dashboard/pages/Project";
import { useEffect } from "react";
import { toast } from "sonner";

type Inputs = {
    headers: boolean;
    mocks: boolean;
};

export const ProjectExports = () => {
    const { handleSubmit, control } = useForm<Inputs>({
        defaultValues: {
            headers: true,
            mocks: true,
        },
    });

    const { project } = useProjectStore();

    const { mutate, data, isSuccess, error } = useProjectDataQuery();

    const onSubmit = (data: Inputs) => {
        // Handle export logic here
        if ((!data.headers && !data.mocks) || !project?.localId) {
            return;
        }
        mutate({
            localId: project?.localId, // Replace with actual project localId
            headers: data.headers,
            mocks: data.mocks,
        });
    };

    useEffect(() => {
        if (isSuccess && data) {
            toast.success("Project data exported successfully!");

            // create a blob and trigger download
            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `project-${project?.name || "export"}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }

        if (error) {
            toast.error("Failed to export project data.");
        }
    }, [isSuccess, error, data, project?.name]);

    return (
        <div className="flex gap-2 flex-col grow overflow-hidden ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="">
                    <CardHeader>
                        <CardTitle>Select data you want to export</CardTitle>
                        <CardDescription>
                            All the entities will be exported in JSON format
                            file.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <div className="flex gap-8">
                            <div className="flex items-center gap-3">
                                <Controller
                                    control={control}
                                    name="mocks"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Checkbox
                                            checked={value}
                                            onCheckedChange={(checked) =>
                                                onChange(checked)
                                            }
                                            id="mocks"
                                        />
                                    )}
                                />
                                <Label htmlFor="mocks">Mocks</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Controller
                                    control={control}
                                    name="headers"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Checkbox
                                            checked={value}
                                            onCheckedChange={(checked) =>
                                                onChange(checked)
                                            }
                                            id="headers"
                                        />
                                    )}
                                />
                                <Label htmlFor="headers">Headers</Label>
                            </div>
                        </div>
                        <div>
                            <Button type="submit">Export</Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};
