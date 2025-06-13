export interface Mock {
    id?: number;
    name: string;
    url: string; // Can be a URL string or a pattern for dynamic mocks
    dynamic: boolean;
    type: "STATIC" | "FUNCTION";
    response?: any; // For STATIC type
    // eslint-disable-next-line @typescript-eslint/ban-types
    function?: string; // String representation of the function for FUNCTION type
    mocked: boolean; // To enable/disable this specific mock
}

export interface ApiCallDetails {
    url: string;
    method: string;
    body?: any;
}

export interface InjectToContentMessage {
    type: "MOKKU_API_CALL";
    payload: ApiCallDetails;
}

export interface ContentToInjectMessage {
    type: "MOKKU_MOCK_RESPONSE";
    payload?: {
        response: any;
        isFunction?: boolean; // To indicate if the response is a function body
    };
    error?: string;
}
