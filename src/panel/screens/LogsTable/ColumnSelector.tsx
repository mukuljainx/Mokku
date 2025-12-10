import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Columns3Cog } from "lucide-react";

interface ColumnSelectorProps {
    columns: {
        id: string;
        label: string;
        isVisible: boolean;
    }[];
    onColumnToggle: (columnId: string) => void;
}

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({
    columns,
    onColumnToggle,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0">
                    <Columns3Cog />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {columns.map((column) => (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.isVisible}
                        onCheckedChange={() => onColumnToggle(column.id)}
                    >
                        {column.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
