export interface BookContentApiRequest {
    pid: number; // 책 ID (books 테이블의 PK)
}

export interface BookContentData {
    pid: number; // 요청한 책의 ID
    chapterIndex: number; // 다음에 사용할 챕터 인덱스 (업데이트된 값)
    subChapterIndex: number; // 다음에 사용할 서브챕터 인덱스
    generatedContent: string; // 새로 생성된 본문 (HTML 형태)
}

export interface BookContentCompletedResponse {
    success: boolean; // 요청 처리 상태 (항상 true)
    message: string;
}

export interface BookContentSuccessResponse {
    success: true; // 요청 처리 상태 (항상 true)
    data: BookContentData; // 생성된 콘텐츠 정보
}

export interface BookContentErrorResponse {
    success: false; // 요청 처리 상태 (항상 false)
    error: string; // 에러 메시지
    raw_response?: string; // (선택) GPT 또는 기타 처리 단계에서 발생한 원본 응답
}

export type BookContentApiResponse =
    | BookContentSuccessResponse // 정상적으로 콘텐츠가 생성된 경우
    | BookContentCompletedResponse // 모든 챕터가 이미 생성된 경우
    | BookContentErrorResponse; // 실패한 경우
