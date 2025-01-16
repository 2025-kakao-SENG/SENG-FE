import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CategoriesApiResponse} from '@/types/ai/categoriesTypes';

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
        }),
    }),
});

export const {useFetchCategoriesQuery} = categoriesApi;
