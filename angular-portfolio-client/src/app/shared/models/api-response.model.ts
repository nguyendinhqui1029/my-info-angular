export interface ApiResponse<T> {
    statusCode: number;
    statusText: string;
    data: T | null;
}

export interface ApiResponseWithPagination<T> {
    statusCode: number;
    statusText: string;
    totalCount: number;
    page: number;
    data: T | null;
}

export interface ResponseSuccessValue {
    statusCode: number;
    statusText: string;
}

export interface ResponseErrorValue {
    message: string;
    translateKey: string;
}