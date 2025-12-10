import { Input } from "@/dashboard/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/dashboard/components/ui/select";
import { Button } from "@/dashboard/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useLocation } from "react-router";

interface IFilter {
    limit: number;
    page: number;
    active?: boolean;
    dynamic?: boolean;
    search: string;
}

interface HeaderFilterProps {
    value: IFilter;
    onChange: <T extends keyof IFilter>(key: T, value: IFilter[T]) => void;
}

export const HeaderFilter = ({ value, onChange }: HeaderFilterProps) => {
    const { pathname } = useLocation();

    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                <Input
                    placeholder="Search headers..."
                    value={value.search}
                    onChange={(e) => onChange("search", e.target.value)}
                    className="flex-1"
                />
                <Select
                    value={value.active?.toString() || "all"}
                    onValueChange={(val) =>
                        onChange(
                            "active",
                            val === "all" ? undefined : val === "true"
                        )
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Headers</SelectItem>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={value.dynamic?.toString() || "all"}
                    onValueChange={(val) =>
                        onChange(
                            "dynamic",
                            val === "all" ? undefined : val === "true"
                        )
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="true">Dynamic</SelectItem>
                        <SelectItem value="false">Static</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Link to={`${pathname}/create-header`}>
                <Button className="cursor-pointer">
                    <Plus />
                    Add Header
                </Button>
            </Link>
        </div>
    );
};
