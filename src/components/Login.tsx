import React, {useState} from 'react';
import logoCircle from '../assets/images/login/logoCircle.svg';
import close from '../assets/images/login/close.svg';
import kakao from '../assets/images/login/kakao.svg';
import Service from './Service'; // Service 컴포넌트 가져오기

const Button: React.FC<{
    text: string;
    onClick?: () => void;
    className?: string;
}> = ({text, onClick, className = ''}) => (
    <button
        type="button"
        className={`px-1 text-xs ${className}`}
        onClick={onClick}>
        {text}
    </button>
);

const KakaoLogin: React.FC = () => (
    <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-[0.8125rem] flex w-[19.5rem] items-center">
            <div className="flex-grow border-t-[1px] border-[#9C9C9C]" />
            <p className="px-2 text-[0.6875rem] text-[#9C9C9C]">간편 로그인</p>
            <div className="flex-grow border-t-[1px] border-[#9C9C9C]" />
        </div>

        <button
            type="button"
            className="mb-4 flex h-[3rem] w-[19.5rem] items-center justify-center gap-3 rounded-[0.1875rem] bg-[#EEB02F]">
            <img src={kakao} alt="kakao" />
            <p className="text-[0.875rem] font-medium text-black">
                카카오 로그인
            </p>
        </button>
    </div>
);

const Login: React.FC<{onClose: () => void; onLogin: () => void}> = ({
    onClose,
    onLogin,
}) => {
    const [showService, setShowService] = useState(false);

    if (showService) {
        return <Service onClose={() => setShowService(false)} />;
    }

    return (
        <div className="relative flex h-[30.9375rem] w-[25.8125rem] flex-col items-center bg-[#1B1B1B] text-[#9C9C9C]">
            <img
                src={logoCircle}
                alt="StoryBreeze Logo"
                className="mt-[1.375rem]"
            />
            <button
                type="button"
                className="absolute right-[1.9375rem] top-[1.9375rem]"
                onClick={onClose}>
                <img src={close} alt="Close Button" />
            </button>
            <form
                className="mt-7 flex flex-col gap-[0.6875rem]"
                onSubmit={e => {
                    e.preventDefault();
                    onLogin();
                }}>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="이메일"
                    className="h-[3rem] w-[19.5rem] rounded-[0.1875rem] border-[1px] border-[#9C9C9C] bg-[#1B1B1B] px-3 text-[0.875rem] placeholder-[#9C9C9C] focus:border-[#EEB02F] focus:placeholder-[#EEB02F] focus:outline-none"
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    className="h-[3rem] w-[19.5rem] rounded-[0.1875rem] border-[1px] border-[#9C9C9C] bg-[#1B1B1B] px-3 text-[0.875rem] placeholder-[#9C9C9C] focus:border-[#EEB02F] focus:placeholder-[#EEB02F] focus:outline-none"
                />
            </form>
            <button
                type="button"
                className="mt-[1.5625rem] h-[3rem] w-[19.5rem] rounded-[0.1875rem] bg-[#EEB02F] text-[0.875rem] text-black">
                로그인
            </button>
            <div className="mb-[1.625rem] mt-[0.875rem] flex items-center">
                <Button text="아이디 찾기" />
                <Button
                    text="비밀번호 찾기"
                    className="border-[1px] border-black border-x-[#9C9C9C]"
                />
                <Button text="회원가입" onClick={() => setShowService(true)} />
            </div>
            <KakaoLogin />
        </div>
    );
};

export default Login;
