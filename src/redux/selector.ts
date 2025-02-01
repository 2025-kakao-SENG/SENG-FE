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

export const getCreateContentPid = (state: RootState) =>
    state.createContent.pid;

export const getCreateContentSignal = (state: RootState) => {
    return state.createContent.createContentSignal;
};

export const getDisplayBookPid = (state: RootState) => state.displayBook.pid;
export const getDisplayBookSignal = (state: RootState) => {
    return state.displayBook.displayBookSignal;
};

export const selectorTest: string = 'selectorTest';
