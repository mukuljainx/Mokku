import { Input } from "@/components/ui/input";
import {
    CircleStop,
    CircleX,
    ExternalLink,
    RefreshCcw,
    Search,
    SquareArrowOutUpRight,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";
import { allMethods } from "./constant";
import { MokkuActionMenu } from "../MokkuActionMenu";
import { openApp } from "@/services/app";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";

interface LogTableFilterProps {
    search?: string;
    setSearch: (search: string) => void;
    setStatusFilter: (statusFilter: string) => void;
    setMethodFilter: (methodFilter: string) => void;
    clearData: () => void;
}

export const LogTableFilter = ({
    search,
    setSearch,
    setMethodFilter,
    setStatusFilter,
    clearData,
}: LogTableFilterProps) => (
    <div className="flex justify-between flex-wrap gap-2 py-2">
        <div className="flex gap-2 flex-wrap">
            <div className="relative flex items-center !h-8 w-40">
                <Search className="absolute size-4 ml-2" />
                <Input
                    type="text"
                    value={search ?? ""}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search all logs..."
                    className="pl-7 !h-8"
                />
            </div>
            <Select onValueChange={(value) => setMethodFilter(value)}>
                <SelectTrigger className="w-36 !h-8">
                    <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All</SelectItem>
                    {allMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                            {method}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => setStatusFilter(value)}>
                <SelectTrigger className="w-36 !h-8">
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="2xx">2xx Success</SelectItem>
                    <SelectItem value="3xx">3xx Redirection</SelectItem>
                    <SelectItem value="4xx">4xx Client Error</SelectItem>
                    <SelectItem value="5xx">5xx Server Error</SelectItem>
                </SelectContent>
            </Select>
            <SimpleTooltip asChild content="Clear Logs">
                <Button
                    size="sm"
                    onClick={clearData}
                    className="logs-table-clear-Button text-red-500 border border-red-500 bg-transparent hover:bg-red-500 hover:text-white"
                >
                    <CircleX />
                </Button>
            </SimpleTooltip>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => openApp()}>
                Open App
                <SquareArrowOutUpRight />
            </Button>
            <MokkuActionMenu />
        </div>
    </div>
);
