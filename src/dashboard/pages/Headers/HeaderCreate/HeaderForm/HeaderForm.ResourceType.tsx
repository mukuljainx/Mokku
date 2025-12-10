import { LabelRequired } from "@/dashboard/components/ui/label-required";
import type { IHeader } from "@/dashboard/types";
import {
    Controller,
    type Control,
    type UseFormRegister,
} from "react-hook-form";
import { MultiSelect } from "@/dashboard/components/ui/multi-select";
import { getResourceTypeOptions } from "../../utils/getResourceTypeOptions";

type HeaderFormResourceTypeProps = {
    register: UseFormRegister<IHeader>;
    control: Control<IHeader, unknown, IHeader>;
};

const resourceTypeOptions = getResourceTypeOptions();

export const HeaderFormResourceType = ({
    control,
}: HeaderFormResourceTypeProps) => {
    return (
        <Controller
            name="condition.resourceTypes"
            control={control}
            render={({ field: { onChange, value } }) => (
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <LabelRequired htmlFor="condition.urlFilter">
                            Resource Type
                        </LabelRequired>
                        <span className="text-sm text-muted-foreground">
                            Empty matches all resource type
                        </span>
                    </div>

                    <MultiSelect
                        options={resourceTypeOptions}
                        onValueChange={onChange}
                        value={value}
                    />
                </div>
            )}
        />
    );
};
