import {useSearchBooksMutation} from '@/redux/apiSlice/libraryApiSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {
    SearchBooksApiRequest,
    SearchBooksApiResponse,
} from '@/types/apis/library/searchBooksApiTypes';

const useSearchBooksApi = () => {
    const [searchBooksMutation, {isLoading}] = useSearchBooksMutation();

    const searchBooksApi = async (
        request: SearchBooksApiRequest,
    ): Promise<SearchBooksApiResponse> => {
        const {user_pid: userPid} = request;

        // user_pid 유효성 검사
        if (!userPid || userPid <= 0) {
            throw new Error('유효한 user_pid가 필요합니다.');
        }

        try {
            const response: SearchBooksApiResponse =
                await searchBooksMutation(request).unwrap();

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
                // 일반적인 JS 에러
                throw new Error(error.message);
            } else {
                // 예상치 못한 타입
                throw new Error(
                    '책 검색 중 알 수 없는 타입의 오류가 발생했습니다.',
                );
            }
        }
    };

    return {searchBooksApi, isLoading};
};

export default useSearchBooksApi;
