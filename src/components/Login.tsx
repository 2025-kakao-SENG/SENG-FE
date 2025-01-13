import React, {useState} from 'react';
import logoCircle from '../assets/images/login/logoCircle.svg';
import close from '../assets/images/login/close.svg';
import kakao from '../assets/images/login/kakao.svg';

// 버튼 컴포넌트
const Button: React.FC<{
    text: string;
    onClick?: () => void;
    className?: string;
}> = ({text, onClick, className = ''}) => (
    <button className={`px-1 text-xs ${className}`} onClick={onClick}>
        {text}
    </button>
);

// 간편 로그인 섹션 컴포넌트
const KakaoLogin: React.FC = () => (
    <div className="flex w-full flex-col items-center justify-center">
        {/* 간편 로그인 문구 및 막대기 */}
        <div className="mb-[0.8125rem] flex w-[19.5rem] items-center">
            <div className="flex-grow border-t-[1px] border-[#9C9C9C]" />
            <p className="px-2 text-[0.6875rem] text-[#9C9C9C]">간편 로그인</p>
            <div className="flex-grow border-t-[1px] border-[#9C9C9C]" />
        </div>

        {/* 카카오 로그인 버튼 */}
        <button className="flex h-[3rem] w-[19.5rem] items-center justify-center gap-3 rounded-[0.1875rem] bg-[#EEB02F]">
            <img src={kakao} alt="kakao" />
            <p className="text-[0.875rem] font-medium text-black">
                카카오 로그인
            </p>
        </button>
    </div>
);

// 로그인 컴포넌트
const Login: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => setIsVisible(false);

    if (!isVisible) return null;

    return (
        <div className="relative flex h-[30.9375rem] w-[25.8125rem] flex-col items-center bg-[#1B1B1B] text-[#9C9C9C]">
            {/* 로고 */}
            <img
                src={logoCircle}
                alt="StoryBreeze Logo"
                className="mt-[1.375rem]"
            />

            {/* 닫기 버튼 */}
            <button
                className="absolute right-[1.9375rem] top-[1.9375rem]"
                onClick={handleClose}>
                <img src={close} alt="Close Button" />
            </button>

            {/* 입력 폼 */}
            <form className="mt-7 flex flex-col gap-[0.6875rem]">
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
                    type="text"
                    placeholder="비밀번호"
                    className="h-[3rem] w-[19.5rem] rounded-[0.1875rem] border-[1px] border-[#9C9C9C] bg-[#1B1B1B] px-3 text-[0.875rem] placeholder-[#9C9C9C] focus:border-[#EEB02F] focus:placeholder-[#EEB02F] focus:outline-none"
                />
            </form>

            {/* 로그인 버튼 */}
            <button className="mt-[1.5625rem] h-[3rem] w-[19.5rem] rounded-[0.1875rem] bg-[#EEB02F] text-[0.875rem] text-black">
                로그인
            </button>

            {/* 아이디 및 비번 찾기, 회원가입 버튼 */}
            <div className="mb-[1.625rem] mt-[0.875rem] flex items-center">
                <Button text="아이디 찾기" />
                <Button
                    text="비밀번호 찾기"
                    className="border-[1px] border-black border-x-[#9C9C9C]"
                />
                <Button text="회원가입" />
            </div>

            {/* 간편 로그인 */}
            <KakaoLogin />
        </div>
    );
};

export default Login;
