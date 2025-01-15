import {resetUserInfo} from '@/redux/slice/userSlice';
import {useDispatch} from 'react-redux';

function useLogout() {
    const dispatch = useDispatch();

    const logout = (kind: string) => {
        if (kind === 'kakao') {
            // 카카오 쿠키 제거 (예정)
        }

        dispatch(resetUserInfo());
    };

    return logout;
}

export default useLogout;
