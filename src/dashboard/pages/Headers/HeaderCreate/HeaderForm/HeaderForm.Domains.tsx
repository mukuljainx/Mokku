import { Button } from "@/dashboard/components/ui/button";
import { Input } from "@/dashboard/components/ui/input";
import { LabelRequired } from "@/dashboard/components/ui/label-required";
import type { IHeader } from "@/dashboard/types";
import { Plus, Trash2 } from "lucide-react";
import type { UseFieldArrayReturn, UseFormRegister } from "react-hook-form";

type HeaderFormDomainsProps = UseFieldArrayReturn<{
    condition: { initiatorDomains: string[] };
}> & {
    register: UseFormRegister<IHeader>;
};

export const HeaderFormDomains = ({
    fields,
    register,
    remove,
    append,
}: HeaderFormDomainsProps) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <LabelRequired htmlFor="url">Domains</LabelRequired>{" "}
                <Button
                    type="button"
                    variant="outline"
                    size="tiny"
                    onClick={() => append("")}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Domain
                </Button>
            </div>
            {fields.length === 0 && (
                <p className="text-sm text-muted-foreground mb-2">
                    No domains added. Requests from all domains will be matched.
                    It is recommended to add domain.
                </p>
            )}

            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                    <Input
                        {...register(`condition.initiatorDomains.${index}`, {
                            required: {
                                value: true,
                                message: "Header name is required",
                            },
                            validate: (value) => {
                                if (value.trim() === "") {
                                    return "Header name cannot be empty";
                                }

                                // write a regex match so only domain is allowed here without protocol or pathname
                                const domainRegex =
                                    /^(?!-)[A-Za-z0-9-]+([-.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/;
                                if (!domainRegex.test(value)) {
                                    return "Please enter a valid domain name (e.g., example.com)";
                                }

                                return true;
                            },
                        })}
                        required
                        placeholder="Domain (e.g., example.com, a.example.com)"
                    />

                    <Button
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
