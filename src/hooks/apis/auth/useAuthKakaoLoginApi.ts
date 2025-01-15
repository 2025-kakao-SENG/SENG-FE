import {useAuthKakaoLoginApiMutation} from '@/redux/apiSlice/authApiSlice';
import {
    AuthKakaoLoginApiRequest,
    AuthKakaoLoginApiResponse,
} from '@/types/auth/kakaoLoginApiTypes';

function useAuthKaKaoLoginApi() {
    const [authKakaoLoginApimutation, {isLoading}] =
        useAuthKakaoLoginApiMutation();

    const authKakaoLoginApi = async (): Promise<AuthKakaoLoginApiResponse> => {
        const KAKAO_API_KEY: string = import.meta.env.VITE_KAKAO_JS_KEY;

        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KAKAO_API_KEY);
            // console.log(window.Kakao.isInitialized());
        }

        return new Promise<AuthKakaoLoginApiResponse>((resolve, reject) => {
            window.Kakao.Auth.login({
                success: () => {
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        success: async response => {
                            const request: AuthKakaoLoginApiRequest = {
                                id: response.id,
                                properties: {
                                    nickname: response.properties.nickname,
                                    profile_image:
                                        response.properties.profile_image,
                                    thumbnail_image:
                                        response.properties.thumbnail_image,
                                },
                            };

                            try {
                                const serverResponse: AuthKakaoLoginApiResponse =
                                    await authKakaoLoginApimutation(
                                        request,
                                    ).unwrap();

                                resolve({
                                    ...serverResponse,
                                    ...(serverResponse.status === 'success' && {
                                        data: {
                                            ...serverResponse.data,
                                            kakaoPid: response.id,
                                        },
                                    }),
                                });
                            } catch {
                                reject(
                                    new Error('카카오 유저정보 서버 전송 실패'),
                                );
                            }
                        },
                        fail: () => {
                            reject(
                                new Error(
                                    '카카오 로그인 유저 정보 불러오기 실패',
                                ),
                            );
                        },
                    });
                },
                fail: () => {
                    reject(new Error('카카오 로그인 실패'));
                },
            });
        });
    };

    return {authKakaoLoginApi, isLoading};
}

export default useAuthKaKaoLoginApi;
