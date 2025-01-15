export interface AuthKakaoLoginApiRequest {
    id: string; // 카카오 회원 고유 ID
    properties: KakaoUserProperties; // 사용자 속성 정보
}

// 사용자 속성 정보 타입
export interface KakaoUserProperties {
    nickname: string; // 사용자 이름
    profile_image: string; // 사용자 프로필 이미지 URL
    thumbnail_image: string; // 사용자 썸네일 이미지 URL
}

// 사용자 정보 타입
export interface KaKaoUserData {
    kakaoPid: string; // 카카오 사용자 ID
    name: string; // 사용자 이름
    thumbnailImage: string | null; // 썸네일 이미지 URL (없으면 null)
    profileImage: string | null; // 프로필 이미지 URL (없으면 null)
    birth: string | null; // 사용자 생년월일 (형식: YYYY-MM-DD, 없으면 null)
    phone: string | null; // 사용자 전화번호 (없으면 null)
    address: string | null; // 사용자 주소 (없으면 null)
    email: string | null; // 사용자 이메일 (없으면 null)
    leaf: number; // 사용자가 보유한 리프(가상 재화) 수량
}

// 성공 응답 타입
export interface AuthKakaoLoginApiSuccessResponse {
    status: 'success'; // 요청 처리 상태 (항상 'success')
    message: string; // 처리 결과 메시지
    data: KaKaoUserData; // 사용자 정보
}

// 실패 응답 타입
export interface AuthKakaoLoginApiErrorResponse {
    status: 'error'; // 요청 처리 상태 (항상 'error')
    message: string; // 에러 메시지
}

export type AuthKakaoLoginApiResponse =
    | AuthKakaoLoginApiSuccessResponse // 성공 응답
    | AuthKakaoLoginApiErrorResponse; // 실패 응답
