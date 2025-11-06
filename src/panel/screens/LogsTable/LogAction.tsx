import React from "react";
import { Button } from "@/components/ui/button";
import { ILog } from "@/types";
import { Edit, Ellipsis } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

interface LogActionProps {
    log: ILog;
    index: number;
    onActionClick?: (type: "HEADER" | "MOCK", data: ILog) => void;
}

export const LogActions = ({ log, onActionClick }: LogActionProps) => {
    const handleOnClick =
        (type: "HEADER" | "MOCK") => (event: React.MouseEvent) => {
            event.stopPropagation();
            onActionClick?.(type, log);
        };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    size="icon"
                    variant="outline"
                >
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20" align="start">
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleOnClick("MOCK")}
                >
                    {log.mockData ? "Edit Mock" : "Add Mock"}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleOnClick("HEADER")}
                >
                    {log.headerData ? "Edit Header" : "Add Header"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
