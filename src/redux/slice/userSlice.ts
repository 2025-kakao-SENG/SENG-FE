import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserSliceState {
    isLogined: boolean;
    pid: string | null;
    kakaoPid: string | null;
    name: string;
    thumbnailImage: string | null;
    profileImage: string | null;
    birth: string | null;
    phone: string | null;
    address: string | null;
    email: string | null;
    leaf: number;
}

const initialState = {
    isLogined: false,
    pid: null as string | null, // 사용자 ID
    kakaoPid: null as string | null, // 카카오 사용자 ID
    name: null as string | null, // 사용자 이름
    thumbnailImage: null as string | null, // 썸네일 이미지 URL
    profileImage: null as string | null, // 프로필 이미지 URL
    birth: null as string | null, // 생년월일 (형식: YYYY-MM-DD)
    phone: null as string | null, // 전화번호
    address: null as string | null, // 주소
    email: null as string | null, // 이메일
    leaf: 0, // 리프(가상 재화) 수량
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfoByLogin: (state, action: PayloadAction<UserSliceState>) => ({
            ...state,
            isLogined: action.payload.isLogined,
            pid: action.payload.pid,
            kakaoPid: action.payload.kakaoPid,
            name: action.payload.name,
            thumbnail_image: action.payload.thumbnailImage,
            profile_image: action.payload.profileImage,
            birth: action.payload.birth,
            phone: action.payload.phone,
            address: action.payload.address,
            email: action.payload.email,
            leaf: action.payload.leaf,
        }),
        setUserLeaf: (state, action: PayloadAction<number>) => ({
            ...state,
            leaf: action.payload,
        }),
        resetUserInfo: () => initialState,
    },
});

// Action creator
export const {setUserInfoByLogin, setUserLeaf, resetUserInfo} =
    userSlice.actions;
