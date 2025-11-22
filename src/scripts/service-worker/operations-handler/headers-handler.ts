import { headersDb } from "@/services/db";
import { OperationHandlers } from "../type";
import { IHeader } from "@/types";
import { postBodyValidator } from "../../utils/post-body-validator";
import { updateEntityIfUrlIsDynamic } from "../../utils/update-entity-if-url-is-dynamic";
import { headerCheckHandler } from "../request-checker/headers-check-handler";

export const headerHandler: OperationHandlers = {
    HEADER_GET_ALL: async (message, postMessage) => {
        const headers = await headersDb.getHeaders(
            message.data as Parameters<typeof headersDb.getHeaders>[0]
        );
        postMessage({
            type: "HEADER_GET_ALL",
            data: headers,
            id: message.id,
        });
    },
    HEADER_GET: async (message, postMessage) => {
        const { localId } = message.data as { localId: number };

        const header = await headersDb.getHeaderByLocalId(localId);

        if (header) {
            postMessage({
                type: "HEADER_GET",
                data: header,
                id: message.id,
            });
        } else {
            postMessage({
                type: "HEADER_GET",
                data: {
                    isError: true,
                    error: {
                        message: "Header not found",
                        status: 404,
                    },
                },
                id: message.id,
            });
        }
    },
    HEADER_UPDATE: async (message, postMessage) => {
        const data = message.data as {
            localId: number;
            header: Partial<IHeader>;
        };

        updateEntityIfUrlIsDynamic(data);

        const updatedHeader = await headersDb.updateHeader(
            data.localId,
            data.header
        );
        headerCheckHandler.init?.();

        postMessage({
            type: "HEADER_UPDATE",
            data: updatedHeader,
            id: message.id,
        });
    },
    HEADER_CREATE: async (message, postMessage) => {
        const data = message.data as IHeader;

        const missingFields = postBodyValidator(data, [
            "name",
            "projectLocalId",
            "method",
            "url",
        ]);

        if (missingFields.length > 0) {
            return postMessage({
                type: "HEADER_CREATE",
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

        const header = await headersDb.createHeader(data);

        headerCheckHandler.init?.();

        postMessage({
            type: "HEADER_CREATE",
            data: header,
            id: message.id,
        });
    },
    HEADER_DELETE: async (message, postMessage) => {
        const { localId } = message.data as { localId: number };

        await headersDb.deleteHeaderByLocalId(localId);

        postMessage({
            type: "HEADER_DELETE",
            data: { success: true },
            id: message.id,
        });
    },
};
