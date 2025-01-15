export interface AuthDeregisterApiRequest {
    pid?: number; // 일반 유저의 고유 ID (일반 회원 삭제 시 사용, 선택 필드)
    kakaoPid?: string; // 카카오 유저의 고유 ID (카카오 회원 삭제 시 사용, 선택 필드)
}
export interface AuthDeregisterSuccessResponse {
    status: 'success'; // 요청 처리 상태 (항상 'success')
    message: string; // 처리 결과 메시지
}
export interface AuthDeregisterErrorResponse {
    status: 'error'; // 요청 처리 상태 (항상 'error')
    message: string; // 에러 메시지 (상황에 따라 다른 메시지 제공)
}
export type AuthDeregisterApiResponse =
    | AuthDeregisterSuccessResponse // 성공 응답
    | AuthDeregisterErrorResponse; // 실패 응답
