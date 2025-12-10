export const getBaseOrgRoute = () => {
    return `/organizations`;
};

export const getOrgRoute = (_: string = "") => {
    // return `/organizations/${orgSlug}`;
    return "";
};

export const getProjectRoute = (
    _org: string = "",
    projectSlug: string = "",
) => {
    // return `/organizations/${orgSlug}/projects/${projectSlug}`;
    return `/projects/${projectSlug}`;
};
