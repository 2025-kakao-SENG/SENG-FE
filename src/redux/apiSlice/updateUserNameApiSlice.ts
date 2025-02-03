import {
    UpdateUserNameApiRequest,
    UpdateUserNameApiResponse,
} from '@/types/apis/user/updateUserNameApiTypes';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
    }),
    endpoints: builder => ({
        updateUserName: builder.mutation<
            UpdateUserNameApiRequest,
            UpdateUserNameApiResponse
        >({
            query: (request: UpdateUserNameApiRequest) => ({
                url: '/update_name.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    id: request.id,
                    name: request.name,
                },
            }),
        }),
    }),
});

export const {useUpdateUserNameMutation} = userApi;
