import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {
    SearchBooksApiRequest,
    SearchBooksApiResponse,
} from '@/types/apis/library/searchBooksApiTypes';
import {
    SearchBookApiRequest,
    SearchBookApiResponse,
} from '@/types/apis/library/searchBookApiTypes';
import {
    DeleteBookApiRequest,
    DeleteBookApiResponse,
} from '@/types/apis/library/deleteBookApiTypes';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const libraryApiSlice = createApi({
    reducerPath: 'libraryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        credentials: 'include',
    }),
    endpoints: builder => ({
        searchBooks: builder.mutation<
            SearchBooksApiResponse,
            SearchBooksApiRequest
        >({
            query: (request: SearchBooksApiRequest) => ({
                url: '/library_search.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    user_pid: request.user_pid.toString(),
                }).toString(),
            }),
        }),
        searchBook: builder.mutation<
            SearchBookApiResponse,
            SearchBookApiRequest
        >({
            query: (request: SearchBookApiRequest) => ({
                url: '/book_reload.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    pid: request.pid,
                },
            }),
        }),
        deleteBook: builder.mutation<
            DeleteBookApiResponse,
            DeleteBookApiRequest
        >({
            query: (request: DeleteBookApiRequest) => ({
                url: `/library_delete.php`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    pid: request.pid.toString(),
                }).toString(),
                responseHandler: response => response.text(),
            }),
        }),
    }),
});

export const {
    useSearchBooksMutation,
    useSearchBookMutation,
    useDeleteBookMutation,
} = libraryApiSlice;
