const getOriginUrl = () => "http://localhost:5173";

const getNewMockUrl = (projectId?: string) =>
    getOriginUrl() + (projectId ? `/${projectId}/create-mock` : "/create-mock");

const getQueryUrl = () => getOriginUrl() + "/*";

export const urlConstants = {
    getOriginUrl,
    getNewMockUrl,
    getQueryUrl,
};
