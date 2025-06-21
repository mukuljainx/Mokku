import * as React from "react";
import "./SidebarDraggable.css";

interface SidebarDraggableProps {
    children: React.ReactNode;
    minWidth?: number;
    width?: string;
}

let prevWidth: string | undefined | number;

export const SidebarDraggable = ({
    children,
    minWidth = 16,
    width = "40%",
}: SidebarDraggableProps) => {
    const draggerRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const onDraggerMouseMove = (event: MouseEvent) => {
        const mousePosition = event.clientX;
        event?.preventDefault();
        event?.stopPropagation();
        event?.stopImmediatePropagation();
        const elementRightEdge = containerRef.current.getBoundingClientRect()
            .right;
        const width = Math.max(
            minWidth || minWidth,
            elementRightEdge - mousePosition,
        );
        prevWidth = width;
        containerRef.current.style.width = `${width}px`;
    };

    const onDraggerMouseUp = () => {
        document.body.classList.remove("no-select", "ew-resize");
        document.removeEventListener("mousemove", onDraggerMouseMove);
        document.removeEventListener("mouseup", onDraggerMouseUp);
    };

    const onDraggerMouseDown = () => {
        document.body.classList.add("no-select", "ew-resize");
        document.addEventListener("mousemove", onDraggerMouseMove);
        document.addEventListener("mouseup", onDraggerMouseUp);
    };

    React.useEffect(() => {
        draggerRef.current?.addEventListener("mousedown", onDraggerMouseDown);
        const containerWidth = prevWidth || width;
        containerRef.current.style.width = `${containerWidth}px`;

        return () => {
            document.body.classList.remove("no-select", "ew-resize");
            draggerRef.current?.removeEventListener(
                "mousedown",
                onDraggerMouseDown,
            );
        };
    }, [minWidth]);

    return (
        <div
            className="sidebar-draggable-container"
            style={{
                minWidth: minWidth,
                maxWidth: "calc(100% - 24px)",
                width: width,
            }}
            ref={containerRef}
        >
            <div
                className="sidebar-draggable-container-handler"
                ref={draggerRef}
            >
                <div className="sidebar-draggable-container-handler-visible" />
            </div>
            <div className="sidebar-draggable-container-content">
                {children}
            </div>
        </div>
    );
};
