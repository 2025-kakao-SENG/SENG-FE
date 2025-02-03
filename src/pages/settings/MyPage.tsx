import {useEffect, useState} from 'react';
import {useUpdateUserNameMutation} from '@/redux/apiSlice/updateUserNameApiSlice';
import {useUpdateUserPasswordMutation} from '@/redux/apiSlice/updateUserPasswordApiSlice';
import {useSelector, useDispatch} from 'react-redux';
import {setUserInfoByLogin} from '@/redux/slice/userSlice';
import {useNavigate} from 'react-router-dom';
import {getUserId, getUserLoginData} from '@/redux/selector';
import useLogout from '@/hooks/useLogout';
import useAuthDeregisterApi from '@/hooks/apis/auth/useAuthDeregisterApi';
import {AuthDeregisterApiRequest} from '@/types/apis/auth/deregisterApiTypes';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {
    UpdateUserPasswordApiResponse,
    UpdateUserPasswordRequest,
} from '@/types/apis/user/updateUserPasswordApiTypes';
import {
    UpdateUserNameApiRequest,
    UpdateUserNameApiResponse,
} from '@/types/apis/user/updateUserNameApiTypes';
import {useTheme} from '@/constants/ThemeProvider';

function MyPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUserLoginData);
    const userId = useSelector(getUserId);
    const logout = useLogout();
    const userLoginDate = useSelector(getUserLoginData);
    const {authDeregisterApi} = useAuthDeregisterApi();
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const [isDeregisterLoading, setIsDeregisterLoading] = useState(false);
    const {isDarkMode} = useTheme();

    const [successModal, setSuccessModal] = useState('');
    const [errorMessageModal, setErrorMessage] = useState('');

    // 닉네임 변경
    const [nickname, setNickname] = useState(user.name || '');
    const [updateUserName, {isLoading: isUpdatingUserName}] =
        useUpdateUserNameMutation();

    // 비밀번호 변경
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateUserPassword, {isLoading: isUpdatingPassword}] =
        useUpdateUserPasswordMutation();

    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const [openDeregisterModal, setOpenDeregisterModal] = useState(false);

    useEffect(() => {
        if (!user.isLogined) {
            setErrorMessage('로그인이 필요합니다.');
        }
    }, [user]);

    const handleLogout = () => {
        if (userLoginDate.kakaoPid) {
            logout('kakao');
        } else if (userLoginDate.pid) {
            logout('default');
        }
        setTimeout(() => {
            navigate('/home');
        }, 2000);
    };

    const handleDeregister = async () => {
        const KAKAO_API_KEY: string = import.meta.env.VITE_KAKAO_JS_KEY;

        if (userLoginDate.kakaoPid) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(KAKAO_API_KEY);
            }

            const serverRequest: AuthDeregisterApiRequest = {
                kakaoPid: userLoginDate.kakaoPid,
            };
            try {
                const serverResponse = await authDeregisterApi(serverRequest);

                if (serverResponse.status === 'success') {
                    window.Kakao.API.request({
                        url: '/v1/user/unlink',
                    });

                    logout('kakao');
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                } else {
                    setErrorMessage(serverResponse.message);
                }
            } catch {
                setErrorMessage('회원 탈퇴 통신 에러 발생');
            }
        }
        // redux로 일반 회원 탈퇴
        else if (userLoginDate.pid) {
            const serverRequest: AuthDeregisterApiRequest = {
                pid: parseInt(userLoginDate.pid, 10),
            };

            try {
                const serverResponse = await authDeregisterApi(serverRequest);

                if (serverResponse.status === 'success') {
                    logout('default');
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                } else {
                    setErrorMessage(serverResponse.message);
                }
            } catch {
                setErrorMessage('회원 탈퇴 통신 에러 발생');
            }
        }
        // 로그인 만료됨, 다시 로그인
        else {
            setErrorMessage(
                '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
            );
            navigate('/auth/login');
        }
    };

    const handleUpdateNickname = async () => {
        if (!nickname.trim()) {
            setErrorMessage('닉네임을 입력하세요.');
            return;
        }

        if (nickname === user.name) {
            setErrorMessage('현재 닉네임과 같습니다.');
            return;
        }

        const request: UpdateUserNameApiRequest = {
            id: Number(userId),
            name: nickname,
        };

        try {
            const response: UpdateUserNameApiResponse =
                await updateUserName(request).unwrap();

            if (!('error' in response)) {
                dispatch(setUserInfoByLogin({...user, name: response.name}));
                setSuccessModal('닉네임이 변경되었습니다.');
            } else {
                setErrorMessage(String(response.error));
            }
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'status' in err) {
                const fetchError = err as FetchBaseQueryError;
                switch (fetchError.status) {
                    case 400:
                        setErrorMessage('잘못된 요청입니다.');
                        break;
                    case 401:
                        setErrorMessage('로그인 정보가 잘못되었습니다.');
                        break;
                    case 403:
                        setErrorMessage('접근 권한이 없습니다.');
                        break;
                    case 404:
                        setErrorMessage('요청한 자원을 찾을 수 없습니다.');
                        break;
                    case 500:
                        setErrorMessage('서버 내부 오류입니다.');
                        break;
                    default:
                        setErrorMessage('알 수 없는 오류 발생했습니다.');
                }
            } else if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage(
                    '로그인 중 알 수 없는 타입의 오류 발생했습니다.',
                );
            }
        }
    };

    const handleUpdatePassword = async () => {
        if (!oldPassword || !newPassword) {
            setErrorMessage('비밀번호를 입력하세요.');
            return;
        }

        if (oldPassword === newPassword) {
            setErrorMessage('현재 비밀번호와 새 비밀번호가 같습니다.');
            return;
        }

        const request: UpdateUserPasswordRequest = {
            id: Number(userId),
            old_password: oldPassword,
            new_password: newPassword,
        };

        try {
            const response: UpdateUserPasswordApiResponse =
                await updateUserPassword(request).unwrap();

            if (response.status === 'success') {
                setSuccessModal('비밀번호가 변경되었습니다.');
                setOldPassword('');
                setNewPassword('');
            } else {
                setErrorMessage(response.message);
            }
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'status' in err) {
                const fetchError = err as FetchBaseQueryError;
                switch (fetchError.status) {
                    case 400:
                        setErrorMessage('잘못된 요청입니다.');
                        break;
                    case 401:
                        setErrorMessage('비밀번호가 틀렸습니다.');
                        break;
                    case 403:
                        setErrorMessage('접근 권한이 없습니다.');
                        break;
                    case 404:
                        setErrorMessage('존재하지 않는 사용자입니다.');
                        break;
                    case 500:
                        setErrorMessage(
                            '서버 오류가 발생했습니다. 관리자에게 문의하세요.',
                        );
                        break;
                    default:
                        setErrorMessage('비밀번호 변경에 실패했습니다.');
                }
            } else if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage(
                    '서버에 연결할 수 없습니다. 네트워크 상태를 확인하세요.',
                );
            }
        }
    };
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {userId ? (
                <div className="flex flex-col gap-[1.125rem] pr-[18.4374rem]">
                    {/* 닉네임 변경 */}
                    <div className="flex flex-col gap-[0.5625rem]">
                        <h2
                            className={`text-sm font-semibold ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                            }`}>
                            닉네임 변경하기
                        </h2>
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                className={`w-[16rem] px-[0.5625rem] py-1 text-[0.625rem] font-medium transition-colors duration-300 ${
                                    isDarkMode
                                        ? 'bg-[#292929] text-[#999999] placeholder-[#F9F9F9]'
                                        : 'bg-[#dcdcdc] text-[#7a7a7a]' // 수정됨
                                }`}
                                placeholder="변경할 닉네임을 입력하세요"
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}
                            />
                            <button
                                type="button"
                                className={`h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] text-xs transition-colors duration-300 ${
                                    isDarkMode
                                        ? 'bg-[#2D2F39] text-[#CACACA] hover:bg-[#4a4a4a]'
                                        : 'bg-[#999999] text-white hover:bg-[#7a7a7a]' // 수정됨
                                }`}
                                onClick={handleUpdateNickname}
                                disabled={isUpdatingUserName}>
                                {isUpdatingUserName ? '저장 중...' : '저장'}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.5625rem]">
                        <h2
                            className={`text-sm font-semibold ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                            }`}>
                            이메일
                        </h2>
                        <div className="text-xs font-medium text-[#999999]">
                            {user.email}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.5625rem]">
                        <h2
                            className={`text-sm font-semibold ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                            }`}>
                            이름
                        </h2>
                        <div className="text-xs font-medium text-[#999999]">
                            {user.name}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.5625rem]">
                        <h2
                            className={`text-sm font-semibold ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                            }`}>
                            생년월일
                        </h2>
                        <div className="text-xs font-medium text-[#999999]">
                            {user.birth}
                        </div>
                    </div>

                    {/* 비밀번호 변경 */}
                    <div className="flex flex-col gap-[0.5625rem]">
                        <h2
                            className={`text-sm font-semibold ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                            }`}>
                            비밀번호 변경
                        </h2>

                        <input
                            type="password"
                            placeholder="현재 비밀번호"
                            className={`w-[16rem] px-[0.5625rem] py-1 text-[0.625rem] font-medium transition-colors duration-300 ${
                                isDarkMode
                                    ? 'bg-[#292929] text-[#999999] placeholder-[#F9F9F9]'
                                    : 'bg-[#dcdcdc] text-black placeholder-[#7a7a7a]'
                            }`}
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />

                        <div className="flex items-center justify-between">
                            <input
                                type="password"
                                placeholder="새 비밀번호"
                                className={`w-[16rem] px-[0.5625rem] py-1 text-[0.625rem] font-medium transition-colors duration-300 ${
                                    isDarkMode
                                        ? 'bg-[#292929] text-[#999999] placeholder-[#F9F9F9]'
                                        : 'bg-[#dcdcdc] text-black placeholder-[#7a7a7a]'
                                }`}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className={`h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] text-xs transition-colors duration-300 ${
                                    isDarkMode
                                        ? 'bg-[#2D2F39] text-[#CACACA] hover:bg-[#4a4a4a]'
                                        : 'bg-[#999999] text-white hover:bg-[#7a7a7a]' // 수정됨
                                }`}
                                onClick={handleUpdatePassword}
                                disabled={isUpdatingPassword}>
                                {isUpdatingPassword ? '변경 중...' : '변경'}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h2
                            className={`text-sm font-medium ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                            }`}>
                            로그아웃
                        </h2>
                        <div className="flex items-center justify-between">
                            <div className="text-xs font-medium text-[#999999]">
                                현재 로그인된 기기에서 로그아웃합니다.
                            </div>
                            <button
                                type="button"
                                className={`h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] text-xs transition-colors duration-300 ${
                                    isDarkMode
                                        ? 'bg-[#2D2F39] text-[#CACACA] hover:bg-[#4a4a4a]'
                                        : 'bg-[#999999] text-white hover:bg-[#7a7a7a]' // 수정됨
                                }`}
                                onClick={() => setOpenLogoutModal(true)}>
                                로그아웃
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h2
                            className={`text-sm font-medium ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                            }`}>
                            회원탈퇴
                        </h2>
                        <div className="flex items-center justify-between">
                            <div className="text-xs font-medium text-[#999999]">
                                현재 계정을 영구적으로 삭제하고 생성된 모든
                                도서의 액세스 권한을 제거합니다.
                            </div>
                            <button
                                type="button"
                                className={`h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] text-xs transition-colors duration-300 ${
                                    isDarkMode
                                        ? 'bg-[#482323] text-[#CACACA] hover:bg-[#813a3a]'
                                        : 'bg-red-600 text-white hover:bg-red-700' // 수정됨
                                }`}
                                onClick={() => setOpenDeregisterModal(true)}>
                                회원탈퇴
                            </button>
                        </div>
                    </div>

                    {successModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="flex w-[20rem] flex-col items-center gap-3 rounded-lg bg-[#1B1B1B] p-5">
                                <p className="text-center text-[#DBAC4A]">
                                    {successModal}
                                </p>
                            </div>
                        </div>
                    )}

                    {errorMessageModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="flex w-[20rem] flex-col items-center gap-3 rounded-lg bg-[#1B1B1B] p-5">
                                <p className="text-center text-[#DBAC4A]">
                                    {errorMessageModal}
                                </p>
                                <button
                                    type="button"
                                    className="h-[2.5rem] w-[7.5rem] rounded-[0.3125rem] bg-[#2D2F39] text-[#DBAC4A] hover:bg-[#292929]"
                                    onClick={() => setErrorMessage('')}>
                                    확인
                                </button>
                            </div>
                        </div>
                    )}

                    {openLogoutModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="flex w-[20rem] flex-col items-center gap-3 rounded-lg bg-[#1B1B1B] p-5">
                                <p className="text-center text-[#DBAC4A]">
                                    로그아웃 하시겠습니까?
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenLogoutModal(false)
                                        }
                                        className="rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b88a3a]">
                                        취소
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpenLogoutModal(false);
                                            setIsLogoutLoading(true);
                                            handleLogout();
                                        }}
                                        className="rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b88a3a]">
                                        확인
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {openDeregisterModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="flex w-[20rem] flex-col items-center gap-3 rounded-lg bg-[#1B1B1B] p-5">
                                <p className="text-center text-[#DBAC4A]">
                                    회원탈퇴 하시겠습니까?
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenDeregisterModal(false)
                                        }
                                        className="rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b88a3a]">
                                        취소
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpenDeregisterModal(false);
                                            setIsDeregisterLoading(true);
                                            handleDeregister();
                                        }}
                                        className="rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b88a3a]">
                                        확인
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex h-full w-full">
                    <p className="text-lg text-[#DBAC4A]">
                        로그인이 필요합니다.
                    </p>
                </div>
            )}

            {(isUpdatingUserName ||
                isUpdatingPassword ||
                isDeregisterLoading ||
                isLogoutLoading) && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-b-5 h-32 w-32 animate-spin rounded-full border-t-[7px] border-[#DBAC4A]" />
                        <p className="mt-5 text-[#DBAC4A]">
                            {isUpdatingUserName && '닉네임 변경 중...'}
                            {isUpdatingPassword && '비밀번호 변경 중...'}
                            {isDeregisterLoading && '회원 탈퇴 중...'}
                            {isLogoutLoading && '로그아웃 중...'}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyPage;
