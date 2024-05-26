export interface ApiResponse<T> {
    statusCode: number;
    statusText: string;
    data: T | null;
}

export interface ApiResponseWithPagination<T> {
    statusCode: number;
    statusText: string;
    data: {
        list: T[];
        totalItems: number;
        pageSize: number;
    };
}
