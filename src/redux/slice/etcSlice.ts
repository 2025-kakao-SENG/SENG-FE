import {createSlice} from '@reduxjs/toolkit';

interface State {
    settingCloseSignal: boolean;
    loginCloseSignal: boolean;
}

export const ectInitialState: State = {
    settingCloseSignal: false,
    loginCloseSignal: false,
};

export const etcSlice = createSlice({
    name: 'etc',
    initialState: ectInitialState,
    reducers: {
        setSettingClose: state => ({
            ...state,
            settingCloseSignal: !state.settingCloseSignal,
        }),
        setLoginClose: state => ({
            ...state,
            loginCloseSignal: !state.loginCloseSignal,
        }),
        resetEtcSlice: () => ectInitialState,
    },
});

// Action creator
export const {setSettingClose, setLoginClose, resetEtcSlice} = etcSlice.actions;
