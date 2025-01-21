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
import logoCircle from '@/assets/images/login/logoCircle.svg';
import close from '@/assets/images/login/close.svg';
import kakao from '@/assets/images/login/kakao.svg';

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
            } else {
                setErrorMessage('아이디 혹은 비밀번호가 잘못되었습니다.');
                // 세부 에러 항목 활성화
                /* setErrorMessage(response.message); */
            }
        } catch /* (error: unknown) */ {
            setErrorMessage('아이디 혹은 비밀번호가 잘못되었습니다.');
            /*             if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('로그인 통신 오류');
            } */
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
                setErrorMessage('아이디 혹은 비밀번호가 잘못되었습니다.');
                // 세부 에러 항목 활성화
                // setErrorMessage(response.message);
            }
        } catch /* (error: unknown) */ {
            setErrorMessage('아이디 혹은 비밀번호가 잘못되었습니다.');
            /* if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('카카오 로그인 통신 오류');
            } */
        }
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailInput(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value);
    }

    return (
        <div className="absolute left-1/2 top-1/2 z-10 flex h-[30.9375rem] w-[25.8125rem] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center bg-[#1B1B1B] text-[#9C9C9C]">
            <img
                src={logoCircle}
                alt="StoryBreeze Logo"
                className="mt-[1.375rem]"
            />
            <button
                type="button"
                className="absolute right-[1.9375rem] top-[1.9375rem]"
                onClick={() => navigate(loginBackgroundLocation)}>
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
                        errorMessage ? 'border-red-500' : 'border-[#9C9C9C]'
                    } bg-[#1B1B1B] px-3 text-[0.875rem] placeholder-[#9C9C9C] focus:border-[#EEB02F] focus:placeholder-[#EEB02F] focus:outline-none`}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    onChange={handlePasswordChange}
                    className={`h-[3rem] w-[19.5rem] rounded-[0.1875rem] border-[1px] ${
                        errorMessage ? 'border-red-500' : 'border-[#9C9C9C]'
                    } bg-[#1B1B1B] px-3 text-[0.875rem] placeholder-[#9C9C9C] focus:border-[#EEB02F] focus:placeholder-[#EEB02F] focus:outline-none`}
                />
                {errorMessage && (
                    <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
                )}
            </form>
            <button
                type="button"
                onClick={handleLoginSubmit}
                disabled={isLoginLoading}
                className={`mt-[1.5625rem] h-[3rem] w-[19.5rem] rounded-[0.1875rem] ${
                    isLoginLoading ? 'bg-gray-500' : 'bg-[#EEB02F]'
                } text-[0.875rem] text-black`}>
                {isLoginLoading ? '로딩 중...' : '로그인'}
            </button>
            <div className="mb-[1.625rem] mt-[0.875rem] flex items-center">
                <button type="button" className="px-1 text-xs">
                    아이디 찾기
                </button>
                <button
                    type="button"
                    className="border-[1px] border-black border-x-[#9C9C9C] px-1 text-xs">
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
                    disabled={isKakaoLoginLoading}
                    className={`flex h-[3rem] w-[19.5rem] items-center justify-center gap-3 rounded-[0.1875rem] ${
                        isKakaoLoginLoading ? 'bg-gray-500' : 'bg-[#EEB02F]'
                    }`}>
                    {isKakaoLoginLoading ? (
                        <p className="text-[0.875rem] font-medium text-black">
                            로딩 중...
                        </p>
                    ) : (
                        <>
                            <img src={kakao} alt="kakao" />
                            <p className="text-[0.875rem] font-medium text-black">
                                카카오 로그인
                            </p>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
