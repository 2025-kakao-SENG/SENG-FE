import {useAuthRegisterApiMutation} from '@/redux/apiSlice/authApiSlice';
import {
    AuthRegisterApiRequest,
    AuthRegisterApiResponse,
} from '@/types/auth/registerApiTypes';

const useAuthRegisterApi = () => {
    const [authRegisterApiMutaion, {isLoading}] = useAuthRegisterApiMutation();

    const authRegisterApi = async (
        request: AuthRegisterApiRequest,
    ): Promise<AuthRegisterApiResponse> => {
        const {name, email, password, birth, phone, address} = request;

        if (!name || !email || !password || !birth || !phone || !address) {
            throw new Error('모든 회원가입 정보는 필수입니다.');
        }

        try {
            const response: AuthRegisterApiResponse =
                await authRegisterApiMutaion(request).unwrap();
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(
                    '로그인 중 알 수 없는 타입의 오류 발생했습니다.',
                );
            }
        }
    };
    return {authRegisterApi, isLoading};
};

export default useAuthRegisterApi;
