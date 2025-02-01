/**
 * 도서 삭제 요청 타입
 */
export interface DeleteBookApiRequest {
    pid: number; // 삭제할 책의 고유 ID
}

/**
 * 도서 삭제 성공 시 응답 타입
 */
export type DeleteBookApiSuccessResponse = string;

/**
 * 도서 삭제 실패 시 응답 타입
 */
export interface DeleteBookApiErrorResponse {
    status: 'error';
    message: string; // 예: "pid가 123인 책이 없거나, 삭제에 실패했습니다."
}

/**
 * 도서 삭제 API 최종 응답 타입 (성공/실패)
 */
export type DeleteBookApiResponse =
    | DeleteBookApiSuccessResponse
    | DeleteBookApiErrorResponse;
