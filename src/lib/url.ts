const getOriginUrl = () => "http://localhost:5173";

const getNewMockUrl = (projectId?: string) =>
    getOriginUrl() +
    (projectId ? `/${projectId}` : "") +
    "/create-mock?source=MOKKU";

const getQueryUrl = () => getOriginUrl() + "/*";

export const urlConstants = {
    getOriginUrl,
    getNewMockUrl,
    getQueryUrl,
};
