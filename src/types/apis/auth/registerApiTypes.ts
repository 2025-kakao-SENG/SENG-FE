export interface AuthRegisterApiRequest {
    name: string; // 사용자 이름
    email: string; // 이메일
    password: string; // 비밀번호
    birth: string; // 생년월일 (YYYY-MM-DD 형식)
    phone: string; // 휴대폰 번호
    address: string; // 주소
}

export type AuthRegisterApiResponse =
    | AuthRegisterSuccessResponse // 성공 응답
    | AuthRegisterErrorResponse; // 에러 응답

export interface AuthRegisterSuccessResponse {
    status: 'success'; // 요청 처리 상태 (항상 'success')
    message: string; // 처리 결과 메시지
}

export interface AuthRegisterErrorResponse {
    status: 'error'; // 요청 처리 상태 (항상 'error')
    message: string; // 에러 메시지
}
