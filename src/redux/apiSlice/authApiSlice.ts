import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    AuthLoginApiRequest,
    AuthLoginApiResponse,
} from '@/types/apis/auth/loginApiTypes';
import {
    AuthRegisterApiResponse,
    AuthRegisterApiRequest,
} from '@/types/apis/auth/registerApiTypes';
import {
    AuthDeregisterApiResponse,
    AuthDeregisterApiRequest,
} from '@/types/apis/auth/deregisterApiTypes';
import {
    AuthKakaoLoginApiResponse,
    AuthKakaoLoginApiRequest,
} from '@/types/apis/auth/kakaoLoginApiTypes';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`,
    }),
    endpoints: builder => ({
        authLoginApi: builder.mutation<
            AuthLoginApiResponse,
            AuthLoginApiRequest
        >({
            query: (request: AuthLoginApiRequest) => ({
                url: '/login.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    email: request.email,
                    password: request.password,
                },
            }),
        }),
        authRegisterApi: builder.mutation<
            AuthRegisterApiResponse,
            AuthRegisterApiRequest
        >({
            query: (request: AuthRegisterApiRequest) => ({
                url: '/register.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    name: request.name,
                    email: request.email,
                    password: request.password,
                    birth: request.birth,
                    phone: request.phone,
                    address: request.address,
                },
            }),
        }),
        AuthKakaoLoginApi: builder.mutation<
            AuthKakaoLoginApiResponse,
            AuthKakaoLoginApiRequest
        >({
            query: (request: AuthKakaoLoginApiRequest) => ({
                url: `/kakao_login.php`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    id: request.id,
                    properties: request.properties,
                },
            }),
        }),
        authDeregisterApi: builder.mutation<
            AuthDeregisterApiResponse,
            AuthDeregisterApiRequest
        >({
            query: (request: AuthDeregisterApiRequest) => ({
                url: '/delete_user.php',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    ...(request.pid ? {pid: request.pid} : {}),
                    ...(request.kakaoPid ? {kakao_pid: request.kakaoPid} : {}),
                },
            }),
        }),
    }),
});

export const {
    useAuthLoginApiMutation,
    useAuthRegisterApiMutation,
    useAuthKakaoLoginApiMutation,
    useAuthDeregisterApiMutation,
} = authApi;
