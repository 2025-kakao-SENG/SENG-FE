import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import home from '../assets/images/menuBar/home.svg';
import user from '../assets/images/menuBar/user.svg';
import bookshelf from '../assets/images/menuBar/bookshelf.svg';
import aiGray from '../assets/images/menuBar/aiGray.svg';
import community from '../assets/images/menuBar/community.svg';
import setting from '../assets/images/menuBar/setting.svg';
import leaf from '../assets/images/menuBar/leaf.svg';
import goldenLeaf from '../assets/images/menuBar/goldenLeaf.svg';
import logout from '../assets/images/menuBar/logout.svg';
import leftArrow2 from '../assets/images/menuBar/leftArrow2.svg';
import rightArrow from '../assets/images/menuBar/rightArrow.svg';

export default function MenuBar() {
    const [activeMenu, setActiveMenu] = useState('/home');
    const [isOpen, setIsOpen] = useState(true); // MenuBar 상태 관리

    const handleMenuClick = menu => {
        setActiveMenu(menu);
    };

    const getMenuClass = menu =>
        `rounded-lg px-3 py-2.5 ${
            activeMenu === menu ? 'bg-[#2D2F39]' : 'hover:bg-[#4a4a4a]'
        }`;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`relative mr-[6rem] min-h-screen pt-[2.375rem] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[6.4rem]'}`}>
            <ul className="relative flex flex-col justify-items-center rounded-xl bg-[#111111] p-6 shadow-right">
                {/* 로고 */}
                <div>
                    <img src={logo} alt="SENG logo" className="w-11" />
                </div>

                {/* 닫기/열기 버튼 */}
                <button
                    onClick={toggleMenu}
                    className="absolute right-[-1.1rem] top-8 rounded-lg border border-[#292929] bg-[#282318] p-1.5 hover:bg-[#4a4a4a] active:bg-[#2D2F39]">
                    <img
                        src={isOpen ? leftArrow2 : rightArrow}
                        alt="Toggle Menu Bar"
                        className=""
                    />
                </button>

                {/* 메인 */}
                <li className="my-6 flex flex-col items-center gap-2 border-y-2 border-[#2D2F39] py-6">
                    <p className="text-[0.625rem] font-medium text-[#888888]">
                        MAIN
                    </p>
                    <Link to="/home" onClick={() => handleMenuClick('/home')}>
                        <img
                            src={home}
                            alt="home"
                            className={getMenuClass('/home')}
                        />
                    </Link>
                    <Link
                        to="/settings/myPage"
                        onClick={() => handleMenuClick('/settings/myPage')}>
                        <img
                            src={user}
                            alt="user"
                            className={getMenuClass('/settings/myPage')}
                        />
                    </Link>
                    <Link
                        to="/library"
                        onClick={() => handleMenuClick('/library')}>
                        <img
                            src={bookshelf}
                            alt="bookshelf"
                            className={getMenuClass('/library')}
                        />
                    </Link>
                    <Link
                        to="/home/ai"
                        onClick={() => handleMenuClick('/home/ai')}>
                        <img
                            src={aiGray}
                            alt="ai"
                            className={getMenuClass('/home/ai')}
                        />
                    </Link>
                    <Link
                        to="/settings/community"
                        onClick={() => handleMenuClick('/settings/community')}>
                        <img
                            src={community}
                            alt="community"
                            className={getMenuClass('/settings/community')}
                        />
                    </Link>
                </li>

                {/* 세팅 */}
                <li className="flex flex-col items-center gap-[0.5rem] pb-[13.8rem]">
                    <p className="text-[0.625rem] font-medium text-[#888888]">
                        SETTINGS
                    </p>
                    <Link
                        to="/settings/display"
                        onClick={() => handleMenuClick('/settings/display')}>
                        <img
                            src={setting}
                            alt="settings"
                            className={getMenuClass('/settings/display')}
                        />
                    </Link>
                </li>

                {/* 리프와 로그아웃 */}
                <li className="mt-6 flex flex-col items-center gap-1">
                    <img
                        src={leaf}
                        alt="leaf"
                        className="rounded-lg px-3 py-2.5 hover:bg-[#4a4a4a] active:bg-[#2D2F39]"
                    />
                    <p className="text-[0.6875rem] text-white">47</p>
                    <img
                        src={goldenLeaf}
                        alt="goldenLeaf"
                        className="rounded-lg px-3 py-2.5 hover:bg-[#4a4a4a] active:bg-[#2D2F39]"
                    />
                    <p className="text-[0.6875rem] text-[#FAC453]">2</p>
                    <img
                        src={logout}
                        alt="logout"
                        className="rounded-lg px-3 py-2.5 hover:bg-[#4a4a4a] active:bg-[#2D2F39]"
                    />
                </li>
            </ul>
        </div>
    );
}
