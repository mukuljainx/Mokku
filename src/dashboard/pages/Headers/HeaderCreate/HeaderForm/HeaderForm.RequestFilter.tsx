import { Input } from "@/dashboard/components/ui/input";
import { LabelRequired } from "@/dashboard/components/ui/label-required";
import type { IHeader } from "@/dashboard/types";
import {
    Controller,
    type Control,
    type UseFormRegister,
} from "react-hook-form";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/dashboard/components/ui/radio-group";
import { Button } from "@/dashboard/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const urlFilterRegex = /^[a-zA-Z0-9-_.:/?#%@=&+$!;~,*^|\\]+$/;

type HeaderFormRequestFilterProps = {
    register: UseFormRegister<IHeader>;
    control: Control<IHeader, unknown, IHeader>;
};

export const HeaderFormRequestFilter = ({
    register,
    control,
}: HeaderFormRequestFilterProps) => {
    return (
        <Controller
            name="filterType"
            control={control}
            render={({ field: { onChange, value } }) => (
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <LabelRequired htmlFor="condition.urlFilter">
                            Url Filter
                        </LabelRequired>
                        {!value && (
                            <Button
                                type="button"
                                variant="outline"
                                size="tiny"
                                // onClick={() => setShowFilter(true)}
                                onClick={() => onChange("pattern")}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Filter
                            </Button>
                        )}
                        {value && (
                            <RadioGroup
                                value={value || "pattern"}
                                onValueChange={(v) => {
                                    onChange(v);
                                }}
                                defaultValue="REST"
                                className="flex gap-4"
                            >
                                <RadioGroupItem
                                    value="pattern"
                                    id="filter-type-pattern"
                                />
                                <LabelRequired htmlFor="filter-type-pattern">
                                    Pattern
                                </LabelRequired>
                                <RadioGroupItem
                                    value="regex"
                                    id="filter-type-regex"
                                />
                                <LabelRequired htmlFor="filter-type-pattern">
                                    Regex
                                </LabelRequired>
                            </RadioGroup>
                        )}
                    </div>
                    {!value && (
                        <p className="text-sm text-muted-foreground mb-2">
                            No filter applied. This header will apply to all
                            requests.
                        </p>
                    )}
                    {value && (
                        <div className="flex gap-2">
                            {value === "pattern" && (
                                <Input
                                    {...register(`condition.urlFilter`, {
                                        required: {
                                            value: true,
                                            message: "URL Filter is required",
                                        },
                                        validate: (value) => {
                                            if (!value || value.trim() === "") {
                                                return true;
                                            }

                                            if (
                                                !urlFilterRegex.test(
                                                    value.trim()
                                                )
                                            ) {
                                                return "Please enter a url Filter with valid characters";
                                            }

                                            return true;
                                        },
                                    })}
                                    required
                                    placeholder="||https://www.example.com/"
                                />
                            )}
                            {value === "regex" && (
                                <Input
                                    {...register(`condition.regexFilter`, {
                                        required: {
                                            value: true,
                                            message: "URL Regex is required",
                                        },
                                    })}
                                    required
                                    placeholder="^https://www\\.(abc|def)\\.xyz\\.com/"
                                />
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => onChange(undefined)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        />
    );
};
