import React from "react";
import { Button } from "@/components/ui/button";
import { ILog } from "@/types";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export const SortableHeader = ({
    column,
    name,
}: {
    column: Column<ILog, any>;
    name?: string;
}) => {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting()}
            className="text-sm flex gap-1 items-center"
        >
            <span>{name}</span>
            {column.getIsSorted() === "asc" ? (
                <ArrowUp className="size-3" />
            ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="size-3" />
            ) : null}
        </Button>
    );
};
