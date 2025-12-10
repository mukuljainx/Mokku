import { useParams } from "react-router";

export const useProjectId = () => {
    const { projectId } = useParams();

    return projectId || "";
};
