import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {getLeafCount, getUserLoginData} from '@/redux/selector';
import logo from '@/assets/images/logo.svg';
import home from '@/assets/images/menuBar/home.svg';
import user from '@/assets/images/menuBar/user.svg';
import bookshelf from '@/assets/images/menuBar/bookShelf.svg';
import aiGray from '@/assets/images/menuBar/aiGray.svg';
import community from '@/assets/images/menuBar/community.svg';
import setting from '@/assets/images/menuBar/setting.svg';
import leaf from '@/assets/images/menuBar/leaf.svg';
import goldenLeaf from '@/assets/images/menuBar/goldenLeaf.svg';
import logout from '@/assets/images/menuBar/logout.svg';
import leftArrow2 from '@/assets/images/menuBar/leftArrow2.svg';
import rightArrow2 from '@/assets/images/menuBar/rightArrow2.svg';

export default function MenuBar() {
    const leafCount = useSelector(getLeafCount);
    const navigate = useNavigate();
    const userLoginData = useSelector(getUserLoginData);
    const location = useLocation();

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
        setActiveMenu('/settings/community');
        navigate('/settings/community', {
            state: {backgroundLocation: location},
        });
    };

    const handleSettingsClick = () => {
        setActiveMenu('/settings/display');
        navigate('/settings/myPage', {state: {backgroundLocation: location}});
    };

    const getMenuClass = (menu: string) =>
        `rounded-lg px-3 py-2.5 ${
            activeMenu === menu ? 'bg-[#2D2F39]' : 'hover:bg-[#4a4a4a]'
        }`;

    return (
        <div
            className={`relative h-full min-h-screen w-full py-[2.375rem] transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-[6rem]'
            }`}>
            <ul className="relative flex h-full w-full flex-col justify-items-center rounded-xl bg-[#111111] p-6 shadow-right">
                {/* 로고 */}
                <div>
                    <img src={logo} alt="SENG logo" className="w-11" />
                </div>

                {/* 닫기/열기 버튼 */}
                <button
                    type="button"
                    onClick={toggleMenu}
                    className="absolute right-[-1.1rem] top-8 rounded-lg border border-[#292929] bg-[#282318] p-1.5 hover:bg-[#4a4a4a] active:bg-[#2D2F39]">
                    <img
                        src={isOpen ? leftArrow2 : rightArrow2}
                        alt="Toggle Menu Bar"
                    />
                </button>

                {/* 메인 메뉴 */}
                <li className="my-6 flex flex-col items-center gap-2 border-y-2 border-[#2D2F39] py-6">
                    <p className="text-[0.625rem] font-medium text-[#888888]">
                        MAIN
                    </p>
                    <Link to="/home" onClick={() => setActiveMenu('home')}>
                        <img
                            src={home}
                            alt="home"
                            className={getMenuClass('home')}
                        />
                    </Link>
                    <button onClick={() => handleMyPageClick()} type="button">
                        <img
                            src={user}
                            alt="user"
                            className={getMenuClass('myPage')}
                        />
                    </button>
                    <Link
                        to="/library"
                        onClick={() => setActiveMenu('library')}>
                        <img
                            src={bookshelf}
                            alt="bookshelf"
                            className={getMenuClass('library')}
                        />
                    </Link>
                    <Link to="/home/ai" onClick={() => setActiveMenu('ai')}>
                        <img
                            src={aiGray}
                            alt="ai"
                            className={getMenuClass('ai')}
                        />
                    </Link>
                    <button type="button" onClick={handleCommunityClick}>
                        <img
                            src={community}
                            alt="community"
                            className={getMenuClass('community')}
                        />
                    </button>
                </li>

                {/* 세팅 메뉴 */}
                <li className="flex flex-col items-center gap-[0.5rem]">
                    <p className="text-[0.625rem] font-medium text-[#888888]">
                        SETTINGS
                    </p>
                    <button type="button" onClick={handleSettingsClick}>
                        <img
                            src={setting}
                            alt="settings"
                            className={getMenuClass('display')}
                        />
                    </button>
                </li>

                {/* 리프와 로그아웃 */}
                <li className="mt-auto flex flex-col items-center gap-1">
                    <img
                        src={leaf}
                        alt="leaf"
                        className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-[#4a4a4a] active:bg-[#2D2F39]"
                    />
                    <p className="text-[0.6875rem] text-white">
                        {leafCount % 100}
                    </p>
                    <img
                        src={goldenLeaf}
                        alt="goldenLeaf"
                        className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-[#4a4a4a] active:bg-[#2D2F39]"
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
                            className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-[#4a4a4a] active:bg-[#2D2F39]"
                        />
                    </button>
                </li>
            </ul>
        </div>
    );
}
