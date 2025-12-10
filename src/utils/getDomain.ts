/**
 * case:
 * http://
 * https://
 * then till next /
 */
export const getDomain = (url: string) => {
    if (!url) {
        return "";
    }
    let domain = url;
    domain = domain.replace("https://", "");
    domain = domain.replace("http://", "");
    domain = domain.replace("https://", "");
    domain = domain.replace("http://", "");
    const domainLastIndex = domain.indexOf("/");
    if (domainLastIndex !== -1) {
        domain = domain.substr(0, domainLastIndex);
    }
    return domain;
};
