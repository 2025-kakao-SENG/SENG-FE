import React, { useState } from "react";
import aiYellow from '../assets/images/aiYellow.svg';
import rightArrow from '../assets/images/sideBar/rightArrow.svg';
import aiBlack from '../assets/images/sideBar/aiBlack.svg';
import logoTransparent from '../assets/images/sideBar/logoTransparent.png';
import rightArrow2 from '../assets/images/sideBar/rightArrow2.svg';

export default function SideBar() {
    // 상태 관리: 활성화된 카테고리
    const [activeCategory, setActiveCategory] = useState("");
    const [currentPath, setCurrentPath] = useState(["컴퓨터/IT", "웹 개발", "프론트엔드", "JavaScript"]);

    const handlePathClick = (index) => {
        // 선택한 경로 이후의 버튼 제거
        setCurrentPath(currentPath.slice(0, index + 1));
    };

    // 카테고리 목록
    const categories = [
        "카테고리", "시/에세이", "인문", "경제/경영", "컴퓨터/IT",
        "청소년", "정치/사회", "역사/문화", "예술/대중문화",
        "중/고등참고서", "기술/공학", "외국어", "과학"
    ];

    return (
        <>
            <div className="bg-[#111111] w-[23.75rem] h-[57.125rem] rounded-[0.6875rem] flex flex-col">

                <div className="pt-[0.9375rem] pl-[0.5625rem]">
                    {/* 닫기 버튼 */}
                    <button className="hover:bg-[#1C1C1C] py-2.5 px-2 rounded-lg">
                        <img src={rightArrow} alt="" className="w-3.5 h-2.5" />
                    </button>
                </div>

                <div className="px-[1.0625rem] flex-grow">
                    {/* AI 이미지 */}
                    <div className="mt-[1.0625rem] mb-[1.27rem]">
                        <img src={aiYellow} alt="" className="w-10 h-11" />
                    </div>

                    {/* 카테고리 선택 문구 */}
                    <div className="">
                        <h3 className="text-[#D4D4D4] text-[0.6875rem] font-extrabold">카테고리를 선택해주세요.</h3>
                    </div>

                    {/* 카테고리 선택란 */}
                    <div className="mt-3 pr-[1.125rem] mb-[1.625rem] text-[#FAC453] text-[0.6875rem] font-medium flex flex-wrap gap-x-2 gap-y-[0.4375rem] py-[0.4375rem]">
                        {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(category)} // 클릭 시 상태 변경
                            className={
                                activeCategory === category
                                    ? "bg-gradient-to-r from-[#FFDD87] to-[#FFC752] text-black py-[0.4375rem] px-[1.125rem] rounded-[0.6875rem]"
                                    : "bg-[#1C1C1C] py-[0.4375rem] px-[1.125rem] rounded-[0.6875rem] hover:bg-[#2D2D2D]"
                            }
                        >
                            {category}
                        </button>
                    ))}
                    </div>

                    {/* 이전 및 다음 버튼 */}
                    <div className="flex justify-between items-center gap-2.5">
                        <button
                            className={`text-[0.6875rem] font-medium rounded-[0.25rem] w-full h-[2.1875rem] ${
                                activeCategory === "이전 카테고리"
                                    ? "text-[#111111] bg-[#FFC752] hover:bg-[#EEB02F]"
                                    : "text-[#BEBEBE] bg-[#2D2D2D] hover:bg-[#3D3D3D]"
                            }`}
                            onClick={() => setActiveCategory("이전 카테고리")}
                        >
                            이전 카테고리
                        </button>
                        
                        <button
                            className={`text-[0.6875rem] font-medium rounded-[0.25rem] w-full h-[2.1875rem] ${
                                activeCategory === "다음으로"
                                    ? "text-[#111111] bg-[#FFC752] hover:bg-[#EEB02F]"
                                    : "text-[#BEBEBE] bg-[#2D2D2D] hover:bg-[#3D3D3D]"
                            }`}
                            onClick={() => setActiveCategory("다음으로")}
                        >
                            다음으로
                        </button>
                    </div>

                    {/* 현재 카테고리 문구 */}
                    <div className="mt-6 mb-3">
                        <p className="text-[#D4D4D4] text-[0.6875rem] font-extrabold">현재 카테고리</p>
                    </div>

                    {/* 현재 카테고리 위치 */}
                    <div className="w-[20.5rem] mb-7">
                        <div className="flex bg-[#1C1C1C] rounded-[0.25rem] justify-start items-center py-[0.875rem] px-2.5 font-medium text-[#F6F6F6] text-[0.6875rem] gap-2">
                            {currentPath.map((path, index) => (
                                <React.Fragment key={index}>
                                    <button
                                        className={
                                            index === currentPath.length - 1
                                                ? "text-[#FAC453]"
                                                : "text-[#F6F6F6]"
                                        }
                                        onClick={() => handlePathClick(index)}
                                    >
                                        {path}
                                    </button>
                                    {index !== currentPath.length - 1 && (
                                        <img src={rightArrow2} alt="arrow" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* AI 생성 버튼 */}
                    <button className="bg-[#FFC752] flex justify-center items-center rounded-[0.25rem] w-full h-[2.1875rem] gap-1.5 hover:bg-[#EEB02F]">
                        <img src={aiBlack} alt="" className="" />
                        <p className="text-[#000000] text-[0.6875rem] font-medium">생성하기</p>
                    </button>
                </div>

                <div className="mb-0 ml-20">
                    {/* 투명한 로고 */}
                    <img src={logoTransparent} alt="" className="" />
                </div>
            </div>
        </>
    )
}