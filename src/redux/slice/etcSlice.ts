import {createSlice} from '@reduxjs/toolkit';

interface State {
    settingCloseSignal: boolean;
    loginCloseSignal: boolean;
    logoutCloseSignal: boolean;
}

export const ectInitialState: State = {
    settingCloseSignal: false,
    loginCloseSignal: false,
    logoutCloseSignal: false,
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
        setLogoutClose: state => ({
            ...state,
            logoutCloseSignal: !state.logoutCloseSignal,
        }),
        resetEtcSlice: () => ectInitialState,
    },
});

// Action creator
export const {setSettingClose, setLoginClose, setLogoutClose, resetEtcSlice} =
    etcSlice.actions;
