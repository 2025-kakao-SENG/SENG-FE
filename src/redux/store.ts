import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import {userSlice} from './slice/userSlice';
import {authLoginApi} from './apiSlice/authApiSlice';

const persistConfig = {
    key: 'login',
    storage: sessionStorage,
    whiteList: ['user'],
};

const rootReducer = combineReducers({
    [authLoginApi.reducerPath]: authLoginApi.reducer,
    user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서 Redux DevTools 활성화
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([authLoginApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
