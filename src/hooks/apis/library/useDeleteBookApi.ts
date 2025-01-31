import {useDeleteBookMutation} from '@/redux/apiSlice/libraryApiSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {
    DeleteBookApiRequest,
    DeleteBookApiResponse,
} from '@/types/apis/library/deleteBookApiTypes';

const useDeleteBookApi = () => {
    const [deleteBookMutation, {isLoading}] = useDeleteBookMutation();

    const deleteBookApi = async (
        request: DeleteBookApiRequest,
    ): Promise<DeleteBookApiResponse> => {
        const {pid} = request;

        // 파라미터 유효성 검사
        if (!pid || pid <= 0) {
            throw new Error('유효한 pid가 필요합니다.');
        }

        try {
            // RTK Query의 unwrap()을 통해 실제 응답 데이터를 획득
            const response: DeleteBookApiResponse =
                await deleteBookMutation(request).unwrap();
            return response;
        } catch (error: unknown) {
            // RTK Query에서 발생한 에러인 경우
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
                // 예상치 못한 에러
                throw new Error('도서 삭제 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return {deleteBookApi, isLoading};
};

export default useDeleteBookApi;
