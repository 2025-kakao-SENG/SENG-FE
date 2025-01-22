import React, {useState} from 'react';
import highlight from '../assets/images/palette/highlight.svg';
import downArrow from '../assets/images/palette/downArrow.svg';
import grid from '../assets/images/palette/grid.svg';
import checkBox from '../assets/images/palette/checkBox.svg';
import pen from '../assets/images/palette/pen.svg';
import text from '../assets/images/palette/text.svg';
import chat from '../assets/images/palette/chat.svg';
import interests from '../assets/images/palette/interests.svg';
import transform from '../assets/images/transform.svg';

export default function Palette() {
    const [activeButton, setActiveButton] = useState(null);
    const [isToggled, setIsToggled] = useState(false); // 토글 상태 추가

    const handleButtonClick = buttonName => {
        setActiveButton(buttonName);
    };

    const handleToggle = () => {
        setIsToggled(prevState => !prevState); // 토글 상태 변경
    };

    const getButtonClass = buttonName => {
        return `cursor-pointer rounded-[0.575rem] p-[0.43125rem] ${
            activeButton === buttonName ? 'bg-[#DBAC4A]' : 'hover:bg-[#4a4a4a]'
        }`;
    };

    return (
        <div className="flex w-fit overflow-hidden rounded-[0.575rem] border border-[#DBAC4A] bg-[#111111]">
            <div className="flex items-center gap-[0.43125rem] py-[0.2875rem] pl-[0.2875rem] pr-[0.43125rem]">
                <div className="flex items-center">
                    <img
                        src={highlight}
                        alt="Highlight Button"
                        className={getButtonClass('highlight')}
                        onClick={() => handleButtonClick('highlight')}
                    />
                    <img
                        src={downArrow}
                        alt="Down-arrow Button"
                        className="cursor-pointer"
                    />
                </div>

                <div className="flex items-center">
                    <img
                        src={grid}
                        alt="Grid Button"
                        className={getButtonClass('grid')}
                        onClick={() => handleButtonClick('grid')}
                    />
                    <img
                        src={downArrow}
                        alt="Down-arrow Button"
                        className="cursor-pointer"
                    />
                </div>

                <div className="flex items-center">
                    <img
                        src={checkBox}
                        alt="CheckBox Button"
                        className={getButtonClass('checkBox')}
                        onClick={() => handleButtonClick('checkBox')}
                    />
                    <img
                        src={downArrow}
                        alt="Down-arrow Button"
                        className="cursor-pointer"
                    />
                </div>

                <div className="flex items-center">
                    <img
                        src={pen}
                        alt="Pen Button"
                        className={getButtonClass('pen')}
                        onClick={() => handleButtonClick('pen')}
                    />
                    <img
                        src={downArrow}
                        alt="Down-arrow Button"
                        className="cursor-pointer"
                    />
                </div>

                <div className="flex items-center">
                    <img
                        src={text}
                        alt="Text Button"
                        className={getButtonClass('text')}
                        onClick={() => handleButtonClick('text')}
                    />
                </div>

                <div className="flex items-center">
                    <img
                        src={chat}
                        alt="Chat Button"
                        className={getButtonClass('chat')}
                        onClick={() => handleButtonClick('chat')}
                    />
                </div>

                <div className="flex items-center">
                    <img
                        src={interests}
                        alt="Interests Button"
                        className={getButtonClass('interests')}
                        onClick={() => handleButtonClick('interests')}
                    />
                </div>
            </div>

            {/* 토글되는 Transform 버튼 */}
            <div className="flex items-center justify-center border-l border-[#444444] pb-[0.3rem] pl-[0.7875rem] pr-4 pt-[0.275rem]">
                <div
                    className="relative flex h-[1.8rem] w-[2.8rem] items-center rounded-[0.4375rem] bg-[#383838]"
                    onClick={handleToggle}>
                    <img
                        src={transform}
                        alt="Transform Button"
                        className={`transform cursor-pointer transition-transform duration-500 ease-in-out ${
                            isToggled ? 'translate-x-[1rem]' : 'translate-x-0'
                        }`}
                    />
                </div>
            </div>
        </div>
    );
}
