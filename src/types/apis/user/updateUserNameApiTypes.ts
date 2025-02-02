export interface UpdateUserNameApiRequest {
    id: number;
    name: string;
}

export interface UpdateUserNameApiSuccess {
    id: number;
    name: string;
}

export interface UpdateUserNameApiError {
    error: string;
}

export type UpdateUserNameApiResponse =
    | UpdateUserNameApiSuccess
    | UpdateUserNameApiError;
