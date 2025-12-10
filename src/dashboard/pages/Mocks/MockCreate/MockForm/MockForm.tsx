import { Button } from "@/dashboard/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Input } from "@/dashboard/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/dashboard/components/ui/select";
import { Textarea } from "@/dashboard/components/ui/textarea";
import type { IMock } from "@/dashboard/types";
import { LabelRequired } from "@/dashboard/components/ui/label-required";
import {
    Controller,
    useFieldArray,
    useForm,
    type SubmitHandler,
} from "react-hook-form";
import { getMethodOptions } from "./constants";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/dashboard/components/ui/radio-group";
import { JsonEditor, FunctionEditor } from "./Editors";
import { useDisallowedApisLinter } from "./Editors/useDisallowedApisLinter";
import { FunctionEditorDisabledTooltip } from "./Editors/FunctionEditorDisabledTooltip";
import { useEditorError } from "./Editors/useEditorError";
import { Plus, Trash } from "lucide-react";
import { UrlInput } from "@/dashboard/components/ui/url-input";
import { useCallback, useEffect, useRef } from "react";
import { Switch } from "@/dashboard/components/ui/switch";
import { Spinner } from "@/dashboard/components/ui/spinner";
import { getFormError } from "@/dashboard/lib/get-form-error";

type Inputs = Partial<IMock>;

export function MockForm({
    mock,
    onSubmit: onSubmitProp,
    isLoading,
    error,
    onDeleteClick,
}: {
    mock?: Inputs;
    onSubmit: (mock: Inputs) => void;
    isLoading: boolean;
    error?: string;
    onDeleteClick?: () => void;
}) {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<Inputs>({
        defaultValues: {
            responseType: "STATIC",
            method: "GET",
            status: 200,
            active: true,
            dynamic: false,
            delay: 0,
            headers: [],
            requestType: "REST",
            operationName: "",
            ...mock,
        },
    });

    const { fields, prepend, remove } = useFieldArray({
        control,
        name: "headers",
    });

    const hasError = Object.keys(errors).length > 0;
    const { doesEditorHasError, setUri } = useEditorError();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (urlInputError.current) {
            return;
        }

        const responseType = data.responseType || "STATIC";

        const editorError = doesEditorHasError(responseType);
        if (editorError) {
            setError("responseType", {
                message: "Please check and fix editors errors!",
            });
            return;
        } else {
            clearErrors("responseType");
        }

        if (hasError || error) {
            return;
        }

        if (data.requestType === "GRAPHQL") {
            data.method = "POST";
        }

        data.url = data.url?.trim();
        data.url = data.url?.replace(/\/$/, "");

        onSubmitProp(data);
    };

    const responseType = watch("responseType");
    const requestType = watch("requestType");

    useEffect(() => {
        if (requestType === "GRAPHQL") {
            register("operationName", { required: true });
        } else {
            register("operationName", { required: false });
        }
    }, [requestType, register]);

    const urlInputError = useRef<boolean>(false);
    // Initialize the custom linter
    const disallowedApisLinter = useDisallowedApisLinter();
    const setUrlError = useCallback(
        (error: string) => {
            urlInputError.current = !!error;
            setError("url", {
                message: error,
            });
        },
        [setError]
    );

    const clearUrlError = useCallback(() => {
        urlInputError.current = false;
        clearErrors("url");
    }, [clearErrors]);

    const formError = getFormError({
        apiError: error,
        formError: errors,
        inputError: false,
    });

    return (
        <div className="w-full h-full">
            <form
                name="mock-form"
                id="mock-form"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col justify-between items-center h-full"
            >
                <div className="overflow-scroll w-full">
                    <div className="flex flex-col gap-6 max-w-7xl w-full px-2 py-6 m-auto">
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
                                            <LabelRequired
                                                required
                                                htmlFor="name"
                                            >
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
                        </Card>

                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Request Matching</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2 flex-grow">
                                            <LabelRequired>Type</LabelRequired>
                                            <Controller
                                                name="requestType"
                                                control={control}
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <RadioGroup
                                                        value={value || "REST"}
                                                        onValueChange={(v) => {
                                                            onChange(v);
                                                        }}
                                                        defaultValue="REST"
                                                        className="flex gap-4"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <RadioGroupItem
                                                                value="REST"
                                                                id="request-type-rest"
                                                            />
                                                            <LabelRequired htmlFor="request-type-rest">
                                                                REST
                                                            </LabelRequired>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <RadioGroupItem
                                                                value="GRAPHQL"
                                                                id="request-type-graphql"
                                                            />
                                                            <LabelRequired htmlFor="request-type-graphql">
                                                                GraphQL
                                                            </LabelRequired>
                                                        </div>
                                                    </RadioGroup>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 sm:flex-col sm:gap-6">
                                        <div className="flex flex-col gap-2 flex-grow overflow-hidden">
                                            <LabelRequired
                                                required
                                                htmlFor="url"
                                            >
                                                URL
                                            </LabelRequired>
                                            <Controller
                                                control={control}
                                                name="url"
                                                render={({
                                                    field: {
                                                        onChange,
                                                        value,
                                                        name,
                                                        ref,
                                                    },
                                                }) => (
                                                    <UrlInput
                                                        name={name}
                                                        ref={ref}
                                                        clearError={
                                                            clearUrlError
                                                        }
                                                        required
                                                        onError={setUrlError}
                                                        id="url"
                                                        value={value}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        {requestType === "GRAPHQL" && (
                                            <div className="flex flex-col gap-2 flex-grow overflow-hidden">
                                                <LabelRequired
                                                    required
                                                    htmlFor="operationName"
                                                >
                                                    Operation Name
                                                </LabelRequired>
                                                <Input
                                                    id="operationName"
                                                    {...register(
                                                        "operationName"
                                                    )}
                                                    required={
                                                        requestType ===
                                                        "GRAPHQL"
                                                    }
                                                />
                                            </div>
                                        )}
                                        {requestType === "REST" && (
                                            <div className="flex flex-col gap-2">
                                                <LabelRequired
                                                    required
                                                    htmlFor="method"
                                                >
                                                    Method
                                                </LabelRequired>
                                                <Select />
                                                <Controller
                                                    control={control}
                                                    name="method"
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            value,
                                                        },
                                                    }) => (
                                                        <Select
                                                            value={value}
                                                            onValueChange={
                                                                onChange
                                                            }
                                                        >
                                                            <SelectTrigger className="w-[240px]">
                                                                <SelectValue placeholder="Method" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {getMethodOptions().map(
                                                                        (
                                                                            option
                                                                        ) => (
                                                                            <SelectItem
                                                                                key={
                                                                                    option.value
                                                                                }
                                                                                value={
                                                                                    option.value
                                                                                }
                                                                            >
                                                                                {
                                                                                    option.label
                                                                                }
                                                                            </SelectItem>
                                                                        )
                                                                    )}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Response</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2 flex-grow">
                                            <LabelRequired
                                                required
                                                htmlFor="status"
                                            >
                                                Status
                                            </LabelRequired>
                                            <Input
                                                id="status"
                                                {...register("status", {
                                                    required: true,
                                                })}
                                                type="number"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 flex-grow">
                                            <LabelRequired htmlFor="delay">
                                                Delay (ms)
                                            </LabelRequired>
                                            <Input
                                                id="delay"
                                                {...register("delay", {})}
                                                type="number"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <LabelRequired htmlFor="headers">
                                            Headers
                                        </LabelRequired>
                                        <div className="flex flex-col gap-2">
                                            <div>
                                                <Button
                                                    className="cursor-pointer"
                                                    variant="ghost"
                                                    type="button"
                                                    onClick={() =>
                                                        prepend({
                                                            name: "",
                                                            value: "",
                                                        })
                                                    }
                                                >
                                                    <Plus />
                                                    Add Header
                                                </Button>
                                            </div>
                                            {fields.map((field, index) => (
                                                <div
                                                    className="flex gap-4"
                                                    key={field.id}
                                                >
                                                    <Input
                                                        {...register(
                                                            `headers.${index}.name`,
                                                            {
                                                                required: true,
                                                            }
                                                        )}
                                                    />
                                                    <Input
                                                        {...register(
                                                            `headers.${index}.value`,
                                                            {
                                                                required: true,
                                                            }
                                                        )}
                                                    />
                                                    <Button
                                                        className="cursor-pointer size-8 hover:bg-destructive hover:text-white"
                                                        variant="secondary"
                                                        size="icon"
                                                        type="button"
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                    >
                                                        <Trash />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2 flex-grow">
                                            <LabelRequired>Type</LabelRequired>
                                            <Controller
                                                name="responseType"
                                                control={control}
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <RadioGroup
                                                        value={
                                                            value || "STATIC"
                                                        }
                                                        onValueChange={(v) => {
                                                            onChange(v);
                                                        }}
                                                        defaultValue="STATIC"
                                                        className="flex gap-4"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <RadioGroupItem
                                                                value="STATIC"
                                                                id="r1"
                                                            />
                                                            <LabelRequired htmlFor="r1">
                                                                Static
                                                            </LabelRequired>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <RadioGroupItem
                                                                value="FUNCTION"
                                                                id="r2"
                                                            />
                                                            <LabelRequired htmlFor="r2">
                                                                Function
                                                            </LabelRequired>
                                                            <FunctionEditorDisabledTooltip />
                                                        </div>
                                                    </RadioGroup>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    {responseType === "FUNCTION" ? (
                                        <>
                                            <Controller
                                                control={control}
                                                name="function"
                                                render={({
                                                    field: { onChange, value },
                                                }) => (
                                                    <FunctionEditor
                                                        value={value}
                                                        onChange={onChange}
                                                        customLinter={
                                                            disallowedApisLinter
                                                        }
                                                        id="FUNCTION"
                                                        setUri={setUri}
                                                    />
                                                )}
                                            />
                                        </>
                                    ) : (
                                        <Controller
                                            control={control}
                                            name="response"
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <JsonEditor
                                                    value={value}
                                                    onChange={onChange}
                                                    id="STATIC"
                                                    setUri={setUri}
                                                />
                                            )}
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="w-full flex justify-center bg-card px-6 py-4 border-t-1 grow-0">
                    <div className="max-w-7xl flex justify-end w-full items-center gap-4">
                        {formError && (
                            <span className="text-red-600 text-sm">
                                {formError}
                            </span>
                        )}
                        {mock?.localId && onDeleteClick && (
                            <Button
                                variant="destructive-outline-transparent"
                                type="button"
                                onClick={onDeleteClick}
                            >
                                Delete Mock
                            </Button>
                        )}
                        <Button disabled={isLoading} type="submit">
                            {isLoading && <Spinner />}
                            {mock?.localId ? "Update Mock" : "Add Mock"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
