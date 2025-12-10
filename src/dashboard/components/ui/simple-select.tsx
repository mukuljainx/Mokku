import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/dashboard/components/ui/select";

interface SimpleSelectProps {
    placeholder?: string;
    value?: string;
    options: { value: string; label: string }[];
    onChange?: (v: string) => void;
    className?: string;
}

export const SimpleSelect = ({
    options,
    value,
    placeholder,
    onChange,
    className,
}: SimpleSelectProps) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger value={value} className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
