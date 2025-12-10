import { Button } from "@/dashboard/components/ui/button";
import { cn } from "@/dashboard/lib/utils";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { toast as sonnerToast } from "sonner";

export interface ToxoToastProps {
    id: string | number;
    title: string;
    description?: string;
    actions?: {
        label: string;
        onClick: () => void;
    }[];
    appearance?: "info" | "success" | "warning" | "error";
    dismissButton?: boolean;
}

export function toast(toast: Omit<ToxoToastProps, "id">) {
    return sonnerToast.custom((id) => (
        <ToxoToast
            id={id}
            title={toast.title}
            description={toast.description}
            appearance={toast.appearance}
            actions={toast.actions}
        />
    ));
}

const toastVariants = {
    info: "ring-link bg-card",
    success: "ring-success bg-card",
    warning: "ring-warning bg-card",
    error: "ring-destructive bg-card",
};

const iconVariants = {
    info: "text-link",
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
};

const icons: Record<
    Required<ToxoToastProps>["appearance"],
    React.FC<{ className?: string }>
> = {
    info: Info,
    success: CircleCheck,
    warning: CircleAlert,
    error: CircleX,
};

/** A fully custom toast that still maintains the animations and interactions. */
export function ToxoToast(props: ToxoToastProps) {
    const {
        id,
        title,
        description,
        appearance = "info",
        actions,
        dismissButton,
    } = props;

    const Icon = icons[appearance];

    return (
        <div
            className={cn([
                "flex rounded-md bg-card backdrop-blur-[2px] text-card-foreground shadow-lg ring-1 ring-black/5 w-full  lg:min-w-[360px] md:min-w-[320px] items-center py-2 px-4",
                toastVariants[appearance],
            ])}
        >
            <div className="flex flex-1 items-center">
                <div className="w-full">
                    <div className="flex items-center gap-1">
                        <Icon
                            className={cn(["size-4", iconVariants[appearance]])}
                        />
                        <p className="text-base font-medium">{title}</p>
                    </div>
                    {description ? (
                        <p className="text-sm ml-5 font-light">{description}</p>
                    ) : null}
                    <div className="ml-5 mt-2 flex gap-2">
                        {dismissButton && (
                            <Button
                                size="link"
                                variant={`link-${appearance}`}
                                onClick={() => sonnerToast.dismiss(id)}
                            >
                                Dismiss
                            </Button>
                        )}
                        {actions?.map((action, index) => (
                            <Button
                                key={index}
                                size="link"
                                variant={`link-${appearance}`}
                                onClick={() => {
                                    action.onClick();
                                    sonnerToast.dismiss(id);
                                }}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const toastData: ToxoToastProps[] = [
    "info",
    "success",
    "warning",
    "error",
].map((appearance) => ({
    id: appearance,
    title: "Welcome to Toxo!",
    description: "We're glad to have you here!",
    appearance: appearance as ToxoToastProps["appearance"],
}));

export const ToastExamples = () => {
    return (
        <div className="p-4 space-y-4">
            {toastData.map((toast) => (
                <ToxoToast key={toast.id} {...toast} />
            ))}
        </div>
    );
};
