import { mocksDb } from "@/services/db/mocksDb";
import { OperationHandlers } from "./type";
import { IMock, IMockCreate, IProjectCreate } from "@/types";
import { postBodyValidator } from "../utils/post-body-validator";

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
    // PROJECT_GET: async (message, postMessage) => {
    //     const { slug, id } = message.data as { slug: string; id: number };

    //     const project = await projectsDb.getProjects({
    //         slug,
    //         id,
    //     });

    //     if (project[0]) {
    //         postMessage({
    //             type: "PROJECT_GET",
    //             data: project[0],
    //             id: message.id,
    //         });
    //     } else {
    //         postMessage({
    //             type: "PROJECT_GET",
    //             data: {
    //                 isError: true,
    //                 error: {
    //                     message: "Project not found",
    //                     status: 404,
    //                 },
    //             },
    //             id: message.id,
    //         });
    //     }
    // },
    MOCK_CREATE: async (message, postMessage) => {
        const data = message.data as IMock;

        const missingFields = postBodyValidator(data, [
            "name",
            "projectId",
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

        const mock = await mocksDb.createMock(data);

        postMessage({
            type: "MOCK_CREATE",
            data: mock,
            id: message.id,
        });
    },
};
