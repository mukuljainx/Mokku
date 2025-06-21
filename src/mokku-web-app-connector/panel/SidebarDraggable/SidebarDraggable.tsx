import * as React from "react";
import "./SidebarDraggable.css";

interface SidebarDraggableProps {
    children: React.ReactNode;
    minWidth?: number;
}

export const SidebarDraggable = ({
    children,
    minWidth = 360,
}: SidebarDraggableProps) => {
    const draggerRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const onDraggerMouseMove = (event) => {
        const mousePosition = event.clientX;
        const elementRightEdge = containerRef.current.getBoundingClientRect()
            .right;
        const width = Math.max(
            minWidth || minWidth,
            elementRightEdge - mousePosition,
        );
        containerRef.current.style.width = `${width}px`;
    };

    const onDraggerMouseUp = () => {
        document.removeEventListener("mousemove", onDraggerMouseMove);
        document.removeEventListener("mouseup", onDraggerMouseUp);
    };

    const onDraggerMouseDown = () => {
        document.addEventListener("mousemove", onDraggerMouseMove);
        document.addEventListener("mouseup", onDraggerMouseUp);
    };

    React.useEffect(() => {
        draggerRef.current?.addEventListener("mousedown", onDraggerMouseDown);
        const containerWidth = Math.min(Math.max(minWidth || minWidth));
        containerRef.current.style.width = `${containerWidth}px`;

        return () => {
            draggerRef.current?.removeEventListener(
                "mousedown",
                onDraggerMouseDown,
            );
        };
    }, [minWidth]);

    return (
        <div
            className="sidebar-draggable-container"
            style={{ minWidth: minWidth, maxWidth: "calc(100% - 120px)" }}
            ref={containerRef}
        >
            <div
                className="sidebar-draggable-container-handler"
                ref={draggerRef}
            />
            <div className="sidebar-draggable-container-content">
                {children}
            </div>
        </div>
    );
};
