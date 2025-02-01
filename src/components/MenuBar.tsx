import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {getLeafCount, getUserLoginData} from '@/redux/selector';
import logo from '@/assets/images/logo.svg';
import homeYellow from '@/assets/images/menuBar/homeYellow.svg';
import home from '@/assets/images/menuBar/home.svg';
import user from '@/assets/images/MyPage/user.svg';
import userYellow from '@/assets/images/MyPage/userYellow.svg';
import bookShelf from '@/assets/images/menuBar/bookShelf.svg';
import bookShelfYellow from '@/assets/images/menuBar/bookShelfYellow.svg';
import aiGray from '@/assets/images/menuBar/aiGray.svg';
import aiYellow from '@/assets/images/menuBar/aiYellow.svg';
import community from '@/assets/images/menuBar/community.svg';
import communityYellow from '@/assets/images/menuBar/communityYellow.svg';
import setting from '@/assets/images/menuBar/setting.svg';
import settingYellow from '@/assets/images/MyPage/settingYellow.svg';
import leaf from '@/assets/images/menuBar/leaf.svg';
import goldenLeaf from '@/assets/images/menuBar/goldenLeaf.svg';
import logout from '@/assets/images/menuBar/logout.svg';
import leftArrow2 from '@/assets/images/menuBar/leftArrow2.svg';
import rightArrow2 from '@/assets/images/menuBar/rightArrow2.svg';
import leftArrowBlack from '@/assets/images/menuBar/leftArrowBlack.svg';
import rightArrowLight from '@/assets/images/menuBar/rightArrowLight.svg';
import {useTheme} from '@/constants/ThemeProvider';
import leafLight from '@/assets/images/menuBar/leafLight.svg';

export default function MenuBar() {
    const leafCount = useSelector(getLeafCount);
    const navigate = useNavigate();
    const userLoginData = useSelector(getUserLoginData);
    const location = useLocation();
    const {isDarkMode} = useTheme();

    const [activeMenu, setActiveMenu] = useState('/home');
    const [isOpen, setIsOpen] = useState(true); // MenuBar 상태 관리

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMyPageClick = () => {
        if (userLoginData.isLogined) {
            navigate('/settings/myPage', {
                state: {backgroundLocation: location},
            });
        } else {
            navigate('/login', {
                state: {backgroundLocation: location},
            });
        }
        setActiveMenu('myPage');
    };

    const handleCommunityClick = () => {
        setActiveMenu('community');
        navigate('/settings/community', {
            state: {backgroundLocation: location},
        });
    };

    const handleSettingsClick = () => {
        setActiveMenu('display');
        navigate('/settings/display', {state: {backgroundLocation: location}});
    };

    const getMenuClass = (menu: string) =>
        `rounded-lg px-3 py-2.5 transition ${
            activeMenu === menu
                ? isDarkMode
                    ? 'bg-[#2D2F39]'
                    : 'bg-[#d4d4d4]'
                : isDarkMode
                  ? 'hover:bg-[#4a4a4a] active:bg-[#2D2F39]'
                  : 'hover:bg-[#EEEEEE] active:bg-[#d4d4d4]'
        }`;

    const getMenuIcon = (
        menu: string,
        defaultIcon: string,
        activeIcon: string,
    ) => (activeMenu === menu ? activeIcon : defaultIcon);

    return (
        <div
            className={`relative h-full min-h-screen w-full py-[2.375rem] transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-[90%]'
            }`}>
            <ul
                className={`relative flex h-full w-full flex-col justify-items-center rounded-xl bg-[#111111] p-6 shadow-right ${
                    isDarkMode
                        ? 'bg-[#111111] text-white shadow-[#292929]'
                        : 'bg-[#fdfdfd] text-black shadow-[#a5a5a5]'
                }`}>
                {/* 로고 */}
                <div className="flex w-full items-center justify-center">
                    <img src={logo} alt="SENG logo" className="w-11" />
                </div>

                {/* 닫기/열기 버튼 */}
                <button
                    type="button"
                    onClick={toggleMenu}
                    className={`absolute right-[-1.1rem] top-8 rounded-lg border ${
                        isDarkMode
                            ? 'border-[#292929] bg-[#282318] hover:bg-[#4a4a4a] active:bg-[#2D2F39]'
                            : 'border-[#c4c4c4] bg-[#f5f5f5] hover:bg-[#EEEEEE] active:bg-[#d4d4d4]'
                    } p-1.5`}>
                    <img
                        src={
                            isDarkMode
                                ? isOpen
                                    ? leftArrow2
                                    : rightArrow2
                                : isOpen
                                  ? leftArrowBlack
                                  : rightArrowLight
                        }
                        alt="Toggle Menu Bar"
                    />
                </button>

                {/* 메인 메뉴 */}
                <li
                    className={`my-6 flex flex-col items-center gap-2 border-y-2 py-6 ${isDarkMode ? 'border-[#2D2F39]' : 'border-[#c4c4c4]'}`}>
                    <p className="text-[0.625rem] font-medium text-[#888888]">
                        MAIN
                    </p>
                    <Link
                        to="/home"
                        onClick={() => setActiveMenu('home')}
                        className={getMenuClass('home')}>
                        <img
                            src={getMenuIcon('home', home, homeYellow)}
                            alt="home"
                        />
                    </Link>
                    <button
                        onClick={handleMyPageClick}
                        type="button"
                        className={getMenuClass('myPage')}>
                        <img
                            src={getMenuIcon('myPage', user, userYellow)}
                            alt="user"
                        />
                    </button>
                    <Link
                        to="/library"
                        onClick={() => setActiveMenu('library')}
                        className={getMenuClass('library')}>
                        <img
                            src={getMenuIcon(
                                'library',
                                bookShelf,
                                bookShelfYellow,
                            )}
                            alt="book Shelf"
                        />
                    </Link>
                    <Link
                        to="/home/ai"
                        onClick={() => setActiveMenu('ai')}
                        className={getMenuClass('ai')}>
                        <img
                            src={getMenuIcon('ai', aiGray, aiYellow)}
                            alt="ai"
                        />
                    </Link>
                    <button
                        type="button"
                        onClick={handleCommunityClick}
                        className={getMenuClass('community')}>
                        <img
                            src={getMenuIcon(
                                'community',
                                community,
                                communityYellow,
                            )}
                            alt="community"
                        />
                    </button>
                </li>

                {/* 세팅 메뉴 */}
                <li className="flex flex-col items-center gap-[0.5rem]">
                    <p className="text-[0.625rem] font-medium text-[#888888]">
                        SETTINGS
                    </p>
                    <button
                        type="button"
                        onClick={handleSettingsClick}
                        className={getMenuClass('display')}>
                        <img
                            src={getMenuIcon('display', setting, settingYellow)}
                            alt="settings"
                        />
                    </button>
                </li>

                {/* 리프와 로그아웃 */}
                <li className="mt-auto flex flex-col items-center gap-1">
                    <img
                        src={isDarkMode ? leaf : leafLight}
                        alt="leaf"
                        className="rounded-lg px-3 py-2.5"
                    />
                    <p
                        className={`text-[0.6875rem] ${isDarkMode ? 'text-white' : 'text-[#a5a5a5]'}`}>
                        {leafCount % 100}
                    </p>
                    <img
                        src={goldenLeaf}
                        alt="goldenLeaf"
                        className="rounded-lg px-3 py-2.5"
                    />
                    <p className="text-[0.6875rem] text-[#FAC453]">
                        {leafCount / 100}
                    </p>
                    <button
                        type="button"
                        onClick={() =>
                            navigate('/logout', {
                                state: {backgroundLocation: location},
                            })
                        }>
                        <img
                            src={logout}
                            alt="logout"
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-[#EEEEEE]"
                        />
                    </button>
                </li>
            </ul>
        </div>
    );
}
