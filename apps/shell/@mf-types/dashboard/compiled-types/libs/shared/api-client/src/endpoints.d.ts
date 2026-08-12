export interface ApiEndpoints {
    auth: {
        login: string;
        logout: string;
        session: string;
    };
    dashboard: {
        home: string;
        summary: string;
        monthly: string;
    };
    profile: string;
    transactions: {
        list: string;
        detail: (transactionId: string) => string;
        attachments: (transactionId: string) => string;
    };
    categories: {
        list: string;
    };
    attachments: {
        detail: (attachmentId: string) => string;
    };
}
export declare const apiEndpoints: ApiEndpoints;
export declare const mockApiEndpoints: {
    auth: {
        login: string;
        logout: string;
        session: string;
    };
    dashboard: {
        home: string;
        summary: string;
        monthly: string;
    };
    profile: string;
    transactions: {
        list: string;
        detail: string;
        attachments: string;
    };
    categories: {
        list: string;
    };
    attachments: {
        detail: string;
    };
};
