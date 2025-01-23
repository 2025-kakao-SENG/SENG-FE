import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface State {
    pid: number;
    createContentSignal: boolean;
}

export const initialState: State = {
    pid: 0,
    createContentSignal: false,
};

export const createContentSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCreateContentPid: (state, action: PayloadAction<number>) => ({
            ...state,
            pid: action.payload,
        }),
        setCreateContentSignal: state => ({
            ...state,
            createContentSignal: !state.createContentSignal,
        }),
        resetCreateContentInfo: () => initialState,
    },
});

// Action creator
export const {
    setCreateContentPid,
    setCreateContentSignal,
    resetCreateContentInfo,
} = createContentSlice.actions;
