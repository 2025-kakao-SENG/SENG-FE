// src/types/apis/leaf/chargeLeafApiTypes.ts

/**
 * 리프 충전 요청 타입
 */
export interface ChargeLeafApiRequest {
    id: number; // 사용자 고유 ID
    leaf: number; // 충전할 리프 양
}

/**
 * 리프 충전 성공 시 반환되는 사용자 정보
 * (DB users 테이블에서 리프 업데이트 후 반환되는 모든 필드)
 */
export interface ChargeLeafApiSuccessResponse {
    id: number;
    username: string;
    leaf: number;
    email: string;
}

/**
 * 리프 충전 실패 시 에러 응답 구조
 */
export interface ChargeLeafApiErrorResponse {
    error: string; // 에러 메시지
}

/**
 * 리프 충전 API 최종 응답 타입 (성공 or 실패)
 */
export type ChargeLeafApiResponse =
    | ChargeLeafApiSuccessResponse
    | ChargeLeafApiErrorResponse;
