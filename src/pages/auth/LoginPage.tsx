import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {
    AuthLoginApiRequest,
    AuthLoginApiResponse,
} from '@/types/apis/auth/loginApiTypes';
import useAuthLoginApi from '@/hooks/apis/auth/useAuthLoginApi';
import useAuthKaKaoLoginApi from '@/hooks/apis/auth/useAuthKakaoLoginApi';
import {useDispatch} from 'react-redux';
import {AuthKakaoLoginApiResponse} from '@/types/apis/auth/kakaoLoginApiTypes';
import {setUserInfoByLogin, UserSliceState} from '@/redux/slice/userSlice';
import logo from '@/assets/images/logo.svg';
import close from '@/assets/images/login/close.svg';
import kakao from '@/assets/images/login/kakao.svg';
import {useTheme} from '@/constants/ThemeProvider';
import {setLoginClose} from '@/redux/slice/etcSlice';

interface LoginPageProps {
    backgroundLocation: string;
}

function LoginPage({
    backgroundLocation: loginBackgroundLocation,
}: LoginPageProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authLoginApi, isLoading: isLoginLoading} = useAuthLoginApi();
    const {authKakaoLoginApi, isLoading: isKakaoLoginLoading} =
        useAuthKaKaoLoginApi();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {isDarkMode} = useTheme();

    function successLogin() {
        navigate('/home');
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
            } else if (response.status === 'error') {
                if (response.message.includes('Invalid email or password')) {
                    setErrorMessage('잘못된 이메일 혹은 비밀번호입니다.');
                } else if (
                    response.message.includes('Email and password are required')
                ) {
                    setErrorMessage(
                        '이메일과 비밀번호는 필수 입력 항목입니다.',
                    );
                } else if (
                    response.message.includes('Only POST method is allowed')
                ) {
                    setErrorMessage(
                        '허용되지 않는 메서드 요청입니다. (POST 메서드만 허용됩니다)',
                    );
                } else {
                    setErrorMessage(`로그인 오류: ${response.message}`);
                }
            } else {
                setErrorMessage('알 수 없는 응답이 수신되었습니다.');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <div
                className={`absolute left-1/2 top-1/2 z-10 flex h-[30.9375rem] w-[25.8125rem] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center ${isDarkMode ? 'bg-[#1B1B1B] text-[#9C9C9C]' : 'bg-[#F3F3F3] text-black shadow-md'} pb-8 transition-colors duration-300`}>
                <div
                    className={`rounded-full p-3 px-2.5 transition-colors duration-300 ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                    }`}>
                    <img
                        src={logo}
                        alt="StoryBreeze Logo"
                        className="w-[3.54312rem]"
                    />
                </div>

                <button
                    type="button"
                    className="absolute right-[1.9375rem] top-[1.9375rem]"
                    onClick={() => {
                        dispatch(setLoginClose());
                        navigate(loginBackgroundLocation);
                    }}>
                    <img src={close} alt="Close Button" />
                </button>
                <form
                    className="mt-7 flex flex-col gap-[0.6875rem]"
                    onSubmit={e => {
                        e.preventDefault();
                        handleLoginSubmit();
                    }}>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="이메일"
                        onChange={handleEmailChange}
                        className={`h-[3rem] w-[19.5rem] rounded-[0.1875rem] border-[1px] ${
                            isDarkMode
                                ? 'border-[#9C9C9C] bg-[#1B1B1B] text-[#9C9C9C]'
                                : 'border-gray-300 bg-white text-black'
                        } px-3 text-[0.875rem] placeholder-gray-400 transition-colors duration-300 focus:border-[#EEB02F] focus:placeholder-[#EEB02F] focus:outline-none`}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        onChange={handlePasswordChange}
                        className={`h-[3rem] w-[19.5rem] rounded-[0.1875rem] border-[1px] ${
                            isDarkMode
                                ? 'border-[#9C9C9C] bg-[#1B1B1B] text-[#9C9C9C]'
                                : 'border-gray-300 bg-white text-black'
                        } px-3 text-[0.875rem] placeholder-gray-400 transition-colors duration-300 focus:border-[#EEB02F] focus:placeholder-[#EEB02F] focus:outline-none`}
                    />
                </form>
                <button
                    type="button"
                    onClick={handleLoginSubmit}
                    className="mt-[1.5625rem] h-[3rem] w-[19.5rem] rounded-[0.1875rem] bg-[#EEB02F] text-[0.875rem] text-black">
                    로그인
                </button>
                <div className="mb-[1.625rem] mt-[0.875rem] flex items-center text-[#9C9C9C]">
                    <button type="button" className="px-1 text-xs">
                        아이디 찾기
                    </button>
                    <button
                        type="button"
                        className="border border-y-0 border-x-[#9C9C9C] px-1 text-xs">
                        비밀번호 찾기
                    </button>
                    <button
                        type="button"
                        className="px-1 text-xs"
                        onClick={() =>
                            navigate('/register', {
                                state: {
                                    backgroundLocation: loginBackgroundLocation,
                                },
                            })
                        }>
                        회원가입
                    </button>
                </div>

                {/* 카카오 로그인 */}
                <div className="flex w-full flex-col items-center justify-center">
                    <div className="mb-[0.8125rem] flex w-[19.5rem] items-center">
                        <div className="flex-grow border-t-[1px] border-[#9C9C9C]" />
                        <p className="px-2 text-[0.6875rem] text-[#9C9C9C]">
                            간편 로그인
                        </p>
                        <div className="flex-grow border-t-[1px] border-[#9C9C9C]" />
                    </div>

                    <button
                        type="button"
                        onClick={handleKaKaoLoginSubmit}
                        className="flex h-[3rem] w-[19.5rem] items-center justify-center gap-3 rounded-[0.1875rem] bg-[#EEB02F]">
                        <img src={kakao} alt="kakao" />
                        <p className="text-[0.875rem] font-medium text-black">
                            카카오 로그인
                        </p>
                    </button>
                </div>

                {(isLoginLoading || isKakaoLoginLoading) && (
                    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
                        <div className="flex flex-col items-center justify-center">
                            <div className="border-b-5 h-32 w-32 animate-spin rounded-full border-t-[7px] border-[#DBAC4A]" />
                            <p className="mt-5 text-[#DBAC4A]">
                                {isLoginLoading && '로그인 중...'}
                                {isKakaoLoginLoading && '카카오 로그인 중...'}
                            </p>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#111111] p-5">
                            <p className="text-lg text-[#DBAC4A]">
                                {errorMessage}
                            </p>
                            <button
                                type="button"
                                onClick={() => setErrorMessage('')}
                                className="mt-2 rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b88a3a]">
                                확인
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
