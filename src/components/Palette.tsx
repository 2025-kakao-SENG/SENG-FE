import React, {useState, useEffect} from 'react';
import highlight from '../assets/images/palette/highlight.svg';
import highlightLight from '../assets/images/palette/highlightLight.svg';
import downArrow from '../assets/images/palette/downArrow.svg';
import downArrowLight from '../assets/images/palette/downArrowLight.svg';
import grid from '../assets/images/palette/grid.svg';
import gridLight from '../assets/images/palette/gridLight.svg';
import checkBox from '../assets/images/palette/checkBox.svg';
import checkBoxLight from '../assets/images/palette/checkBoxLight.svg';
import pen from '../assets/images/palette/pen.svg';
import penLight from '../assets/images/palette/penLight.svg';
import text from '../assets/images/palette/text.svg';
import textLight from '../assets/images/palette/textLight.svg';
import chat from '../assets/images/palette/chat.svg';
import chatLight from '../assets/images/palette/chatLight.svg';
import interests from '../assets/images/palette/interests.svg';
import interestsLight from '../assets/images/palette/interestsLight.svg';
import aiYellow from '../assets/images/aiYellow.svg';
import transform from '../assets/images/transform.svg';
import {useTheme} from '@/constants/ThemeProvider';

export default function Palette() {
    const [activeButton, setActiveButton] = useState(null);
    const [isTablet, setIsTablet] = useState(false);
    const {isDarkMode, toggleTheme} = useTheme();

    //  화면 크기 감지하여 태블릿 모드 업데이트
    useEffect(() => {
        const checkScreenSize = () => {
            setIsTablet(window.innerWidth <= 768);
        };

        checkScreenSize(); // 초기 화면 크기 체크

        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleButtonClick = buttonName => {
        setActiveButton(buttonName);
    };

    // 기존 handleToggle을 전역 테마 변경과 동기화
    const handleToggle = () => {
        toggleTheme(); // 전역 테마 변경 (DisplayPage의 toggleTheme과 동일한 기능)
    };

    const getButtonClass = buttonName => {
        return `cursor-pointer rounded-[0.575rem] p-[0.43125rem] transition ${
            activeButton === buttonName
                ? 'bg-[#DBAC4A]'
                : isDarkMode
                  ? 'hover:bg-[#4a4a4a]'
                  : 'hover:bg-[#e2e2e2]'
        }`;
    };

    return (
        <>
            {/* 기본 Palette (데스크톱 & 태블릿 모드) */}
            <div
                className={`flex w-fit overflow-hidden rounded-[0.575rem] border border-[#DBAC4A] bg-[#111111] transition-all duration-300 ${
                    isTablet
                        ? 'absolute bottom-10 left-1/2 -translate-x-1/2 transform'
                        : ''
                } ${
                    isDarkMode
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#fdfdfd] text-black'
                }`}>
                <div className="flex items-center gap-[0.43125rem] py-[0.2875rem] pl-[0.2875rem] pr-[0.43125rem]">
                    <div className="flex items-center">
                        <img
                            src={isDarkMode ? highlight : highlightLight}
                            alt="Highlight Button"
                            className={getButtonClass('highlight')}
                            onClick={() => handleButtonClick('highlight')}
                        />
                        <img
                            src={isDarkMode ? downArrow : downArrowLight}
                            alt="Down-arrow Button"
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center">
                        <img
                            src={isDarkMode ? grid : gridLight}
                            alt="Grid Button"
                            className={getButtonClass('grid')}
                            onClick={() => handleButtonClick('grid')}
                        />
                        <img
                            src={isDarkMode ? downArrow : downArrowLight}
                            alt="Down-arrow Button"
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center">
                        <img
                            src={isDarkMode ? checkBox : checkBoxLight}
                            alt="CheckBox Button"
                            className={getButtonClass('checkBox')}
                            onClick={() => handleButtonClick('checkBox')}
                        />
                        <img
                            src={isDarkMode ? downArrow : downArrowLight}
                            alt="Down-arrow Button"
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center">
                        <img
                            src={isDarkMode ? pen : penLight}
                            alt="Pen Button"
                            className={getButtonClass('pen')}
                            onClick={() => handleButtonClick('pen')}
                        />
                        <img
                            src={isDarkMode ? downArrow : downArrowLight}
                            alt="Down-arrow Button"
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center">
                        <img
                            src={isDarkMode ? text : textLight}
                            alt="Text Button"
                            className={getButtonClass('text')}
                            onClick={() => handleButtonClick('text')}
                        />
                    </div>

                    <div className="flex items-center">
                        <img
                            src={isDarkMode ? chat : chatLight}
                            alt="Chat Button"
                            className={getButtonClass('chat')}
                            onClick={() => handleButtonClick('chat')}
                        />
                    </div>

                    <div className="flex items-center">
                        <img
                            src={isDarkMode ? interests : interestsLight}
                            alt="Interests Button"
                            className={getButtonClass('interests')}
                            onClick={() => handleButtonClick('interests')}
                        />
                    </div>
                </div>

                <div
                    className={`flex items-center justify-center border-l pb-[0.3rem] pl-[0.7875rem] pr-4 pt-[0.275rem] transition ${
                        isDarkMode ? 'border-[#444444]' : 'border-[#B1B1B1]'
                    }`}>
                    {!isTablet ? (
                        // 기본 화면에서는 AiYellow 유지
                        <img
                            src={aiYellow}
                            alt="Yellow Ai Button"
                            className={getButtonClass('aiYellow')}
                            onClick={() => handleButtonClick('aiYellow')}
                        />
                    ) : (
                        // 태블릿 모드에서는 Transform 아이콘 표시
                        <div
                            className={`relative flex h-[1.8rem] w-[2.8rem] items-center rounded-[0.4375rem] transition duration-500 ease-in-out ${
                                isDarkMode ? 'bg-[#383838]' : 'bg-[#B5B5B5]'
                            }`}
                            onClick={handleToggle} // 여기서 toggleTheme을 호출하여 전체 테마 변경
                        >
                            <img
                                src={transform}
                                alt="Transform Button"
                                className={`transform cursor-pointer transition-transform duration-500 ease-in-out ${
                                    isDarkMode
                                        ? 'translate-x-[1rem]'
                                        : 'translate-x-0'
                                }`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
