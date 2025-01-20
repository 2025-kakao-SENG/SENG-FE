import {useLazyFetchSubCategoriesQuery} from '@/redux/apiSlice/categoreisApiSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {
    SubCategoryApiRequest,
    SubCategoryApiResponse,
} from '@/types/category/subCategoriesTypes';

const useFetchSubCategoriesApi = () => {
    const [lazyFetchSubCategoriesQuery, {isLoading}] =
        useLazyFetchSubCategoriesQuery();

    const fetchSubCategoriesApi = async (
        request: SubCategoryApiRequest,
    ): Promise<SubCategoryApiResponse> => {
        const {category} = request;

        if (!category) {
            throw new Error('카테고리 이름은 필수입니다.');
        }

        try {
            const response =
                await lazyFetchSubCategoriesQuery(request).unwrap();

            if (!response) {
                throw new Error('데이터를 불러오지 못했습니다.');
            }

            return response;
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'status' in err) {
                const fetchError = err as FetchBaseQueryError;
                switch (fetchError.status) {
                    case 400:
                        throw new Error('잘못된 요청입니다.');
                    case 401:
                        throw new Error('인증되지 않은 요청입니다.');
                    case 403:
                        throw new Error('접근 권한이 없습니다.');
                    case 404:
                        throw new Error('요청한 데이터를 찾을 수 없습니다.');
                    case 500:
                        throw new Error('서버 내부 오류입니다.');
                    default:
                        throw new Error('알 수 없는 오류가 발생했습니다.');
                }
            } else if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(
                    '데이터 요청 중 알 수 없는 타입의 오류가 발생했습니다.',
                );
            }
        }
    };

    return {fetchSubCategoriesApi, isLoading};
};

export default useFetchSubCategoriesApi;
