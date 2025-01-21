import {RootState} from './store';

export const getUserLoginData = (state: RootState) => state.user;
export const getUserId = (state: RootState) => {
    if (state.user.pid) {
        return state.user.pid;
    }
    return state.user.kakaoPid;
};
export const getLeafCount = (state: RootState) => state.user.leaf;

export const getBookCreatingData = (state: RootState) => state.createBook;

export const selectorTest: string = 'selectorTest';
