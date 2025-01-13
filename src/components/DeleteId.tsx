function DeleteId() {
    return (
        <>
            <div className="flex h-[12.125rem] h-[rem] w-[27.75rem] w-[rem] flex-col items-center justify-center gap-6 rounded-xl bg-[#1B1B1B] text-[0.98rem]">
                <div className="mt-4 justify-items-center">
                    <p className="font-medium text-white">
                        회원 탈퇴와 함께 StroyBreeze 에 등록된
                    </p>
                    <p className="font-medium text-white">
                        모든 개인정보 및 도서는
                    </p>
                    <p className="font-medium text-white">
                        삭제, 폐기 처리되며 복구되지 않습니다.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="h-[3.125rem] w-[12.4375rem] rounded-[0.625rem] bg-[#2D2D2D] text-[#C8C8C8]">
                        돌아가기
                    </button>
                    <button className="h-[3.125rem] w-[12.4375rem] rounded-[0.625rem] bg-[#FAC453] text-black">
                        회원 탈퇴
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteId;
