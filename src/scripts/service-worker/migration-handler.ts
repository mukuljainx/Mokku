import { oldDb } from "@/services/oldDb";
import { OperationHandlers } from "./type";
import { IMock, IMockResponse_Deprecated, IProject } from "@/types";
import { mocksDb, organizationsDb, projectsDb } from "@/services/db";
import { updateEntityIfUrlIsDynamic } from "../utils/update-entity-if-url-is-dynamic";

const getOldDbMock = async () => {
    try {
        const { store } = await oldDb.getStore();
        if (store.isMigrated) {
            return [];
        }
        return store.mocks;
    } catch (error) {
        return [];
    }
};

type MockCreatePayloadType = Omit<
    IMock,
    | "localId"
    | "projectLocalId"
    | "createdAt"
    | "updatedAt"
    | "id"
    | "projectId"
    | "syncStatus"
>;

const migrateMock = async (
    oldMocks: IMockResponse_Deprecated[],
    project: IProject
) => {
    console.log("Mokku SW: migrating mocks from old DB", oldMocks);
    const newMocks = oldMocks.map((mock, index) => {
        const headers = [];

        if (mock.headers) {
            for (const [name, value] of Object.entries(mock.headers)) {
                headers.push({ name, value });
            }
        }

        const newMock = {
            method: mock.method,
            url: mock.url,
            status: mock.status,
            response: mock.response,
            headers: headers,
            delay: mock.delay,
            active: mock.active,
            description: mock.description,
            dynamic: mock.dynamic,
            projectLocalId: project.localId,
            name: `Migrated mock: ${index + 1}`,
            requestType: "REST",
            responseType: "STATIC",
        } as MockCreatePayloadType;

        updateEntityIfUrlIsDynamic(newMock);

        return newMock;
    });

    await mocksDb.addMocks(newMocks as IMock[]);
};

const init = async () => {
    try {
        const [mocks, organization] = await Promise.all([
            getOldDbMock(),
            organizationsDb.getOrganizationBySlug("users-organization"),
        ]);

        if (!organization) {
            throw "No default org found";
        }

        if (mocks.length) {
            const project = await projectsDb.createProject({
                name: "Migrated Project",
                slug: "migrated-project",
                organizationLocalId: organization.localId,
            });
            await migrateMock(mocks, project);
            await oldDb.setIsMigrated();
        }
    } catch (error) {
        console.error("Unable to migrate mocks: ", error);
    }
};

export const migrationHandler: OperationHandlers = {
    init,
};
