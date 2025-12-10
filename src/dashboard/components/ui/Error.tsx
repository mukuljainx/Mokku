import { AlertCircle } from "lucide-react";
import { Button } from "@/dashboard/components/ui/button";
import { useSpring, animated } from "@react-spring/web";

interface ErrorProps {
    message?: string;
    details?: React.ReactNode;
    onRetry?: () => void;
    icon?: React.ReactNode;
}

export const Error = ({
    message = "Something went wrong",
    details,
    onRetry,
    icon,
}: ErrorProps) => {
    const springProps = useSpring({
        from: { opacity: 0, transform: "scale(0.9)" },
        to: { opacity: 1, transform: "scale(1)" },
    });

    return (
        <animated.div
            style={springProps}
            className="flex flex-col w-full items-center justify-center p-6 
                       min-h-[200px] text-center space-y-4"
        >
            <div className="rounded-full bg-destructive/20 p-3">
                {icon || <AlertCircle className="w-6 h-6 text-destructive" />}
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium foreground">{message}</h3>
                {details && (
                    <p className="text-sm text-muted-foreground">{details}</p>
                )}
            </div>

            {onRetry && (
                <Button
                    onClick={onRetry}
                    variant="outline"
                    className="mt-4 border-destructive/20 text-destructive 
                             hover:bg-destructive/10 hover:border-destructive/50"
                >
                    Try Again
                </Button>
            )}
        </animated.div>
    );
};
