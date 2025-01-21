// 요청 타입
export interface BookHeadApiRequest {
    user_pid: number; // 사용자 고유 ID
    category_arr: string[]; // 카테고리 배열
}

// 성공 응답에서 책 데이터 타입
export interface BookHeadData {
    pid: string; // 책 고유 ID
    title: string; // 책 제목
    outline: string; // 책 목차 (JSON 형식 문자열)
    content: string; // 책 내용 (현재 비어 있음)
    category: string; // 첫 번째 카테고리 이름
    chapterTitle: string; // 첫 번째 챕터 제목
    subChapters: string; // 첫 번째 챕터의 하위 목차
    status: string; // 책 상태
    user_pid: string; // 생성한 사용자 고유 ID
    created_at: string; // 생성 일시 (형식: YYYY-MM-DD HH:mm:ss)
    generated_date: string; // 생성된 날짜 (형식: YYYY-MM-DD HH:mm:ss)
}

// 성공 응답 타입
export interface BookHeadApiSuccessResponse {
    success: true; // 요청 처리 상태 (항상 true)
    data: BookHeadData; // 생성된 책 정보
}

// 실패 응답 타입
export interface BookHeadApiErrorResponse {
    success: false; // 요청 처리 상태 (항상 false)
    error: string; // 에러 메시지
    raw_response?: string; // (선택) GPT 또는 기타 처리 단계에서 발생한 원본 응답
}

// 통합 응답 타입 (성공 또는 실패)
export type BookHeadApiResponse =
    | BookHeadApiSuccessResponse // 성공 응답
    | BookHeadApiErrorResponse; // 실패 응답
