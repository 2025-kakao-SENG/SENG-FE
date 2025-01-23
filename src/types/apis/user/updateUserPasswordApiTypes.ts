export interface UpdateUserPasswordRequest {
    id: number; // 사용자 고유 ID
    old_password: string; // 현재 사용 중인 비밀번호 (검증용)
    new_password: string; // 바꿀 새로운 비밀번호
}

export interface UpdateUserPasswordSuccessResponse {
    status: 'success';
    data: {
        id: number;
        kakao_pid?: string; // 카카오 사용자 식별자 (선택적)
        name: string; // 사용자 이름
        thumbnail_image?: string; // 프로필 썸네일 이미지 경로 (선택적)
        profile_image?: string; // 프로필 이미지 경로 (선택적)
        birth?: string; // 생년월일 (YYYY-MM-DD)
        phone?: string; // 전화번호
        address?: string; // 주소
        email: string; // 이메일
        password?: string; // 해시된 비밀번호 (선택적)
        status: number; // 사용자 상태 (0: 일반, 1: 카카오 인증 등)
        leaf: number; // 가상 화폐(리프) 수량
        create_at: string; // 가입한 날짜 (타임스탬프)
        update_at: string; // 정보가 수정된 날짜 (타임스탬프)
    };
}

export interface UpdateUserPasswordErrorResponse {
    status: 'error';
    message:
        | '비밀번호가 틀렸습니다.'
        | '존재하지 않는 사용자입니다.'
        | '필수 파라미터가 누락되었습니다.'
        | '서버 오류가 발생했습니다. 관리자에게 문의하세요.';
}
