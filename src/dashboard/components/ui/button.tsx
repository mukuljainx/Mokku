import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/dashboard/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                success: "bg-success text-white hover:bg-success/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-link underline-offset-4 hover:underline",
                "link-info": "text-link underline-offset-4 hover:underline",
                "link-error":
                    "text-destructive underline-offset-4 hover:underline",
                "link-success":
                    "text-success underline-offset-4 hover:underline",
                "link-warning":
                    "text-warning underline-offset-4 hover:underline",
                "link-primary":
                    "text-primary underline-offset-4 hover:underline",
                "link-secondary":
                    "text-foreground-secondary underline-offset-4 hover:underline",
                "destructive-outline-transparent":
                    "border-destructive bg-transparent border text-destructive hover:bg-destructive/10",
                "success-outline-transparent":
                    "border-success bg-transparent border text-success hover:bg-success/10",
                "primary-outline-transparent":
                    "border-primary bg-transparent border text-primary hover:bg-primary/10",
                "warning-outline-transparent":
                    "border-warning bg-transparent border text-warning hover:bg-warning/10",
                "link-outline-transparent":
                    "border-link bg-transparent border text-link hover:bg-link/10",
            },
            size: {
                default: "h-10 px-4 py-2",
                tiny: "h-8 rounded-md px-4",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
                link: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size = "sm",
            children,
            loading,
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {children}
                {!!loading && <Spinner />}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
