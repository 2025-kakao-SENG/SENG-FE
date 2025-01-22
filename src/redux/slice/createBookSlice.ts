import {BookHeadApiRequest} from '@/types/apis/book/bookHeadApiTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState = {
    isCreating: false,
    userPid: 0,
    categoriesArr: [] as string[],
};

export const createBookSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCreateBookInfo: (
            state,
            action: PayloadAction<BookHeadApiRequest>,
        ) => ({
            ...state,
            isCreating: true,
            userPid: action.payload.user_pid,
            categoriesArr: action.payload.category_arr,
        }),
        resetCreateBookInfo: () => initialState,
    },
});

// Action creator
export const {setCreateBookInfo, resetCreateBookInfo} = createBookSlice.actions;
