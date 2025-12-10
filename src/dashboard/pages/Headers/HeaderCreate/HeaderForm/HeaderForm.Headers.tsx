import { Button } from "@/dashboard/components/ui/button";
import { Input } from "@/dashboard/components/ui/input";
import { SimpleSelect } from "@/dashboard/components/ui/simple-select";
import type { IHeader } from "@/dashboard/types";
import { Plus, Trash2 } from "lucide-react";
import {
    Controller,
    type Control,
    type UseFieldArrayReturn,
    type UseFormRegister,
} from "react-hook-form";

type HeaderFormHeadersProps = UseFieldArrayReturn<
    IHeader,
    "action.requestHeaders",
    "id"
> & {
    register: UseFormRegister<IHeader>;
    control: Control<IHeader, unknown, IHeader>;
};

const operationOptions = [
    {
        label: "Set",
        value: "set",
    },
    {
        label: "Append",
        value: "append",
    },
    {
        label: "Remove",
        value: "remove",
    },
];

export const HeaderFormHeaders = ({
    fields,
    register,
    remove,
    prepend,
    control,
}: HeaderFormHeadersProps) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="tiny"
                    onClick={() =>
                        prepend({
                            header: "",
                            operation: "set",
                            value: "",
                        })
                    }
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Header
                </Button>
            </div>
            {fields.length === 0 && (
                <p className="text-sm text-muted-foreground mb-2">
                    Add headers to override
                </p>
            )}

            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                    <Input
                        {...register(`action.requestHeaders.${index}.header`, {
                            required: {
                                value: true,
                                message: "Header name is required",
                            },
                        })}
                        required
                        placeholder="Header Name"
                    />
                    <Input
                        {...register(`action.requestHeaders.${index}.value`, {
                            required: {
                                value: true,
                                message: "Header value is required",
                            },
                        })}
                        required
                        placeholder="Header value"
                    />
                    <Controller
                        control={control}
                        name={`action.requestHeaders.${index}.operation`}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <SimpleSelect
                                    placeholder="Set"
                                    className="w-[240px]"
                                    onChange={onChange}
                                    value={value}
                                    options={operationOptions}
                                />
                            );
                        }}
                    />

                    <Button
                        className="shrink-0"
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ))}
            {/* <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append("")}
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Domain
            </Button> */}
        </div>
    );
};
