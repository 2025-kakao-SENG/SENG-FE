import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import {userSlice} from './slice/userSlice';
import {authApi} from './apiSlice/authApiSlice';
import {categoriesApi} from './apiSlice/categoreisApiSlice';
import {createBookSlice} from './slice/createBookSlice';
import {bookApi} from './apiSlice/bookApiSlice';
import {userApi} from './apiSlice/updateUserNameApiSlice';
import {userPasswordApi} from './apiSlice/updateUserPasswordApiSlice';
import {createContentSlice} from './slice/createContentSlice';

const persistConfig = {
    key: 'login',
    storage: sessionStorage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userPasswordApi.reducerPath]: userPasswordApi.reducer,
    user: userSlice.reducer,
    createBook: createBookSlice.reducer,
    createContent: createContentSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([
            authApi.middleware,
            categoriesApi.middleware,
            bookApi.middleware,
            userApi.middleware,
            userPasswordApi.middleware,
        ]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
