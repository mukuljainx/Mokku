const getOriginUrl = () => "http://localhost:5173";

const getNewMockUrl = (projectId = "local") =>
    `${getOriginUrl()}/projects/${projectId}/mocks/add-mock?source=MOKKU`;

const getQueryUrl = () => getOriginUrl() + "/*";

const getProjectsUrl = () => getOriginUrl() + "/projects?source=MOKKU";

export const urlConstants = {
    getOriginUrl,
    getNewMockUrl,
    getQueryUrl,
    getProjectsUrl,
};
