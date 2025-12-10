import { useParams } from "react-router";

export const useMockId = () => {
    const { mockId } = useParams();

    return Number(mockId);
};
