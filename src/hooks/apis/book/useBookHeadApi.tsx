import {useBookHeadApiMutation} from '@/redux/apiSlice/bookApiSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {
    BookHeadApiRequest,
    BookHeadApiResponse,
} from '@/types/book/bookHeadApiTypes';

const useBookHeadApi = () => {
    const [bookHeadApiMutation, {isLoading}] = useBookHeadApiMutation();

    const bookHeadApi = async (
        request: BookHeadApiRequest,
    ): Promise<BookHeadApiResponse> => {
        const {user_pid: userPid, category_arr: categoryArr} = request;

        if (!userPid || !categoryArr || categoryArr.length === 0) {
            throw new Error('사용자 ID와 최소 한 개의 카테고리는 필수입니다.');
        }

        try {
            const response: BookHeadApiResponse =
                await bookHeadApiMutation(request).unwrap();

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
                    '책 생성 중 알 수 없는 타입의 오류가 발생했습니다.',
                );
            }
        }
    };

    return {bookHeadApi, isLoading};
};

export default useBookHeadApi;
