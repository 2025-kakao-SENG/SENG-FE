import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    BookHeadApiRequest,
    BookHeadApiResponse,
} from '@/types/apis/book/bookHeadApiTypes';
import {
    BookContentApiRequest,
    BookContentApiResponse,
} from '@/types/apis/book/bookContentApiTypes';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`,
    }),
    endpoints: builder => ({
        bookHeadApi: builder.mutation<BookHeadApiResponse, BookHeadApiRequest>({
            query: (request: BookHeadApiRequest) => {
                return {
                    url: '/create_book.php',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        user_pid: request.user_pid.toString(),
                        'category_arr[]': JSON.stringify(request.category_arr),
                    }).toString(),
                };
            },
        }),
        bookContentApi: builder.mutation<
            BookContentApiResponse,
            BookContentApiRequest
        >({
            query: (request: BookContentApiRequest) => {
                return {
                    url: '/create_content.php',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        pid: request.pid.toString(),
                    }).toString(),
                };
            },
        }),
    }),
});

export const {useBookHeadApiMutation, useBookContentApiMutation} = bookApi;
