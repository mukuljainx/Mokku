import { Navigate } from "react-router";

export const ProjectDetails = () => {
    const currentPath = window.location.pathname;
    return <Navigate replace to={`${currentPath}/mocks`} />;
};
