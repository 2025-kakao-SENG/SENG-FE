import {createSlice} from '@reduxjs/toolkit';

interface State {
    settingCloseSignal: boolean;
}

export const ectInitialState: State = {
    settingCloseSignal: false,
};

export const etcSlice = createSlice({
    name: 'etc',
    initialState: ectInitialState,
    reducers: {
        setSettingClose: state => ({
            ...state,
            settingCloseSignal: !state.settingCloseSignal,
        }),
        resetEtcSlice: () => ectInitialState,
    },
});

// Action creator
export const {setSettingClose, resetEtcSlice} = etcSlice.actions;
