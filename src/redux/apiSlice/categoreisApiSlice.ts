import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CategoriesApiResponse} from '@/types/category/categoriesTypes';
import {
    SubCategoryApiResponse,
    SubCategoryApiRequest,
} from '@/types/category/subCategoriesTypes';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`,
        credentials: 'include',
    }),
    endpoints: builder => ({
        fetchCategories: builder.query<CategoriesApiResponse, void>({
            query: () => ({
                url: '/categories.php',
                method: 'GET',
            }),
            keepUnusedDataFor: 999999,
        }),
        fetchSubCategories: builder.query<
            SubCategoryApiResponse,
            SubCategoryApiRequest
        >({
            query: (params: SubCategoryApiRequest) => ({
                url: '/gpt_categories.php',
                method: 'GET',
                params, // Query parameters (e.g., { category: "중국요리" })
            }),
        }),
    }),
});

export const {useLazyFetchCategoriesQuery, useLazyFetchSubCategoriesQuery} =
    categoriesApi;
