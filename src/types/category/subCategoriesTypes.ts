// 요청 타입
export interface SubCategoryApiRequest {
    category?: string; // 상위 카테고리 이름 (선택 사항, 기본값: "웹프로그래밍")
}

// 성공 응답 타입
export type SubCategoryApiSuccessResponse = string[];

// 실패 응답 타입
export interface SubCategoryApiCateErrorResponse {
    info: string; // 에러 정보
    originalContent?: string; // Sub 원본 응답 텍스트 (옵션)
}

export interface SubCategoryApiErrorResponse {
    error: string; // 에러 메시지
}

// 통합 응답 타입 (성공 또는 실패)
export type SubCategoryApiResponse =
    | SubCategoryApiSuccessResponse // 성공 응답
    | SubCategoryApiCateErrorResponse // cate 실패 응답
    | SubCategoryApiErrorResponse; // 실패 응답
