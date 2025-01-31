// src/types/apis/book/searchBookApiTypes.ts

/**
 * 단일 책 조회 요청 타입
 */
export interface SearchBookApiRequest {
    pid: number; // 조회할 책의 고유 ID
}

/**
 * 단일 책 정보 데이터 (books 테이블의 구조에 맞게 정의)
 */
export interface SearchBookData {
    pid: number;
    title: string;
    outline: string;
    content: string;
    category: string;
    created_at: string;
    chapterTitle: string;
    subChapters: string;
    generated_date: string;
    status: number; // 0=임시, 1=발행 등
    user_pid: number;
}

/**
 * 단일 책 조회 성공 시 응답
 */
export interface SearchBookApiSuccessResponse {
    status: 'success';
    data: SearchBookData;
}

/**
 * 단일 책 조회 실패 시 응답
 */
export interface SearchBookApiErrorResponse {
    status: 'error';
    message: string; // 에러 사유 (예: "존재하지 않는 pid입니다." 등)
}

/**
 * 단일 책 조회 API의 최종 응답 형태 (성공 or 실패)
 */
export type SearchBookApiResponse =
    | SearchBookApiSuccessResponse
    | SearchBookApiErrorResponse;
