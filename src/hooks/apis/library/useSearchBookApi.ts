// src/hooks/useSearchBookApi.ts

import {useSearchBookMutation} from '@/redux/apiSlice/libraryApiSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {
    SearchBookApiRequest,
    SearchBookApiResponse,
} from '@/types/apis/library/searchBookApiTypes';

const useSearchBookApi = () => {
    const [searchBookMutation, {isLoading}] = useSearchBookMutation();

    const searchBookApi = async (
        request: SearchBookApiRequest,
    ): Promise<SearchBookApiResponse> => {
        const {pid} = request;

        // pid 유효성 검사
        if (!pid || pid <= 0) {
            throw new Error(
                '필수 파라미터 pid가 누락되었거나 유효하지 않습니다.',
            );
        }

        try {
            // RTK Query의 unwrap()을 통해 실제 응답 데이터 획득
            const response: SearchBookApiResponse =
                await searchBookMutation(request).unwrap();
            return response;
        } catch (error: unknown) {
            // RTK Query 에러인 경우
            if (error && typeof error === 'object' && 'status' in error) {
                const fetchError = error as FetchBaseQueryError;
                switch (fetchError.status) {
                    case 400:
                        throw new Error('잘못된 요청입니다.(400)');
                    case 401:
                        throw new Error('인증 정보가 잘못되었습니다.(401)');
                    case 403:
                        throw new Error('접근 권한이 없습니다.(403)');
                    case 404:
                        throw new Error('요청한 자원을 찾을 수 없습니다.(404)');
                    case 500:
                        throw new Error('서버 내부 오류가 발생했습니다.(500)');
                    default:
                        throw new Error('알 수 없는 오류가 발생했습니다.');
                }
            } else if (error instanceof Error) {
                // 일반 JavaScript Error 객체
                throw new Error(error.message);
            } else {
                // 그 외 예상치 못한 에러
                throw new Error(
                    '책 정보 조회 중 알 수 없는 오류가 발생했습니다.',
                );
            }
        }
    };

    return {searchBookApi, isLoading};
};

export default useSearchBookApi;
