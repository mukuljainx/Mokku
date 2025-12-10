import { Button } from "@/dashboard/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Input } from "@/dashboard/components/ui/input";
import { LabelRequired } from "@/dashboard/components/ui/label-required";
import { Switch } from "@/dashboard/components/ui/switch";
import { Textarea } from "@/dashboard/components/ui/textarea";
import { getFormError } from "@/dashboard/lib/get-form-error";
import type { IProject } from "@/dashboard/types";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

export const ProjectForm = ({
    project,
    onSubmit: onSubmitProp,
    onDeleteClick,
    error,
    loading,
}: {
    project?: Partial<IProject>;
    onSubmit: (project: IProject) => void;
    onDeleteClick?: () => void;
    loading?: boolean;
    error?: string;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        getValues,
    } = useForm<IProject>({
        defaultValues: {
            isLocal: project?.isLocal ?? true,
            ...project,
        },
    });

    const onSubmit: SubmitHandler<IProject> = (data) => {
        onSubmitProp(data);
    };

    const formError = getFormError({
        apiError: error,
        formError: errors,
        inputError: false,
    });

    return (
        <div className="h-full">
            <form
                name="project-form"
                id="project-form"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col justify-between items-center h-full"
            >
                <div className="overflow-scroll w-full">
                    <div className="flex flex-col gap-6 max-w-7xl w-full px-2 py-6 m-auto">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                                <CardDescription>
                                    Enter the project details below.
                                </CardDescription>
                                <CardAction>
                                    <div>
                                        <LabelRequired
                                            htmlFor="isLocal"
                                            info="Enable to sync this project with Mokku Cloud, coming soon!"
                                        >
                                            Cloud Sync
                                        </LabelRequired>
                                        <Controller
                                            control={control}
                                            name="isLocal"
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <Switch
                                                    disabled
                                                    className="mt-1"
                                                    id="isLocal"
                                                    checked={!value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => onChange(!checked)}
                                                />
                                            )}
                                        />
                                    </div>
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                                        <div className="flex flex-col gap-2 grow-1">
                                            <LabelRequired
                                                required
                                                htmlFor="name"
                                            >
                                                Name
                                            </LabelRequired>
                                            <Input
                                                id="name"
                                                {...register("name", {
                                                    required:
                                                        "Name is required",
                                                })}
                                                onBlur={(event) => {
                                                    if (!getValues("slug")) {
                                                        const slug =
                                                            event.target.value
                                                                .toLowerCase()
                                                                .replace(
                                                                    /[^a-z0-9]+/g,
                                                                    "-"
                                                                )
                                                                .replace(
                                                                    /^-|-$|/g,
                                                                    ""
                                                                );
                                                        setValue("slug", slug);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 grow-1">
                                            <LabelRequired
                                                required
                                                htmlFor="slug"
                                            >
                                                Slug
                                            </LabelRequired>
                                            <Input
                                                id="slug"
                                                {...register("slug", {
                                                    required:
                                                        "Slug is required",
                                                })}
                                            />
                                        </div>
                                        {/* <div>
                                            <LabelRequired
                                                htmlFor="isLocal"
                                                info="Enable to sync this project with Mokku Cloud"
                                            >
                                                Cloud Sync
                                            </LabelRequired>
                                            <Controller
                                                control={control}
                                                name="isLocal"
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <Switch
                                                        className="mt-1"
                                                        id="isLocal"
                                                        checked={!value}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => onChange(!checked)}
                                                    />
                                                )}
                                            />
                                        </div> */}
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex gap-4">
                                            <div className="flex flex-col gap-2 flex-grow">
                                                <LabelRequired htmlFor="description">
                                                    Description
                                                </LabelRequired>
                                                <Textarea
                                                    id="description"
                                                    {...register(
                                                        "description",
                                                        {}
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="max-w-7xl flex justify-end w-full items-center gap-4">
                                    {formError && (
                                        <span className="text-red-500">
                                            {formError}
                                        </span>
                                    )}
                                    {project?.localId && (
                                        <Button
                                            loading={loading}
                                            type="button"
                                            onClick={onDeleteClick}
                                            variant="destructive-outline-transparent"
                                        >
                                            Delete Project
                                        </Button>
                                    )}
                                    <Button loading={loading} type="submit">
                                        {project?.localId
                                            ? "Update Project"
                                            : "Create project"}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
};
