// 요청 타입
export interface AuthLoginApiRequest {
    email: string; // 사용자 이메일
    password: string; // 사용자 비밀번호
}

// 성공 응답에서 사용자 데이터 타입
export interface AuthLoginUserData {
    pid: string; // 사용자 고유 ID
    name: string; // 사용자 이름
    thumbnailImage: string | null; // 썸네일 이미지 URL (없으면 null)
    profileImage: string | null; // 프로필 이미지 URL (없으면 null)
    birth: string; // 생년월일 (형식: YYYY-MM-DD)
    phone: string; // 전화번호
    address: string; // 주소
    email: string; // 이메일
    leaf: number; // 리프(가상 재화) 수량
}

// 성공 응답 타입
export interface AuthLoginApiSuccessResponse {
    status: 'success'; // 요청 처리 상태 (항상 'success')
    message: string; // 처리 결과 메시지
    data: AuthLoginUserData; // 사용자 정보
}

// 실패 응답 타입
export interface AuthLoginApiErrorResponse {
    status: 'error'; // 요청 처리 상태 (항상 'error')
    message: string; // 에러 메시지
}

// 통합 응답 타입 (성공 또는 실패)
export type AuthLoginApiResponse =
    | AuthLoginApiSuccessResponse // 성공 응답
    | AuthLoginApiErrorResponse; // 실패 응답
