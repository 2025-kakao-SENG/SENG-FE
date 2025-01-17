function MyPage() {
    return (
        <div className="flex flex-col gap-[1.125rem] pr-[18.4374rem]">
            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                    닉네임 변경하기
                </h2>
                <div className="flex items-center justify-between">
                    <input
                        type="text"
                        className="w-[16rem] bg-[#292929] px-[0.5625rem] py-1 text-[0.625rem] font-medium text-[#999999]"
                        placeholder="변경할 닉네임을 입력하세요"
                    />
                    <button
                        type="button"
                        className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs text-[#CACACA0] hover:bg-[#4a4a4a]">
                        저장
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">이메일</h2>
                <div className="text-xs font-medium text-[#999999]">
                    kakao.seng@gmail.com
                </div>
            </div>

            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">이름</h2>
                <div className="text-xs font-medium text-[#999999]">카카오</div>
            </div>

            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                    생년월일
                </h2>
                <div className="text-xs font-medium text-[#999999]">
                    2025년 01월 08일
                </div>
            </div>

            <div className="flex flex-col gap-[0.5625rem]">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                    비밀변호 변경
                </h2>
                <button
                    type="button"
                    className="h-[1.5625rem] w-[7.6875rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs font-medium text-[#CACACA] hover:bg-[#4a4a4a]">
                    비밀번호 변경하기
                </button>
            </div>

            <div className="flex flex-col">
                <h2 className="text-sm font-medium text-[#F5F5F5]">로그아웃</h2>
                <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-[#999999]">
                        현재 로그인된 기기에서 로그아웃합니다.
                    </div>
                    <button
                        type="button"
                        className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs text-[#CACACA] hover:bg-[#4a4a4a]">
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
                        className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#482323] text-xs text-[#CACACA] hover:bg-[#813a3a]">
                        회원탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
