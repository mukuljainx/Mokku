import { Card, CardContent } from "@/dashboard/components/ui/card";
import { Construction } from "lucide-react";

export const CreateOrganization = () => {
    return (
        <Card className="max-w-md mx-auto mt-20">
            <CardContent className="flex flex-col items-center justify-center gap-4 py-20">
                <Construction className="size-20" />
                <h3 className="text-3xl">Work in Progress</h3>
                <p>At the moment Mokku only supports, one default org</p>
            </CardContent>
        </Card>
    );
    // return <OrganizationForm onSubmit={console.log} />;
};
