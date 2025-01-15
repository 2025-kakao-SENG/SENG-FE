import logoCircle from '../assets/images/login/logoCircle.svg';
import close from '../assets/images/login/close.svg';

function SignUp() {
    return (
        <div className="flex h-[34.5rem] w-[51.9375rem] items-start justify-between bg-[#1B1B1B]">
            {/* 로고 */}
            <img src={logoCircle} alt="Logo" className="pl-8 pt-8" />

            {/* 본문 */}
            <div className="flex flex-col gap-2.5 pt-[3.125rem]">
                <h1 className="text-lg font-extrabold text-[#FAC453]">
                    회원가입
                </h1>

                <p className="text-[0.625rem] font-medium">
                    이용약관을 읽고 동의하시면 서비스를 이용하실 수 있습니다.
                </p>

                <p className="border-[0.041875rem] border-[#575757]"></p>

                <div className="flex flex-col gap-2.5">
                    {/* 이메일 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">
                            이메일
                        </p>
                        <input
                            type="text"
                            placeholder="이메일을 입력해주세요."
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#DBAC4A] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#DBAC4A]"
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="flex justify-between gap-[0.8775rem]">
                        <div className="flex items-center justify-between gap-[1.85rem]">
                            <p className="text-[0.66875rem] text-[#F5F5F5]">
                                비밀번호
                            </p>
                            <input
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                className="h-[2.633125rem] w-[14.67125rem] rounded-sm border border-[#DBAC4A] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C]"
                            />
                        </div>
                        <div className="flex items-center justify-between gap-[1.6425rem]">
                            <p className="text-[0.66875rem] text-[#F5F5F5]">
                                비밀번호 확인
                            </p>
                            <input
                                type="password"
                                placeholder="비밀번호를 한번 더 입력해주세요."
                                className="h-[2.633125rem] w-[14.629375rem] rounded-sm border border-[#DBAC4A] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C]"
                            />
                        </div>
                    </div>

                    {/* 이름 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">이름</p>
                        <input
                            type="text"
                            placeholder="이름을 입력해주세요."
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#DBAC4A] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C]"
                        />
                    </div>

                    {/* 생년월일 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">
                            생년월일
                        </p>
                        <input
                            type="text"
                            placeholder="연도-월-일"
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#DBAC4A] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C]"
                        />
                    </div>

                    {/* 연락처 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">
                            연락처
                        </p>
                        <input
                            type="text"
                            placeholder="010 1234 1234"
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#DBAC4A] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C]"
                        />
                    </div>

                    {/* 주소 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">주소</p>
                        <div className="flex items-center gap-[0.46rem]">
                            <input
                                type="text"
                                placeholder="주소를 입력해주세요."
                                className="h-[2.633125rem] w-[28.965625rem] rounded-sm border border-[#DBAC4A] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C]"
                            />
                            <button
                                type="button"
                                className="h-[2.633125rem] w-[6.269375rem] rounded-sm bg-[#EEB02F] px-[1.875rem] text-[0.66875rem] font-medium text-black">
                                주소찾기
                            </button>
                        </div>
                    </div>

                    {/* 회원가입 버튼 */}
                    <button
                        type="button"
                        className="h-[2.633125rem] w-[39.875rem] rounded-sm bg-[#EEB02F] text-black">
                        회원가입
                    </button>
                </div>
            </div>

            {/* 닫기 버튼 */}
            <img
                src={close}
                alt="Close Button"
                className="pr-[1.875rem] pt-[1.875rem] text-[0.83625rem] font-medium text-black"
            />
        </div>
    );
}

export default SignUp;
