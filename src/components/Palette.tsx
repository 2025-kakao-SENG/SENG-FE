import React, { useEffect } from 'react';
import highlight from '../assets/images/palette/highlight.svg';
import downArrow from '../assets/images/palette/downArrow.svg';
import grid from '../assets/images/palette/grid.svg';
import checkBox from '../assets/images/palette/checkBox.svg';
import pen from '../assets/images/palette/pen.svg';
import text from '../assets/images/palette/text.svg';
import chat from '../assets/images/palette/chat.svg';
import interests from '../assets/images/palette/interests.svg';
import aiYellow from '../assets/images/aiYellow.svg';

export default function Palette() {

    return (
        <>
            <div className="flex bg-[#111111] border border-[#DBAC4A] rounded-[0.575rem]">

                <div className="flex items-center pl-[0.2875rem] py-[0.2875rem] pr-[0.43125rem] gap-[0.43125rem]">
                    <div className="flex">
                        <img src={highlight} alt="" className="p-[0.43125rem]" />
                        <img src={downArrow} alt="" className="" />
                    </div>

                    <div className="flex">
                        <img src={grid} alt="" className="p-[0.43125rem]" />
                        <img src={downArrow} alt="" className="" />
                    </div>

                    <div className="flex">
                        <img src={checkBox} alt="" className="p-[0.43125rem]" />
                        <img src={downArrow} alt="" className="" />
                    </div>

                    <div className="flex">
                        <img src={pen} alt="" className="p-[0.43125rem]" />
                        <img src={downArrow} alt="" className="" />
                    </div>
                    
                    <img src={text} alt="" className="p-[0.43125rem]" />
                    <img src={chat} alt="" className="p-[0.43125rem]" />
                    <img src={interests} alt="" className="p-[0.43125rem]" />
                </div>

                <div className="flex justify-center items-center pt-1.5 pb-[0.6875rem] pl-[1.1875rem] pr-6 border-l border-[#444444]">
                    <img src={aiYellow} alt="" className=" " />
                </div>

            </div>
        </>
    )
}