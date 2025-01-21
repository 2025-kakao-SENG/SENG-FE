// 서브 카테고리 타입
export interface SubCategory {
    subcategory_id: number; // 서브 카테고리 고유 ID
    subcategory_name: string; // 서브 카테고리 이름
}

// 카테고리 타입
export interface Category {
    category_id: number; // 큰 카테고리 고유 ID
    category_name: string; // 큰 카테고리 이름
    subcategories: SubCategory[]; // 서브 카테고리 배열
}

// 성공 응답 타입
export type CategoriesApiSuccessResponse = Category[];

// 실패 응답 타입
export interface CategoriesApiErrorResponse {
    error: string; // 에러 메시지
}

// 통합 응답 타입 (성공 또는 실패)
export type CategoriesApiResponse =
    | CategoriesApiSuccessResponse // 성공 응답
    | CategoriesApiErrorResponse; // 실패 응답
