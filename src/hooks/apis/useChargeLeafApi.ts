// src/hooks/useChargeLeafApi.ts

import {useChargeLeafMutation} from '@/redux/apiSlice/leafApiSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {
    ChargeLeafApiRequest,
    ChargeLeafApiResponse,
} from '@/types/apis/chargeLeafApiTypes';

const useChargeLeafApi = () => {
    const [chargeLeafMutation, {isLoading}] = useChargeLeafMutation();

    const chargeLeafApi = async (
        request: ChargeLeafApiRequest,
    ): Promise<ChargeLeafApiResponse> => {
        const {id, leaf} = request;

        // 간단한 유효성 검사
        if (!id || id <= 0) {
            throw new Error('유효한 사용자 ID(id)가 필요합니다.');
        }
        if (!leaf || leaf < 0) {
            throw new Error('충전할 리프 양(leaf)은 0 이상의 숫자여야 합니다.');
        }

        try {
            // unwrap() 사용으로 실제 응답 데이터 획득
            const response: ChargeLeafApiResponse =
                await chargeLeafMutation(request).unwrap();
            return response;
        } catch (error: unknown) {
            // RTK Query에서 발생한 에러
            if (error && typeof error === 'object' && 'status' in error) {
                const fetchError = error as FetchBaseQueryError;
                switch (fetchError.status) {
                    case 400:
                        throw new Error('잘못된 요청입니다. (400)');
                    case 401:
                        throw new Error('인증이 필요합니다. (401)');
                    case 403:
                        throw new Error('접근 권한이 없습니다. (403)');
                    case 404:
                        throw new Error(
                            '해당 사용자를 찾을 수 없습니다. (404)',
                        );
                    case 500:
                        throw new Error('서버 내부 오류가 발생했습니다. (500)');
                    default:
                        throw new Error('알 수 없는 오류가 발생했습니다.');
                }
            } else if (error instanceof Error) {
                // 일반 JS 에러
                throw new Error(error.message);
            } else {
                // 예상치 못한 타입
                throw new Error('리프 충전 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return {chargeLeafApi, isLoading};
};

export default useChargeLeafApi;
