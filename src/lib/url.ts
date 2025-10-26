const getOriginUrl = () => "http://localhost:5173";

const getNewMockUrl = (projectId = "local") =>
    `${getOriginUrl()}/projects/${projectId}/mocks/add-mock?source=MOKKU`;

const getMockDetailsUrl = (projectId?: number, mockId?: number) =>
    `${getOriginUrl()}/mock-details?source=MOKKU&localMockId=${mockId}&localProjectId=${projectId}`;

const getQueryUrl = () => getOriginUrl() + "/*";

const getProjectsUrl = () => getOriginUrl() + "/projects?source=MOKKU";

export const urlConstants = {
    getOriginUrl,
    getNewMockUrl,
    getQueryUrl,
    getProjectsUrl,
    getMockDetailsUrl,
};
