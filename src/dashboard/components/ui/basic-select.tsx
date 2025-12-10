import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

interface BasicSelectProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    options: { label: string; value: string }[];
    required?: boolean;
}

export const BasicSelect = ({
    value,
    onChange,
    placeholder,
    className,
    options,
    required,
}: BasicSelectProps) => {
    return (
        <Select required={required} value={value} onValueChange={onChange}>
            <SelectTrigger
                value={value}
                className={className ? className : "w-[180px]"}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
