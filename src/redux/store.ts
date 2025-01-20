import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import {userSlice} from './slice/userSlice';
import {authApi} from './apiSlice/authApiSlice';
import {categoriesApi} from './apiSlice/categoreisApiSlice';

const persistConfig = {
    key: 'login',
    storage: sessionStorage,
    whiteList: ['user'],
};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서 Redux DevTools 활성화
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([authApi.middleware, categoriesApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
