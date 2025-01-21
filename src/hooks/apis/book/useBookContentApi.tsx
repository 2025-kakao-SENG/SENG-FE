// src/hooks/useCreateContentApi.ts

import {useBookContentApiMutation} from '@/redux/apiSlice/bookApiSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {
    BookContentApiRequest,
    BookContentApiResponse,
} from '@/types/book/bookContentApiTypes';

const useBookContentApi = () => {
    const [bookContentApiMutation, {isLoading}] = useBookContentApiMutation();

    const bookContentApi = async (
        request: BookContentApiRequest,
    ): Promise<BookContentApiResponse> => {
        const {pid} = request;

        // pid 유효성 검사
        if (!pid || pid <= 0) {
            throw new Error('유효한 pid가 필요합니다.');
        }

        try {
            const response: BookContentApiResponse =
                await bookContentApiMutation(request).unwrap();

            return response;
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'status' in error) {
                const fetchError = error as FetchBaseQueryError;
                switch (fetchError.status) {
                    case 400:
                        throw new Error('잘못된 요청입니다.');
                    case 401:
                        throw new Error('인증 정보가 잘못되었습니다.');
                    case 403:
                        throw new Error('접근 권한이 없습니다.');
                    case 404:
                        throw new Error('요청한 자원을 찾을 수 없습니다.');
                    case 500:
                        throw new Error('서버 내부 오류입니다.');
                    default:
                        throw new Error('알 수 없는 오류가 발생했습니다.');
                }
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(
                    '콘텐츠 생성 중 알 수 없는 타입의 오류가 발생했습니다.',
                );
            }
        }
    };

    return {bookContentApi, isLoading};
};

export default useBookContentApi;
