import { Input } from "@/dashboard/components/ui/input";
import type { IFilter } from "./Mocks";
import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/dashboard/components/ui/select";
import { Button } from "@/dashboard/components/ui/button";
import { Link, useLocation } from "react-router";

export interface MockFilterProps {
    value: IFilter;
    onChange: <T extends keyof IFilter>(key: T, value: IFilter[T]) => void;
}

export const MockFilter = ({ value, onChange }: MockFilterProps) => {
    const { pathname } = useLocation();
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-3 flex-wrap">
                <Input
                    className="w-[240px]"
                    placeholder="Search by name, url"
                    value={value.search}
                    onChange={(event) => onChange("search", event.target.value)}
                />

                <Select
                    defaultValue="both"
                    onValueChange={(value) => {
                        switch (value) {
                            case "active":
                                onChange("active", true);
                                break;
                            case "inactive":
                                onChange("active", false);
                                break;
                            default:
                                onChange("active", undefined);
                        }
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Mock Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="both">Show All</SelectItem>
                        <SelectItem value="active">Show Active</SelectItem>
                        <SelectItem value="inactive">Show Inactive</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    defaultValue="both"
                    onValueChange={(value) => {
                        switch (value) {
                            case "static":
                                onChange("dynamic", false);
                                break;
                            case "dynamic":
                                onChange("dynamic", true);
                                break;
                            default:
                                onChange("dynamic", undefined);
                        }
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Mock Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="both">Show Both</SelectItem>
                        <SelectItem value="static">Show Static</SelectItem>
                        <SelectItem value="dynamic">Show Dynamic</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Link to={`${pathname}/create-mock`}>
                <Button className="cursor-pointer">
                    <Plus />
                    Add Mock
                </Button>
            </Link>
        </div>
    );
};
