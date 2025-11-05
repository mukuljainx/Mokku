import { IHeader, IMock } from "@/types";
import { getUrlWithoutProtocol } from "./get-url-without-protocol";

export const updateEntityIfUrlIsDynamic = (
    entity: Partial<IHeader | IMock>
) => {
    if (entity.url) {
        // check if mock is dynamic url pattern
        const url = entity.url;

        // replace protocol with empty string for checking
        const urlWithoutProtocol = getUrlWithoutProtocol(url);

        // :// replace all with ""
        // eg. goal/redirect/http://example.com/*
        const urlSanitized = urlWithoutProtocol.replace(/:\/\//g, "");

        const isDynamicUrl =
            urlSanitized.includes("*") || urlSanitized.includes(":");

        entity.dynamic = isDynamicUrl ? true : false;
    }
};
