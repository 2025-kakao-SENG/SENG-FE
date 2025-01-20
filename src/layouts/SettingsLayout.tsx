import {useEffect, useState} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import logoCircle from '@/assets/images/login/logoCircle.svg';
import userYellow from '@/assets/images/MyPage/userYellow.svg';
import user from '@/assets/images/MyPage/user.svg';
import community from '@/assets/images/menuBar/community.svg';
import communityYellow from '@/assets/images/menuBar/communityYellow.svg';
import books from '@/assets/images/MyPage/books.svg';
import booksYellow from '@/assets/images/MyPage/booksYellow.svg';
import ring from '@/assets/images/MyPage/ring.svg';
import ringYellow from '@/assets/images/MyPage/ringYellow.svg';
import setting from '@/assets/images/menuBar/setting.svg';
import settingYellow from '@/assets/images/MyPage/settingYellow.svg';
import close from '@/assets/images/login/close.svg';

interface SettingLayoutProps {
    backgroundLocation: string;
}

function SettingLayout({backgroundLocation}: SettingLayoutProps) {
    const [activeTab, setActiveTab] = useState('myPage');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('myPage')) {
            setActiveTab('myPage');
        } else if (location.pathname.includes('community')) {
            setActiveTab('community');
        } else if (location.pathname.includes('libraryManagement')) {
            setActiveTab('libraryManagement');
        } else if (location.pathname.includes('notification')) {
            setActiveTab('notification');
        } else if (location.pathname.includes('display')) {
            setActiveTab('display');
        }
    }, [location]);

    const menuItems = [
        {
            name: 'myPage',
            label: '회원정보',
            icon: user,
            activeIcon: userYellow,
            path: '/settings/myPage',
        },
        {
            name: 'community',
            label: '커뮤니티',
            icon: community,
            activeIcon: communityYellow,
            path: '/settings/community',
        },
        {
            name: 'libraryManagement',
            label: '도서 관리',
            icon: books,
            activeIcon: booksYellow,
            path: '/settings/libraryManagement',
        },
        {
            name: 'notification',
            label: '알림',
            icon: ring,
            activeIcon: ringYellow,
            path: '/settings/notification',
        },
        {
            name: 'display',
            label: '화면설정',
            icon: setting,
            activeIcon: settingYellow,
            path: '/settings/display',
        },
    ];

    return (
        <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-start justify-between rounded-2xl bg-[#111111] pl-5 pr-[1.9375rem]">
            <div className="flex justify-between pt-[3.25rem]">
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
                            onClick={() => {
                                setActiveTab(item.name);
                                navigate(item.path, {
                                    state: {backgroundLocation},
                                });
                            }}>
                            <img
                                src={
                                    activeTab === item.name
                                        ? item.activeIcon
                                        : item.icon
                                }
                                alt={item.label}
                                className="w-4"
                            />
                            <p>{item.label}</p>
                        </button>
                    ))}
                </div>

                <div className="ml-[2.9375rem] mr-[4.5rem] flex flex-col">
                    <h1 className="pl-[1.125rem] text-lg font-medium text-[#DBAC4A]">
                        {menuItems.find(item => item.name === activeTab)?.label}
                    </h1>

                    <div className="my-5 border-[0.5px] border-[#535353]" />
                    <div className="h-[41.875rem] w-[53.75rem] pb-5 pl-[1.125rem]">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* 닫기 버튼 */}
            <button
                type="button"
                className="pt-[1.9375rem]"
                onClick={() => navigate(-1)}>
                <img src={close} alt="" className="" />
            </button>
        </div>
    );
}

export default SettingLayout;
