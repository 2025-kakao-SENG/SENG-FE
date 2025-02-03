// src/redux/apiSlice/LeafApiSlice.ts

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    ChargeLeafApiRequest,
    ChargeLeafApiResponse,
} from '@/types/apis/chargeLeafApiTypes';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const LeafApiSlice = createApi({
    reducerPath: 'LeafApi', // 슬라이스 이름
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
    }),
    endpoints: builder => ({
        // chargeLeaf: leaf 충전 API
        chargeLeaf: builder.mutation<
            ChargeLeafApiResponse,
            ChargeLeafApiRequest
        >({
            query: (request: ChargeLeafApiRequest) => ({
                url: '/leaf_charge.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    id: request.id,
                    leaf: request.leaf,
                },
            }),
        }),
    }),
});

export const {useChargeLeafMutation} = LeafApiSlice;
