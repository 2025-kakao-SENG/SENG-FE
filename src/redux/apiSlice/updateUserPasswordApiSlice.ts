import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const SERVER_URL = 'http://185.170.198.89';

export const userPasswordApi = createApi({
    reducerPath: 'userPasswordApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        credentials: 'include',
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: builder => ({
        updateUserPassword: builder.mutation<
            {status: string; message?: string}, // 성공 응답 형태
            {id: number; old_password: string; new_password: string} // 요청 타입
        >({
            query: request => ({
                url: '/update_password.php',
                method: 'POST',
                body: JSON.stringify({
                    id: request.id,
                    old_password: request.old_password,
                    new_password: request.new_password,
                }),
            }),
        }),
    }),
});

export const {useUpdateUserPasswordMutation} = userPasswordApi;
