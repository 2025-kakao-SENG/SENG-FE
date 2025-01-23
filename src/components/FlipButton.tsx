// src/components/FlipButton.jsx

import {useRef, useEffect} from 'react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {gsap} from 'gsap';

interface FlipButtonProps {
    direction: 'prev' | 'next';
    onClick: () => void;
}

function FlipButton({direction, onClick}: FlipButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        const button = buttonRef.current;

        if (button) {
            // 호버 애니메이션
            const handleMouseEnter = () => {
                gsap.to(button, {
                    scale: 1.2,
                    duration: 0.1,
                    ease: 'power3.out',
                });
            };

            const handleMouseLeave = () => {
                gsap.to(button, {scale: 1, duration: 0.3, ease: 'power3.out'});
            };

            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);

            // 클린업
            return () => {
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    return (
        <button
            type="button"
            ref={buttonRef}
            onClick={onClick}
            aria-label={direction === 'prev' ? '이전 페이지' : '다음 페이지'}
            className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gradient-to-r from-[#FAC435] to-[#C58A00] text-white shadow-lg transition-transform duration-300">
            {direction === 'prev' ? (
                <FaArrowLeft className="text-xl" />
            ) : (
                <FaArrowRight className="text-xl" />
            )}
        </button>
    );
}

export default FlipButton;
