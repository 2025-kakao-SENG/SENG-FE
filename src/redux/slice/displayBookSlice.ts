import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface State {
    pid: number | null;
    displayBookSignal: boolean;
}

export const displayBookInitialState: State = {
    pid: null,
    displayBookSignal: false,
};

export const displayBookSlice = createSlice({
    name: 'user',
    initialState: displayBookInitialState,
    reducers: {
        setDisplayBookInfo: (state, action: PayloadAction<number>) => ({
            ...state,
            pid: action.payload,
            displayBookSignal: !state.displayBookSignal,
        }),
        resetDisplayBookInfo: () => displayBookInitialState,
    },
});

// Action creator
export const {setDisplayBookInfo, resetDisplayBookInfo} =
    displayBookSlice.actions;
