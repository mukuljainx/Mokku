import { Button } from "@/dashboard/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Input } from "@/dashboard/components/ui/input";
import type { IHeader } from "@/dashboard/types";
import { LabelRequired } from "@/dashboard/components/ui/label-required";
import {
    Controller,
    useFieldArray,
    useForm,
    type Control,
    type SubmitHandler,
} from "react-hook-form";
import { Switch } from "@/dashboard/components/ui/switch";
import { useState } from "react";
import { Spinner } from "@/dashboard/components/ui/spinner";
import { Textarea } from "@/dashboard/components/ui/textarea";
import { getFormError } from "@/dashboard/lib/get-form-error";
import { HeaderFormDomains } from "./HeaderForm.Domains";
import { HeaderFormRequestFilter } from "./HeaderForm.RequestFilter";
import { HeaderFormResourceType } from "./HeaderForm.ResourceType";
import { HeaderFormMethod } from "./HeaderForm.Methods";
import { HeaderFormHeaders } from "./HeaderForm.Headers";
import { cn } from "@/dashboard/lib";

type Inputs = IHeader;

export function HeaderForm({
    header,
    onSubmit: onSubmitProp,
    isLoading,
    error,
    onDeleteClick,
}: {
    header?: Partial<IHeader>;
    onSubmit: (header: Inputs) => void;
    isLoading?: boolean;
    error?: string;
    onDeleteClick?: () => void;
}) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        // setError,
        // clearErrors,
    } = useForm<Inputs>({
        defaultValues: {
            name: header?.name || "",
            active: header?.active ?? true,
            description: header?.description || "",
            action: header?.action || {
                requestHeaders: [],
                type: "modifyHeaders",
            },
            // urlFilter, resourceType, initiatorType, urlRegex are important
            condition: header?.condition || {
                ...header?.condition,
                initiatorDomains: header?.condition?.initiatorDomains || [],
            },
        },
    });

    const [requestMatchingExpanded, setRequestMatchingExpanded] =
        useState(false);

    const headersFiledArray = useFieldArray({
        control,
        name: "action.requestHeaders",
    });

    const initiatorDomainFieldArray = useFieldArray({
        control: control as unknown as Control<
            { condition: { initiatorDomains: string[] } },
            unknown,
            { condition: { initiatorDomains: string[] } }
        >,
        // @ts-expect-error: react-hook-form typing issue
        name: "condition.initiatorDomains",
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // if (urlInputError.current) {
        //     return;
        // }

        // Filter out empty headers
        const filteredHeaders = data.action?.requestHeaders?.filter(
            (h) => h.header.trim() !== "" || h.value?.trim() !== ""
        );

        onSubmitProp({
            ...data,
            action: {
                ...data.action,
                requestHeaders: filteredHeaders,
            },
        });
    };

    const formError = getFormError({
        apiError: error,
        formError: errors,
        // inputError: urlInputError.current,
    });
    return (
        <div className="w-full h-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 m-auto flex flex-col h-full"
            >
                <div className="overflow-scroll w-full grow flex flex-col gap-6 pt-6 px-2">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Basic Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-2 shrink-0">
                                        <LabelRequired
                                            required
                                            htmlFor="active"
                                        >
                                            Active
                                        </LabelRequired>
                                        <Controller
                                            control={control}
                                            name="active"
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <Switch
                                                    id="active"
                                                    checked={value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => onChange(checked)}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 grow-1">
                                        <LabelRequired required htmlFor="name">
                                            Name
                                        </LabelRequired>
                                        <Input
                                            id="name"
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                    {/* <div className="flex flex-col gap-2 grow-1">
                                            <LabelRequired htmlFor="projectId">
                                                Project
                                            </LabelRequired>
                                            <Select
                                                {...register("projectId", {})}
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
                                                {...register("description", {})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="w-full gap-0">
                        <CardHeader>
                            <CardTitle className="flex gap-2 items-center">
                                Request Matching
                                <Button
                                    className="h-4"
                                    variant="link-secondary"
                                    type="button"
                                    size="tiny"
                                    onClick={() =>
                                        setRequestMatchingExpanded((x) => !x)
                                    }
                                >
                                    {requestMatchingExpanded
                                        ? "Hide"
                                        : "Expand"}
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent
                            style={{
                                // transition: "grid-template-rows 0.5s ease",
                                // display: "grid",
                                gridTemplateRows: requestMatchingExpanded
                                    ? "1fr"
                                    : "0fr",
                            }}
                            className="transition-[grid-template-rows] duration-300 ease-in-out grid"
                        >
                            <div
                                className={cn(
                                    "flex flex-col gap-6 overflow-hidden mt-0 transition-[margin]",
                                    requestMatchingExpanded && "mt-6"
                                )}
                            >
                                <HeaderFormDomains
                                    {...initiatorDomainFieldArray}
                                    register={register}
                                />

                                <HeaderFormRequestFilter
                                    register={register}
                                    control={control}
                                />

                                <HeaderFormMethod
                                    control={control}
                                    register={register}
                                />

                                <HeaderFormResourceType
                                    control={control}
                                    register={register}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Headers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <HeaderFormHeaders
                                    {...headersFiledArray}
                                    register={register}
                                    control={control}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full flex justify-center bg-card px-6 py-4 border-t-1 shrink-0">
                    <div className="max-w-7xl flex justify-end w-full items-center gap-4">
                        {formError && (
                            <span className="text-red-600 text-sm">
                                {formError}
                            </span>
                        )}
                        {header?.localId && onDeleteClick && (
                            <Button
                                variant="destructive-outline-transparent"
                                type="button"
                                onClick={onDeleteClick}
                            >
                                Delete header
                            </Button>
                        )}
                        <Button disabled={isLoading} type="submit">
                            {isLoading && <Spinner />}
                            {header ? "Update Header" : "Create Header"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
