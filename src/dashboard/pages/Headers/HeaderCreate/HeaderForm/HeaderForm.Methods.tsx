import { LabelRequired } from "@/dashboard/components/ui/label-required";
import type { IHeader } from "@/dashboard/types";
import {
    Controller,
    type Control,
    type UseFormRegister,
} from "react-hook-form";
import { MultiSelect } from "@/dashboard/components/ui/multi-select";

// CONNECT = "connect",
//             DELETE = "delete",
//             GET = "get",
//             HEAD = "head",
//             OPTIONS = "options",
//             PATCH = "patch",
//             POST = "post",
//             PUT = "put",
//             OTHER = "other",

const allOptions = [
    {
        label: "Connect",
        value: "connect",
    },
    {
        label: "Delete",
        value: "delete",
    },
    {
        label: "Get",
        value: "get",
    },
    {
        label: "Head",
        value: "head",
    },
    {
        label: "Options",
        value: "options",
    },
    {
        label: "Patch",
        value: "patch",
    },
    {
        label: "Post",
        value: "post",
    },
    {
        label: "Put",
        value: "put",
    },
    {
        label: "Other",
        value: "other",
    },
];

type HeaderFormMethodProps = {
    register: UseFormRegister<IHeader>;
    control: Control<IHeader, unknown, IHeader>;
};

export const HeaderFormMethod = ({ control }: HeaderFormMethodProps) => {
    return (
        <Controller
            name="condition.requestMethods"
            control={control}
            render={({ field: { onChange, value } }) => (
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <LabelRequired htmlFor="condition.urlFilter">
                            Methods
                        </LabelRequired>
                        <span className="text-sm text-muted-foreground">
                            Empty matches all methods
                        </span>
                    </div>

                    <MultiSelect
                        options={allOptions}
                        onValueChange={onChange}
                        value={value}
                    />
                </div>
            )}
        />
    );
};
