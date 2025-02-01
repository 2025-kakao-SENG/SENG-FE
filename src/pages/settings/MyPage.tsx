import {useState} from 'react';
import {useUpdateUserNameMutation} from '@/redux/apiSlice/updateUserNameApiSlice';
import {useUpdateUserPasswordMutation} from '@/redux/apiSlice/updateUserPasswordApiSlice';
import {useSelector, useDispatch} from 'react-redux';
import {setUserInfoByLogin} from '@/redux/slice/userSlice';
import {useNavigate} from 'react-router-dom';
import {getUserLoginData} from '@/redux/selector';
import useLogout from '@/hooks/useLogout';
import useAuthDeregisterApi from '@/hooks/apis/auth/useAuthDeregisterApi';
import {AuthDeregisterApiRequest} from '@/types/apis/auth/deregisterApiTypes';

function MyPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUserLoginData);
    const logout = useLogout();
    const userLoginDate = useSelector(getUserLoginData);
    const {authDeregisterApi, isLoading: deregisterLoading} =
        useAuthDeregisterApi();

    const [successModal, setSuccessModal] = useState('');
    const [errorMessageModal, setErrorMessage] = useState('');

    // 닉네임 변경
    const [nickname, setNickname] = useState(user.name || '');
    const [updateUserName, {isLoading, error}] = useUpdateUserNameMutation();

    // 비밀번호 변경
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [
        updateUserPassword,
        {isLoading: isUpdatingPassword, error: passwordError},
    ] = useUpdateUserPasswordMutation();

    const handleLogout = () => {
        if (userLoginDate.kakaoPid) {
            logout('kakao');
        } else if (userLoginDate.pid) {
            logout('default');
        }
        setSuccessModal('로그아웃 되었습니다.');
        setTimeout(() => {
            setSuccessModal('');
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
                    setSuccessModal('회원 탈퇴 되었습니다.');
                    setTimeout(() => {
                        setSuccessModal('');
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
                    setSuccessModal('회원 탈퇴 되었습니다.');
                    setTimeout(() => {
                        setSuccessModal('');
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
            alert('닉네임을 입력하세요.');
            return;
        }

        try {
            const response = await updateUserName({
                id: Number(user.id),
                name: nickname,
            }).unwrap();
            dispatch(setUserInfoByLogin({...user, name: response.name}));
            alert('닉네임이 성공적으로 변경되었습니다.');
        } catch (err) {
            console.error('닉네임 변경 실패:', err);

            let errorMessage = '닉네임 변경에 실패했습니다.';

            if ('status' in err) {
                if (err.status === 'FETCH_ERROR') {
                    errorMessage =
                        '서버에 연결할 수 없습니다. 네트워크 상태를 확인하세요.';
                } else if (err.status === 400) {
                    errorMessage = '잘못된 요청입니다.';
                } else if (err.status === 500) {
                    errorMessage = '서버 오류가 발생했습니다.';
                }
            } else if (err.message) {
                errorMessage = err.message;
            }

            alert(errorMessage);
        }
    };

    const handleUpdatePassword = async () => {
        if (!oldPassword || !newPassword) {
            alert('현재 비밀번호와 새 비밀번호를 입력하세요.');
            return;
        }

        try {
            const response = await updateUserPassword({
                id: Number(user.id),
                old_password: oldPassword,
                new_password: newPassword,
            }).unwrap();

            if (response.status === 'success') {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                setOldPassword('');
                setNewPassword('');
            } else {
                alert(response.message || '비밀번호 변경에 실패했습니다.');
            }
        } catch (err) {
            console.error('비밀번호 변경 실패:', err);

            let errorMessage = '비밀번호 변경에 실패했습니다.';

            if (err.data?.message) {
                if (err.data.message === '비밀번호가 틀렸습니다.') {
                    errorMessage = '비밀번호가 틀렸습니다.';
                } else if (err.data.message === '존재하지 않는 사용자입니다.') {
                    errorMessage = '존재하지 않는 사용자입니다.';
                } else if (
                    err.data.message === '필수 파라미터가 누락되었습니다.'
                ) {
                    errorMessage = '필수 파라미터가 누락되었습니다.';
                } else if (
                    err.data.message ===
                    '서버 오류가 발생했습니다. 관리자에게 문의하세요.'
                ) {
                    errorMessage =
                        '서버 오류가 발생했습니다. 관리자에게 문의하세요.';
                } else {
                    errorMessage = err.data.message;
                }
            } else if (err.status === 'FETCH_ERROR') {
                errorMessage =
                    '서버에 연결할 수 없습니다. 네트워크 상태를 확인하세요.';
            } else if (err.status === 400) {
                errorMessage = '잘못된 요청입니다.';
            } else if (err.status === 500) {
                errorMessage = '서버 오류가 발생했습니다.';
            }

            alert(errorMessage);
        }
    };
    return (
        <div className="flex flex-col gap-[1.125rem] pr-[18.4374rem]">
            {/* 닉네임 변경 */}
            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                    닉네임 변경하기
                </h2>
                <div className="flex items-center justify-between">
                    <input
                        type="text"
                        className="w-[16rem] bg-[#292929] px-[0.5625rem] py-1 text-[0.625rem] font-medium text-[#999999]"
                        placeholder="변경할 닉네임을 입력하세요"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />
                    <button
                        type="button"
                        className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs text-[#CACACA] hover:bg-[#4a4a4a]"
                        onClick={handleUpdateNickname}
                        disabled={isLoading}>
                        {isLoading ? '저장 중...' : '저장'}
                    </button>
                </div>
                {error && (
                    <p className="text-xs text-red-500">
                        닉네임 변경에 실패했습니다.
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">이메일</h2>
                <div className="text-xs font-medium text-[#999999]">
                    {user.email}
                </div>
            </div>

            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">이름</h2>
                <div className="text-xs font-medium text-[#999999]">
                    {user.name}
                </div>
            </div>

            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                    생년월일
                </h2>
                <div className="text-xs font-medium text-[#999999]">
                    {user.birth}
                </div>
            </div>

            {/* 비밀번호 변경 */}
            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                    비밀번호 변경
                </h2>

                <input
                    type="password"
                    placeholder="현재 비밀번호"
                    className="w-[16rem] bg-[#292929] px-[0.5625rem] py-1 text-[0.625rem] font-medium text-[#999999]"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />

                <div className="flex items-center justify-between">
                    <input
                        type="password"
                        placeholder="새 비밀번호"
                        className="w-[16rem] bg-[#292929] px-[0.5625rem] py-1 text-[0.625rem] font-medium text-[#999999]"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs text-[#CACACA] hover:bg-[#4a4a4a]"
                        onClick={handleUpdatePassword}
                        disabled={isUpdatingPassword}>
                        {isUpdatingPassword ? '변경 중...' : '변경'}
                    </button>
                </div>

                {passwordError && (
                    <p className="text-xs text-red-500">
                        비밀번호 변경에 실패했습니다.
                    </p>
                )}
            </div>

            <div className="flex flex-col">
                <h2 className="text-sm font-medium text-[#F5F5F5]">로그아웃</h2>
                <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-[#999999]">
                        현재 로그인된 기기에서 로그아웃합니다.
                    </div>
                    <button
                        type="button"
                        className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs text-[#CACACA] hover:bg-[#4a4a4a]"
                        onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <h2 className="text-sm font-medium text-[#F5F5F5]">회원탈퇴</h2>
                <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-[#999999]">
                        현재 계정을 영구적으로 삭제하고 생성된 모든 도서의
                        액세스 권한을 제거합니다.
                    </div>
                    <button
                        type="button"
                        className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#482323] text-xs text-[#CACACA] hover:bg-[#813a3a]"
                        onClick={handleDeregister}>
                        회원탈퇴
                    </button>
                </div>
            </div>

            {successModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center gap-3 rounded-lg bg-[#1B1B1B] p-5">
                        <p className="text-[#DBAC4A]">{successModal}</p>
                    </div>
                </div>
            )}

            {errorMessageModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center gap-3 rounded-lg bg-[#1B1B1B] p-5">
                        <p className="text-[#DBAC4A]">{errorMessageModal}</p>
                        <button
                            type="button"
                            className="h-[2.5rem] w-[7.5rem] rounded-[0.3125rem] bg-[#2D2F39] text-[#DBAC4A] hover:bg-[#292929]"
                            onClick={() => setErrorMessage('')}>
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyPage;
