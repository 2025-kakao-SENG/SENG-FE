import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    UpdateUserPasswordApiResponse,
    UpdateUserPasswordRequest,
} from '@/types/apis/user/updateUserPasswordApiTypes';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const userPasswordApi = createApi({
    reducerPath: 'userPasswordApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
    }),
    endpoints: builder => ({
        updateUserPassword: builder.mutation<
            UpdateUserPasswordApiResponse,
            UpdateUserPasswordRequest
        >({
            query: request => ({
                url: '/update_pw.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    id: request.id,
                    old_password: request.old_password,
                    new_password: request.new_password,
                },
            }),
        }),
    }),
});

export const {useUpdateUserPasswordMutation} = userPasswordApi;
