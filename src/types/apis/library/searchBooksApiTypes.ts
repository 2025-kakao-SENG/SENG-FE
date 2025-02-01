// searchBooks API 요청 타입
export interface SearchBooksApiRequest {
    user_pid: number; // 사용자 고유 ID
}

// 서버에서 반환하는 단일 Book 레코드 타입 (테이블 필드 구조에 맞게 정의)
export interface BookInfo {
    pid: string;
    title: string;
    outline: string;
    content: string;
    category: string;
    created_at: string;
    chapterTitle: string;
    subChapters: string;
    generated_date: string;
    status: string;
    user_pid: string;
}

// 정상 응답 (success가 true일 때) 구조
export type SearchBooksSuccessResponse = BookInfo[]; // BookInfo 배열

// 에러 응답 (success가 false일 때) 구조
export interface SearchBooksErrorResponse {
    error: string; // 에러 메시지
}

// 최종적으로 API 응답은 다음 두 가지 중 하나
export type SearchBooksApiResponse =
    | SearchBooksSuccessResponse
    | SearchBooksErrorResponse;
