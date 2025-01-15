import {useAuthLoginApiMutation} from '@/redux/apiSlice/authApiSlice';
import {
    AuthLoginApiRequest,
    AuthLoginApiResponse,
} from '@/types/auth/loginApiTypes';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';

const useAuthLoginApi = () => {
    const [authLoginApiMutaion, {isLoading}] = useAuthLoginApiMutation();

    const authLoginApi = async (
        request: AuthLoginApiRequest,
    ): Promise<AuthLoginApiResponse> => {
        const {email, password} = request;

        if (!email || !password) {
            throw new Error(
                '유저 이메일, 유저 비밀번호 및 디바이스 정보는 필수입니다.',
            );
        }
        try {
            const response: AuthLoginApiResponse =
                await authLoginApiMutaion(request).unwrap();

            return response;
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'status' in error) {
                const fetchError = error as FetchBaseQueryError;
                switch (fetchError.status) {
                    case 400:
                        throw new Error('잘못된 요청입니다.');
                    case 401:
                        throw new Error('로그인 정보가 잘못되었습니다.');
                    case 403:
                        throw new Error('접근 권한이 없습니다.');
                    case 404:
                        throw new Error('요청한 자원을 찾을 수 없습니다.');
                    case 500:
                        throw new Error('서버 내부 오류입니다.');
                    default:
                        throw new Error('알 수 없는 오류 발생했습니다.');
                }
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(
                    '로그인 중 알 수 없는 타입의 오류 발생했습니다.',
                );
            }
        }
    };
    return {authLoginApi, isLoading};
};

export default useAuthLoginApi;
