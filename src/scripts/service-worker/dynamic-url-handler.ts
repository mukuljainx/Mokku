import { IMethod } from "@/types";
import { getUrlWithoutProtocol } from "../utils/get-url-without-protocol";
import { match as getMatcher } from "path-to-regexp";

export interface DynamicUrlEntry {
    localId: number;
    urlPattern: string; // The URL pattern stored for dynamic matching
    match?: ReturnType<typeof getMatcher>;
    method: IMethod;
}

const emptyDynamicUrlPatternsMap = {
    POST: [],
    GET: [],
    PUT: [],
    DELETE: [],
    PATCH: [],
};

export class DynamicUrlHandler {
    constructor(
        private getDynamicUrlPatterns: () => Promise<DynamicUrlEntry[]>,
        private dynamicUrlPatternsMap: Record<IMethod, DynamicUrlEntry[]> = {
            ...emptyDynamicUrlPatternsMap,
        }
    ) {}

    public async init() {
        try {
            this.dynamicUrlPatternsMap = { ...emptyDynamicUrlPatternsMap };
            const dynamicUrlPatterns = await this.getDynamicUrlPatterns();
            console.log(
                "Mokku: Fetched dynamic URL patterns:",
                dynamicUrlPatterns
            );

            dynamicUrlPatterns.forEach((entry) => {
                const urlWithoutProtocol = getUrlWithoutProtocol(
                    entry.urlPattern
                );

                try {
                    const x = {
                        ...entry,
                        match: getMatcher(urlWithoutProtocol, {
                            decode: (s: string) => decodeURIComponent(s),
                        }),
                    };
                    this.dynamicUrlPatternsMap[x.method as IMethod].push(x);
                } catch (error) {
                    console.error(
                        "Mokku: Error creating matcher for pattern:",
                        entry.urlPattern,
                        error
                    );
                    return;
                }
            });

            console.log(
                "Mokku: Dynamic URL patterns loaded:",
                dynamicUrlPatterns.length
            );
        } catch (error) {
            console.error("Mokku: Error loading dynamic URL patterns:", error);
        }
    }

    private isDynamicDataEmpty() {
        return Object.values(this.dynamicUrlPatternsMap).every(
            (arr) => arr.length === 0
        );
    }

    public async findMatchingUrl(
        url: string,
        pathname: string,
        method: IMethod
    ): Promise<DynamicUrlEntry | undefined> {
        if (this.isDynamicDataEmpty()) {
            await this.init();
        }

        const urlWithoutProtocol = getUrlWithoutProtocol(url);
        return this.dynamicUrlPatternsMap[method].find((entry) => {
            return entry.match(urlWithoutProtocol) || entry.match(pathname);
        });
    }
}
