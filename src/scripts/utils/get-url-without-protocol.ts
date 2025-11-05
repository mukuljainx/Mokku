export const getUrlWithoutProtocol = (url: string): string => {
    return url.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, "");
};
