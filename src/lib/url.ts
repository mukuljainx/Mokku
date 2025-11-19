const getOriginUrl = () =>
    process.env.NODE_ENV === "production"
        ? "https://mokku.app"
        : "http://localhost:5173";
//   :"https://mokku.app";

const getNewMockUrl = (projectId = "local") =>
    `${getOriginUrl()}/projects/${projectId}/mocks/add-mock?source=MOKKU`;

const getMockDetailsUrl = (mockId?: number, projectId?: number) =>
    `${getOriginUrl()}/mock-details?source=MOKKU&localMockId=${mockId}&localProjectId=${projectId}&type=MOCK`;

const getHeaderDetailsUrl = (headerId?: number, projectId?: number) =>
    `${getOriginUrl()}/header-details?source=MOKKU&localHeaderId=${headerId}&localProjectId=${projectId}&type=HEADER`;

const getQueryUrl = () => getOriginUrl() + "/*";

const getProjectsUrl = () => getOriginUrl() + "/projects?source=MOKKU";

export const urlConstants = {
    getOriginUrl,
    getNewMockUrl,
    getQueryUrl,
    getProjectsUrl,
    getMockDetailsUrl,
    getHeaderDetailsUrl,
};
