import logoCircle from '../assets/images/login/logoCircle.svg';
import close from '../assets/images/login/close.svg';

function Service() {
    return (
        <div className="flex h-[53.5625rem] w-[64.4375rem] items-start justify-between gap-6 bg-[#1B1B1B]">
            {/* 로고 */}
            <img
                src={logoCircle}
                alt="SENG Logo"
                className="ml-8 mt-8 w-[3.625rem]"
            />

            {/* 약관 내용 및 버튼 */}
            <div className="flex flex-col gap-2.5 pt-[3.125rem]">
                {/* 이용약관 섹션 */}
                <h1 className="text-lg font-extrabold text-[#FAC453]">
                    이용약관
                </h1>

                <p className="text-[0.625rem] font-medium text-[#E6E6E6]">
                    이용약관을 읽고 동의하시면 서비스를 이용하실 수 있습니다.
                </p>

                <div className="flex h-[13.9375rem] w-[53.1875rem] flex-col gap-4 border-[1px] border-[#656565] pb-[0.875rem] pl-[0.6875rem] pr-[0.1875rem] pt-[0.5rem] text-[0.625rem] font-medium leading-[0.875rem] text-[#BABABA]">
                    <h2 className="">
                        제1조 목적
                        <p className="">
                            이 약관은 [서비스명]이 제공하는 모든 서비스(이하
                            ‘서비스’)의 이용과 관련하여 회원과 서비스 제공자
                            간의 권리, 의무 및 책임사항, 그리고 기타 필요한
                            사항을 규정함을 목적으로 합니다.
                        </p>
                    </h2>

                    <h2 className="">
                        제2조 정의
                        <p className="">
                            "서비스"란 [서비스명]이 제공하는 학습 관리 및 강의
                            콘텐츠, 관련 지원 기능 등 온라인 학습 환경을
                            의미합니다.
                        </p>
                        <p className="">
                            "회원"이란 약관에 동의하고 서비스를 이용하는 모든
                            사용자(일반 회원, 기업 회원 포함)를 말합니다.
                        </p>
                        <p className="">
                            "아이디(ID)"와 "비밀번호"란 회원의 서비스 이용을
                            위해 회원이 설정하고 [서비스명]이 승인한 고유의 식별
                            수단을 의미합니다.
                        </p>
                    </h2>

                    <h2 className="">
                        제3조 약관의 게시 및 효력
                        <p className="">
                            이 약관은 [서비스명] 홈페이지 또는 애플리케이션을
                            통해 게시함으로써 효력을 발생합니다.
                        </p>
                        <p className="">
                            [서비스명]은 관련 법규를 준수하며, 필요 시 약관
                            내용을 변경할 수 있습니다. 변경된 약관은 변경된
                            내용이 명확히 표시된 방식으로 공지합니다.
                        </p>
                    </h2>

                    <h2 className="">제4조 회원 가입 및 관리</h2>
                </div>

                {/* 동의 체크란 */}
                <div className="flex items-center gap-1.5">
                    <input
                        type="checkbox"
                        className="flex h-2.5 w-2.5 appearance-none items-center justify-center border border-[#D1D1D1] bg-transparent checked:bg-[#FAC453] checked:text-black checked:content-['✔'] focus:outline-none"
                    />
                    <p className="text-[0.6875rem] font-medium text-[#D1D1D1]">
                        위 내용에 동의합니다.
                    </p>
                </div>

                {/* 개인정보처리방침 섹션 */}
                <p className="text-lg font-extrabold text-[#FAC453]">
                    개인정보처리방침
                </p>
                <p className="text-[0.625rem] font-medium text-[#E6E6E6]">
                    이용약관을 읽고 동의하시면 서비스를 이용하실 수 있습니다.
                </p>

                <div className="flex h-[13.9375rem] w-[53.1875rem] flex-col gap-4 border-[1px] border-[#656565] pb-[0.875rem] pl-[0.6875rem] pr-[0.1875rem] pt-[0.5rem] text-[0.625rem] font-medium leading-[0.875rem] text-[#BABABA]">
                    <h2 className="">
                        제1조 목적
                        <p className="">
                            이 약관은 [서비스명]이 제공하는 모든 서비스(이하
                            ‘서비스’)의 이용과 관련하여 회원과 서비스 제공자
                            간의 권리, 의무 및 책임사항, 그리고 기타 필요한
                            사항을 규정함을 목적으로 합니다.
                        </p>
                    </h2>

                    <h2 className="">
                        제2조 정의
                        <p className="">
                            "서비스"란 [서비스명]이 제공하는 학습 관리 및 강의
                            콘텐츠, 관련 지원 기능 등 온라인 학습 환경을
                            의미합니다.
                        </p>
                        <p className="">
                            "회원"이란 약관에 동의하고 서비스를 이용하는 모든
                            사용자(일반 회원, 기업 회원 포함)를 말합니다.
                        </p>
                        <p className="">
                            "아이디(ID)"와 "비밀번호"란 회원의 서비스 이용을
                            위해 회원이 설정하고 [서비스명]이 승인한 고유의 식별
                            수단을 의미합니다.
                        </p>
                    </h2>

                    <h2 className="">
                        제3조 약관의 게시 및 효력
                        <p className="">
                            이 약관은 [서비스명] 홈페이지 또는 애플리케이션을
                            통해 게시함으로써 효력을 발생합니다.
                        </p>
                        <p className="">
                            [서비스명]은 관련 법규를 준수하며, 필요 시 약관
                            내용을 변경할 수 있습니다. 변경된 약관은 변경된
                            내용이 명확히 표시된 방식으로 공지합니다.
                        </p>
                    </h2>

                    <h2 className="">제4조 회원 가입 및 관리</h2>
                </div>

                {/* 동의 체크란 */}
                <div className="flex items-center gap-1.5">
                    <input
                        type="checkbox"
                        className="flex h-2.5 w-2.5 appearance-none items-center justify-center border border-[#D1D1D1] bg-transparent checked:bg-[#FAC453] checked:text-black checked:content-['✔'] focus:outline-none"
                    />
                    <p className="text-[0.6875rem] font-medium text-[#D1D1D1]">
                        위 내용에 동의합니다.
                    </p>
                </div>

                {/* 회원가입 버튼 */}
                <button className="mt-2 h-12 w-[19.5rem] self-center rounded-[0.1875rem] bg-[#EEB02F] text-black">
                    회원가입
                </button>
            </div>

            {/* 닫기 버튼 */}
            <img
                src={close}
                alt="Close Button"
                className="mr-[1.9375rem] mt-[1.9375rem] w-3"
            />
        </div>
    );
}

export default Service;
