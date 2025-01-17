import React, {useState} from 'react';
import logoCircle from '..//assets/images/login/logoCircle.svg';
import userYellow from '../assets/images/MyPage/userYellow.svg';
import user from '../assets/images/MyPage/user.svg';
import community from '../assets/images/menuBar/community.svg';
import communityYellow from '../assets/images/menuBar/communityYellow.svg';
import books from '../assets/images/MyPage/books.svg';
import booksYellow from '../assets/images/MyPage/booksYellow.svg';
import ring from '../assets/images/MyPage/ring.svg';
import ringYellow from '../assets/images/MyPage/ringYellow.svg';
import setting from '../assets/images/menuBar/setting.svg';
import settingYellow from '../assets/images/MyPage/settingYellow.svg';
import close from '../assets/images/login/close.svg';

function settingModal() {
    const [activeTab, setActiveTab] = useState('회원정보');

    const menuItems = [
        {name: '회원정보', icon: user, activeIcon: userYellow},
        {name: '커뮤니티', icon: community, activeIcon: communityYellow},
        {name: '도서 관리', icon: books, activeIcon: booksYellow},
        {name: '알림', icon: ring, activeIcon: ringYellow},
        {name: '화면설정', icon: setting, activeIcon: settingYellow},
    ];

    return (
        <div className="flex items-start justify-between rounded-2xl bg-[#111111] pl-5 pr-[1.9375rem]">
            <div className="flex justify-between pb-[17.5rem] pt-[2.8125rem]">
                {/* 탭 */}
                <div className="flex flex-col">
                    <div className="mb-2.5 flex items-center gap-[0.8125rem]">
                        <img src={logoCircle} alt="" className="h-[1.875rem]" />
                        <div className="font-semibold text-[#DBAC4A]">
                            @Noah
                        </div>
                    </div>
                    {/* 메뉴 리스트 */}
                    {menuItems.map(item => (
                        <button
                            key={item.name}
                            type="button"
                            className={`flex h-[2.375rem] w-[15.4375rem] items-center gap-2.5 rounded-[0.3125rem] pl-[0.65rem] transition-colors duration-200 ${
                                activeTab === item.name
                                    ? 'bg-[#2D2F39] text-[#DBAC4A]'
                                    : 'hover:bg-[#292929] hover:text-[#DBAC4A]'
                            }`}
                            onClick={() => setActiveTab(item.name)}>
                            <img
                                src={
                                    activeTab === item.name
                                        ? item.activeIcon
                                        : item.icon
                                }
                                alt={item.name}
                                className="w-4"
                            />
                            <p>{item.name}</p>
                        </button>
                    ))}
                </div>

                {/* 본문 */}
                <div className="ml-[2.9375rem] mr-[4.5rem] flex flex-col">
                    <h1 className="pl-[1.125rem] text-lg font-medium text-[#DBAC4A]">
                        {activeTab}
                    </h1>

                    <div className="my-5 border-[0.5px] border-[#535353]"></div>

                    {/* 여기에 activeTab에 따른 컨텐츠 렌더링 로직 추가 가능 */}
                    <div className="flex flex-col gap-[1.125rem] pl-[1.125rem] pr-[18.4375rem]">
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
                                    className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs text-[#CACACA]">
                                    저장
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[0.5625rem]">
                            <h2 className="text-sm font-semibold text-[#F5F5F5]">
                                이메일
                            </h2>
                            <div className="text-xs font-medium text-[#999999]">
                                kakao.seng@gmail.com
                            </div>
                        </div>

                        <div className="flex flex-col gap-[0.5625rem]">
                            <h2 className="text-sm font-semibold text-[#F5F5F5]">
                                이름
                            </h2>
                            <div className="text-xs font-medium text-[#999999]">
                                카카오
                            </div>
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
                                className="h-[1.5625rem] w-[7.6875rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs font-medium text-[#CACACA]">
                                비밀번호 변경하기
                            </button>
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-sm font-medium text-[#F5F5F5]">
                                로그아웃
                            </h2>
                            <div className="flex items-center justify-between">
                                <div className="text-xs font-medium text-[#999999]">
                                    현재 로그인된 기기에서 로그아웃합니다.
                                </div>
                                <button
                                    type="button"
                                    className="h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#2D2F39] text-xs text-[#CACACA]">
                                    로그아웃
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-sm font-medium text-[#F5F5F5]">
                                회원탈퇴
                            </h2>
                            <div className="flex items-center justify-between">
                                <div className="text-xs font-medium text-[#999999]">
                                    현재 계정을 영구적으로 삭제하고 생성된 모든
                                    도서의 액세스 권한을 제거합니다.
                                </div>
                                <button
                                    type="button"
                                    className="ml-[4.6875rem] h-[1.5625rem] w-[5.4375rem] rounded-[0.1875rem] bg-[#482323] text-xs text-[#CACACA]">
                                    회원탈퇴
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 닫기 버튼 */}
            <button className="pt-[1.9375rem]">
                <img src={close} alt="" className="" />
            </button>
        </div>
    );
}

export default settingModal;
