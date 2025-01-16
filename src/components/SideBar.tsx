import React, {useState} from 'react';
import aiYellow from '../assets/images/aiYellow.svg';
import rightArrow from '../assets/images/sideBar/rightArrow.svg';
import leftArrow from '../assets/images/sideBar/leftArrow.svg';
import aiBlack from '../assets/images/sideBar/aiBlack.svg';
import logoTransparent from '../assets/images/sideBar/logoTransparent.png';
import rightArrow2 from '../assets/images/sideBar/rightArrow2.svg';

export default function SideBar({isModalOpen}) {
    const [activeCategory, setActiveCategory] = useState('');
    const [currentPath, setCurrentPath] = useState([
        '컴퓨터/IT',
        '웹 개발',
        '프론트엔드',
        'JavaScript',
    ]);
    const [categories, setCategories] = useState([]);

    const [isSidebarPartiallyOpen, setIsSidebarPartiallyOpen] = useState(true);

    const handleCategoryClick = category => {
        setActiveCategory(category);
        setCurrentPath([category]);
    };

    const handlePathClick = index => {
        setCurrentPath(currentPath.slice(0, index + 1));
    };

    const handleNextClick = () => {
        if (activeCategory && !currentPath.includes(activeCategory)) {
            setCurrentPath([activeCategory, ...currentPath]);
        }
    };

    const handlePreviousClick = () => {
        if (currentPath.length > 1) {
            setCurrentPath(currentPath.slice(0, currentPath.length - 1));
        }
    };



    return (
        <>
            <div
                className={`fixed right-0 flex h-[57.125rem] w-[23.75rem] transform flex-col rounded-[0.6875rem] bg-[#111111] transition-transform duration-300 ${
                    isSidebarPartiallyOpen
                        ? 'translate-x-0'
                        : 'translate-x-[90%]'
                }`}
                style={{
                    display: isModalOpen ? 'none' : 'block', // 모달 열릴 때 SideBar 숨기기
                }}>
                <div className="pl-[0.5625rem] pt-[0.9375rem]">
                    <button
                        className="rounded-lg px-2 py-2.5 hover:bg-[#4a4a4a]"
                        onClick={() =>
                            setIsSidebarPartiallyOpen(!isSidebarPartiallyOpen)
                        }>
                        <img
                            src={
                                isSidebarPartiallyOpen ? rightArrow : leftArrow
                            }
                            alt="toggle button"
                            className="h-2.5 w-3.5"
                        />
                    </button>
                </div>

                <div className="flex-grow px-[1.0625rem]">
                    <div className="mb-[1.27rem] mt-[1.0625rem]">
                        <img src={aiYellow} alt="" className="h-11 w-10" />
                    </div>

                    <div>
                        <h3 className="text-[0.6875rem] font-extrabold text-[#D4D4D4]">
                            카테고리를 선택해주세요.
                        </h3>
                    </div>

                    <div className="mb-[1.625rem] mt-3 flex flex-wrap gap-x-2 gap-y-[0.4375rem] py-[0.4375rem] pr-[1.125rem] text-[0.6875rem] font-medium text-[#FAC453]">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryClick(category)}
                                className={
                                    activeCategory === category
                                        ? 'rounded-[0.6875rem] bg-gradient-to-r from-[#FFDD87] to-[#FFC752] px-[1.125rem] py-[0.4375rem] text-black'
                                        : 'rounded-[0.6875rem] bg-[#1C1C1C] px-[1.125rem] py-[0.4375rem] hover:bg-[#2D2D2D]'
                                }>
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-2.5">
                        <button
                            className="h-[2.1875rem] w-full rounded-[0.25rem] bg-[#2D2D2D] text-[0.6875rem] font-medium text-[#BEBEBE] hover:bg-[#3D3D3D]"
                            onClick={handlePreviousClick}>
                            이전 카테고리
                        </button>

                        <button
                            className="h-[2.1875rem] w-full rounded-[0.25rem] bg-[#FFC752] text-[0.6875rem] font-medium text-[#111111] hover:bg-[#EEB02F]"
                            onClick={handleNextClick}>
                            다음으로
                        </button>
                    </div>

                    <div className="mb-3 mt-6">
                        <p className="text-[0.6875rem] font-extrabold text-[#D4D4D4]">
                            현재 카테고리
                        </p>
                    </div>

                    <div className="mb-7 w-[20.5rem]">
                        <div className="flex items-center justify-start gap-2 rounded-[0.25rem] bg-[#1C1C1C] px-2.5 py-[0.875rem] text-[0.6875rem] font-medium text-[#F6F6F6]">
                            {currentPath.map((path, index) => (
                                <React.Fragment key={index}>
                                    <button
                                        className={
                                            index === currentPath.length - 1
                                                ? 'text-[#FAC453]'
                                                : 'text-[#F6F6F6]'
                                        }
                                        onClick={() => handlePathClick(index)}>
                                        {path}
                                    </button>
                                    {index !== currentPath.length - 1 && (
                                        <img src={rightArrow2} alt="arrow" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <button className="flex h-[2.1875rem] w-full items-center justify-center gap-1.5 rounded-[0.25rem] bg-[#FFC752] hover:bg-[#EEB02F]">
                        <img src={aiBlack} alt="" className="" />
                        <p className="text-[0.6875rem] font-medium text-[#000000]">
                            생성하기
                        </p>
                    </button>
                </div>

                <div className="mb-0 ml-20">
                    <img src={logoTransparent} alt="" className="" />
                </div>
            </div>
        </>
    );
}
