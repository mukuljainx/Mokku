import { mocksDb } from "@/services/db/mocksDb";
import { OperationHandlers } from "../type";
import { IMock } from "@/types";
import { postBodyValidator } from "../../utils/post-body-validator";
import { updateEntityIfUrlIsDynamic } from "../../utils/update-entity-if-url-is-dynamic";
import { mockCheckHandler } from "../request-checker/mock-check-handler";

export const mockHandler: OperationHandlers = {
    MOCK_GET_ALL: async (message, postMessage) => {
        const mocks = await mocksDb.getMocks(
            message.data as Parameters<typeof mocksDb.getMocks>[0]
        );
        postMessage({
            type: "MOCK_GET_ALL",
            data: mocks,
            id: message.id,
        });
    },
    MOCK_GET: async (message, postMessage) => {
        const { localId } = message.data as { localId: number };

        const mock = await mocksDb.getMockByLocalId(localId);

        if (mock) {
            postMessage({
                type: "MOCK_GET",
                data: mock,
                id: message.id,
            });
        } else {
            postMessage({
                type: "MOCK_GET",
                data: {
                    isError: true,
                    error: {
                        message: "Mock not found",
                        status: 404,
                    },
                },
                id: message.id,
            });
        }
    },
    MOCK_UPDATE: async (message, postMessage) => {
        const data = message.data as { localId: number; mock: Partial<IMock> };

        updateEntityIfUrlIsDynamic(data.mock);

        const updatedMock = await mocksDb.updateMock(data.localId, data.mock);

        mockCheckHandler?.init();
        postMessage({
            type: "MOCK_UPDATE",
            data: updatedMock,
            id: message.id,
        });
    },
    MOCK_CREATE: async (message, postMessage) => {
        const data = message.data as IMock;

        const missingFields = postBodyValidator(data, [
            "name",
            "projectLocalId",
            "method",
            "status",
            "method",
            "url",
        ]);

        if (missingFields.length > 0) {
            return postMessage({
                type: "MOCK_CREATE",
                data: {
                    isError: true,
                    error: {
                        message: `Missing fields: ${missingFields.join(", ")}`,
                        status: 400,
                    },
                },
                id: message.id,
            });
        }

        updateEntityIfUrlIsDynamic(data);

        const mock = await mocksDb.createMock(data);

        mockCheckHandler?.init();
        postMessage({
            type: "MOCK_CREATE",
            data: mock,
            id: message.id,
        });
    },
    MOCK_DELETE: async (message, postMessage) => {
        const { localId } = message.data as { localId: number };

        await mocksDb.deleteMockByLocalId(localId);

        postMessage({
            type: "MOCK_DELETE",
            data: { success: true },
            id: message.id,
        });
    },
    MOCK_COUNT_BY_STATUS: async (message, postMessage) => {
        const { projectLocalId } = message.data as { projectLocalId: number };

        const counts = await mocksDb.getCountByStatus(projectLocalId);

        postMessage({
            type: "MOCK_COUNT_BY_STATUS",
            data: counts,
            id: message.id,
        });
    },
};
