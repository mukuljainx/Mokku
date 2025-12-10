import { Button } from "@/dashboard/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Input } from "@/dashboard/components/ui/input";
import { LabelRequired } from "@/dashboard/components/ui/label-required";
import { Textarea } from "@/dashboard/components/ui/textarea";
import type { IOrganization } from "@/dashboard/types";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = Partial<IOrganization>;

export const OrganizationForm = ({
    organization,
    onSubmit: onSubmitProp,
}: {
    organization?: Inputs;
    onSubmit: (organization: Inputs) => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            ...organization,
        },
    });

    const hasError = Object.keys(errors).length > 0;
    console.log(81144, { errors });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onSubmitProp(data);
    };

    return (
        <div className="w-full h-full">
            <form
                name="organization-form"
                id="organization-form"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col justify-between items-center h-full"
            >
                <div className="overflow-scroll w-full">
                    <div className="flex flex-col gap-6 max-w-7xl w-full px-2 py-6 m-auto">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Organization Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4">
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
                                                    required: true,
                                                })}
                                            />
                                        </div>
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
                    </div>
                </div>
                <div className="w-full flex justify-center bg-card px-6 py-4 border-t-1 grow-0 -mx-4">
                    <div className="max-w-7xl flex justify-end w-full items-center gap-4">
                        {hasError && (
                            <span className="text-red-500">
                                {Object.values(errors)?.[0]?.message}
                            </span>
                        )}
                        <Button type="submit">Add Organization</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
