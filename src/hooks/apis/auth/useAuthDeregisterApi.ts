import {useAuthDeregisterApiMutation} from '@/redux/apiSlice/authApiSlice';
import {
    AuthDeregisterApiRequest,
    AuthDeregisterApiResponse,
} from '@/types/auth/deregisterApiTypes';

const useAuthDeregisterApi = () => {
    const [authDeregisterApiMutation, {isLoading}] =
        useAuthDeregisterApiMutation();

    const authDeregisterApi = async (
        request: AuthDeregisterApiRequest,
    ): Promise<AuthDeregisterApiResponse> => {
        const {pid, kakaoPid} = request;

        if ((!pid && !kakaoPid) || (pid && kakaoPid)) {
            throw new Error('pid 또는 kakaoPid 둘 중 하나만 존재해야 합니다.');
        }
        try {
            const response: AuthDeregisterApiResponse =
                await authDeregisterApiMutation(request).unwrap();
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

    return {authDeregisterApi, isLoading};
};

export default useAuthDeregisterApi;
