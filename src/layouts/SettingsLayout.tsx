import {useEffect, useState} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
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
import {useSelector} from 'react-redux';
import {getUserLoginData} from '@/redux/selector';
import {useTheme} from '@/constants/ThemeProvider';

interface SettingLayoutProps {
    backgroundLocation: string;
}

function SettingLayout({backgroundLocation}: SettingLayoutProps) {
    const [activeTab, setActiveTab] = useState('myPage');
    const [clickedButton, setClickedButton] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector(getUserLoginData);
    const {isDarkMode} = useTheme();

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

    useEffect(() => {
        console.log(userData);
    }, [userData]);

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
        <div
            className={`absolute left-1/2 top-1/2 z-10 flex h-screen max-h-[45vw] w-screen max-w-[75vw] -translate-x-1/2 -translate-y-1/2 transform items-start justify-between overflow-hidden rounded-2xl shadow-lg transition ${
                isDarkMode
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#ffffff] text-black'
            }`}>
            {/* 왼쪽 사이드바 */}
            <div className="flex w-[20%] min-w-[15rem] flex-col items-start p-5">
                <div className="mb-4 flex items-center gap-[0.8125rem]">
                    <img src={logo} alt="" className="h-[1.875rem]" />
                    <div className="font-semibold text-[#DBAC4A]">
                        {userData.name}님
                    </div>
                </div>
                {/* 메뉴 리스트 */}
                {menuItems.map(item => (
                    <button
                        key={item.name}
                        type="button"
                        className={`flex h-[2.375rem] w-full items-center gap-2.5 rounded-[0.3125rem] pl-[0.65rem] transition-colors duration-200 ${
                            activeTab === item.name
                                ? isDarkMode
                                    ? 'bg-[#2D2F39] text-[#DBAC4A]'
                                    : 'bg-[#D4D4D4] text-[#000000]'
                                : isDarkMode
                                  ? 'hover:bg-[#292929] hover:text-[#DBAC4A]'
                                  : 'hover:bg-[#EEEEEE] hover:text-[#DBAC4A]'
                        }`}
                        onClick={() => {
                            setActiveTab(item.name);
                            setClickedButton(item.name);
                            navigate(item.path, {
                                state: {
                                    backgroundLocation: location,
                                    user_data: userData,
                                },
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

            {/* 오른쪽 컨텐츠 */}
            <div className="flex flex-1 flex-col overflow-hidden p-5">
                <h1 className="pl-5 text-lg font-medium text-[#DBAC4A]">
                    {menuItems.find(item => item.name === activeTab)?.label}
                </h1>

                <div
                    className={`my-5 border-t transition ${
                        isDarkMode ? 'border-[#535353]' : 'border-[#b1b1b1]'
                    }`}
                />

                {/* 컨텐츠 영역 */}
                <div className="h-full overflow-auto pl-5">
                    <Outlet />
                </div>
            </div>

            {/* 닫기 버튼 */}
            <button
                type="button"
                className="p-8"
                onClick={() => navigate(backgroundLocation)}>
                <img src={close} alt="닫기" />
            </button>
        </div>
    );
}

export default SettingLayout;
