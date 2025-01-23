import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const SERVER_URL = 'http://185.170.198.89';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        mode: 'cors',
    }),
    endpoints: builder => ({
        updateUserName: builder.mutation<
            {id: number; name: string},
            {id: number; name: string}
        >({
            query: request => ({
                url: '/update_name.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id: request.id.toString(),
                    name: request.name,
                }),
            }),
        }),
    }),
});

export const {useUpdateUserNameMutation} = userApi;
