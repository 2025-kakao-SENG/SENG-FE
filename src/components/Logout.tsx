import React from 'react';

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

const Logout: React.FC<{onLogout: () => void; onCancel: () => void}> = ({
    onLogout,
    onCancel,
}) => {
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
                    onClick={onCancel}
                    className="bg-[#2D2D2D] text-[#C8C8C8] hover:bg-[#4c4c4c]"
                />
                <Button
                    text="로그아웃"
                    onClick={onLogout}
                    className="bg-[#FAC453] text-black hover:bg-[#d3776d]"
                />
            </div>
        </div>
    );
};

export default Logout;
