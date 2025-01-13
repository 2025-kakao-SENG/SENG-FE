import React from 'react';

// 공통 버튼 컴포넌트
const Button: React.FC<{
    text: string;
    onClick?: () => void;
    className?: string;
}> = ({text, onClick, className = ''}) => (
    <button
        className={`h-[3.125rem] w-[12.4375rem] rounded-[0.625rem] ${className}`}
        onClick={onClick}>
        {text}
    </button>
);

const Logout: React.FC = () => {
    const handleCancel = () => {
        // 돌아가기 버튼 클릭 시 실행할 로직
        console.log('돌아가기 클릭');
    };

    const handleLogout = () => {
        // 로그아웃 버튼 클릭 시 실행할 로직
        console.log('로그아웃 클릭');
    };

    return (
        <div className="flex h-[9.75rem] w-[27.75rem] flex-col items-center rounded-2xl bg-[#1B1B1B]">
            {/* 로그아웃 확인 메시지 */}
            <p className="mb-[2rem] mt-[2.2rem] text-[0.98rem] font-medium text-white">
                로그아웃을 진행하시겠습니까?
            </p>

            {/* 버튼 그룹 */}
            <div className="flex gap-3">
                <Button
                    text="돌아가기"
                    onClick={handleCancel}
                    className="bg-[#2D2D2D] text-[#C8C8C8]"
                />
                <Button
                    text="로그아웃"
                    onClick={handleLogout}
                    className="bg-[#FAC453] text-black"
                />
            </div>
        </div>
    );
};

export default Logout;
