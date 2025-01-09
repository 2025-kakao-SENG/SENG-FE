import React, { useEffect } from 'react';
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
import leftArrow from '../assets/images/menuBar/leftArrow.svg';

export default function MenuBar() {

    return (
        <>
            <div className="flex flex-col justify-items-center p-6 bg-[#111111] rounded-xl shadow-right relative">

                {/* 로고 */}
                <div className="">
                    <img src={logo} alt="SENG logo" className="w-11" />
                </div>

                {/* 닫기 버튼 */}
                <div className="absolute bg-[#282318] p-1.5 rounded-lg border border-[#292929] top-8 right-[-1rem]">
                    <img src={leftArrow} alt="Close Menu Bar Button" className="" />
                </div>

                {/* 메인 */}
                <div className="border-y-2 border-[#2D2F39] my-6 py-6 flex flex-col items-center gap-6">
                    <p className="text-[#888888] text-[0.625rem] font-medium">MAIN</p>
                    <img src={home} alt="home" className="" />
                    <img src={user} alt="user" className="" />
                    <img src={bookshelf} alt="bookshelf" className="" />
                    <img src={aiGray} alt="ai" className="" />
                    <img src={community} alt="community" className="bg-[#2D2F39] py-2.5 px-3 rounded-lg" />
                </div>

                {/* 세팅 */}
                <div className="flex flex-col items-center gap-[1.125rem] pb-[19.5rem]">
                    <p className="text-[#888888] text-[0.625rem] font-medium">SETTINGS</p>
                    <img src={setting} alt="" className="" />
                </div>

                {/* 리프와 로그아웃 */}
                <div className="flex flex-col items-center mt-6 gap-3">
                    <img src={leaf} alt="" className="" />
                    <p className="text-white text-[0.6875rem]">47</p>
                    <img src={goldenLeaf} alt="" className="" />
                    <p className="text-[#FAC453] text-[0.6875rem]">2</p>
                    <img src={logout} alt="" className="" />
                </div>
            </div>
        </>
    )
}

