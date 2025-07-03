export interface ContentToInjectMessage {
    type: "MOKKU_MOCK_RESPONSE";
    payload?: {
        response: any;
        isFunction?: boolean; // To indicate if the response is a function body
    };
    error?: string;
}
