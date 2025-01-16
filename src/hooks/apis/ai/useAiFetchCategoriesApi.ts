import {useFetchCategoriesQuery} from '@/redux/apiSlice/aiApiSlice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {CategoriesApiResponse} from '@/types/ai/categoriesTypes';

const useFetchCategories = () => {
    const {data, error, isLoading} = useFetchCategoriesQuery();

    const fetchCategories = async (): Promise<CategoriesApiResponse> => {
        if (isLoading) {
            throw new Error('데이터를 불러오는 중입니다. 잠시만 기다려주세요.');
        }

        if (error) {
            if (error && typeof error === 'object' && 'status' in error) {
                const fetchError = error as FetchBaseQueryError;
                switch (fetchError.status) {
                    case 400:
                        throw new Error('잘못된 요청입니다.');
                    case 401:
                        throw new Error('인증되지 않은 요청입니다.');
                    case 403:
                        throw new Error('접근 권한이 없습니다.');
                    case 404:
                        throw new Error('요청한 카테고리를 찾을 수 없습니다.');
                    case 500:
                        throw new Error('서버 내부 오류입니다.');
                    default:
                        throw new Error('알 수 없는 오류가 발생했습니다.');
                }
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('알 수 없는 타입의 오류가 발생했습니다.');
            }
        }

        if (!data) {
            throw new Error('카테고리 데이터를 불러오지 못했습니다.');
        }

        return data;
    };

    return {fetchCategories, isLoading};
};

export default useFetchCategories;
