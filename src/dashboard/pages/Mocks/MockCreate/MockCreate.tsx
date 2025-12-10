import { useCallback, useEffect, useState } from "react";
import { MockForm } from "./MockForm/MockForm";
import { getMokkuListener } from "@/dashboard/service/getMokkuListener";
import type { ILog, IMock } from "@/dashboard/types";
import { useMocksCreate } from "@/dashboard/pages/Mocks/queries/useMocksCreate";
import { toast } from "sonner";
import { useProjectStore } from "@/dashboard/pages/Project";
import { useAppNavigate } from "@/dashboard/hooks/use-app-navigate";

export const MockCreate = () => {
    const [mock, setMock] = useState<Partial<IMock>>();
    const [key, setKey] = useState(0);
    const { project, loading: projectLoading } = useProjectStore();
    const { goToMocksList } = useAppNavigate();

    const { mutate } = useMocksCreate({
        onSuccess: () => goToMocksList(),
    });

    useEffect(() => {
        getMokkuListener((data) => {
            if (data.type === "ADD_EDIT_MOCK") {
                const log = data.data as ILog;
                console.log(91111, log);
                setMock({
                    url: log.request?.url,
                    method: log.request?.method,
                    status: log.response?.status,
                    response: log.response?.response,
                    headers: log.response?.headers,
                    active: true,
                });
                setKey((k) => k + 1);
            }
        });
    }, []);

    const handleSubmit = useCallback(
        (mock: Partial<IMock>) => {
            if (!mock.projectLocalId) {
                return toast.error("Project ID is required to create a mock");
            }
            mutate(mock);
        },
        [mutate]
    );

    if (projectLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mx-auto h-full">
            <MockForm
                isLoading={false}
                onSubmit={handleSubmit}
                mock={{ ...mock, projectLocalId: project?.localId }}
                key={key}
            />
        </div>
    );
};
