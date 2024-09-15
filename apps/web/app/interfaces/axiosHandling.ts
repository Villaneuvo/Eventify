export interface errorAxios extends Error {
    response: {
        data: {
            message: string;
        };
        status: number;
        headers: {
            "content-type": string;
        };
    };
    request: any;
    message: string;
    config: any;
}
