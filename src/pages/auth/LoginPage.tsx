import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {
    AuthLoginApiRequest,
    AuthLoginApiResponse,
} from '@/types/auth/loginApiTypes';
import useAuthLoginApi from '@/hooks/apis/auth/useAuthLoginApi';
import useAuthKaKaoLoginApi from '@/hooks/apis/auth/useAuthKakaoLoginApi';
import {useDispatch} from 'react-redux';
import {AuthKakaoLoginApiResponse} from '@/types/auth/kakaoLoginApiTypes';
import {setUserInfoByLogin, UserSliceState} from '@/redux/slice/userSlice';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authLoginApi, isLoading: isLoginLoading} = useAuthLoginApi();
    const {authKakaoLoginApi, isLoading: isKakaoLoginLoading} =
        useAuthKaKaoLoginApi();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function successLogin() {
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            navigate('/home');
        }, 500);
    }

    async function handleLoginSubmit() {
        const request: AuthLoginApiRequest = {
            email: emailInput,
            password: passwordInput,
        };
        try {
            const response: AuthLoginApiResponse = await authLoginApi(request);
            if (response.status === 'success') {
                const dispatchData: UserSliceState = {
                    isLogined: true,
                    pid: response.data.pid,
                    kakaoPid: null,
                    name: response.data.name,
                    thumbnailImage: response.data.thumbnailImage,
                    profileImage: response.data.profileImage,
                    birth: response.data.birth,
                    phone: response.data.phone,
                    address: response.data.address,
                    email: response.data.email,
                    leaf: response.data.leaf,
                };
                dispatch(setUserInfoByLogin(dispatchData));
                successLogin();
            } else {
                setErrorMessage(response.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('로그인 통신 오류');
            }
        }
    }

    async function handleKaKaoLoginSubmit() {
        try {
            const response: AuthKakaoLoginApiResponse =
                await authKakaoLoginApi();
            if (response.status === 'success') {
                const dispatchData: UserSliceState = {
                    isLogined: true,
                    pid: null,
                    kakaoPid: response.data.kakaoPid,
                    name: response.data.name,
                    thumbnailImage: response.data.thumbnailImage,
                    profileImage: response.data.profileImage,
                    birth: response.data.birth,
                    phone: response.data.phone,
                    address: response.data.address,
                    email: response.data.email,
                    leaf: response.data.leaf,
                };
                dispatch(setUserInfoByLogin(dispatchData));
                successLogin();
            } else {
                setErrorMessage(response.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('카카오 로그인 통신 오류');
            }
        }
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailInput(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value);
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>

                {/* 성공 모달 */}
                {isSuccess && (
                    <div className="mb-4 rounded bg-green-100 p-4 text-green-800">
                        <p>로그인에 성공했습니다!</p>
                    </div>
                )}

                {/* 이메일 입력 */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="이메일"
                        value={emailInput}
                        onChange={handleEmailChange}
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={passwordInput}
                        onChange={handlePasswordChange}
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* 에러 메시지 */}
                {errorMessage && (
                    <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
                )}

                {/* 로그인 버튼 */}
                <button
                    type="button"
                    onClick={handleLoginSubmit}
                    disabled={isLoginLoading}
                    className={`w-full rounded-lg px-4 py-2 font-semibold text-white ${
                        isLoginLoading
                            ? 'cursor-not-allowed bg-blue-300'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}>
                    {isLoginLoading ? '로그인 중...' : '로그인'}
                </button>

                {/* 카카오 로그인 버튼 */}
                <button
                    type="button"
                    onClick={handleKaKaoLoginSubmit}
                    className="mt-4 w-full rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white hover:bg-yellow-600">
                    {isKakaoLoginLoading
                        ? '카카오 로그인 중...'
                        : '카카오 로그인'}
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
