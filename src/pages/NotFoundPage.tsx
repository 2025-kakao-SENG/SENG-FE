// src/pages/NotFoundPage.jsx

import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {gsap} from 'gsap';
import {FaRegFrown} from 'react-icons/fa'; // 원하는 아이콘 선택

function NotFoundPage() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const messageRef = useRef(null);
    const buttonRef = useRef(null);
    const iconRef = useRef(null); // 아이콘 참조

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            containerRef.current,
            {opacity: 0},
            {opacity: 1, duration: 0.5, ease: 'power3.out'},
        )
            .fromTo(
                iconRef.current,
                {scale: 0.5, opacity: 0},
                {scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out'},
                '-=0.3',
            )
            .fromTo(
                titleRef.current,
                {y: -50, opacity: 0},
                {y: 0, opacity: 1, duration: 0.5, ease: 'power3.out'},
                '-=0.3',
            )
            .fromTo(
                messageRef.current,
                {y: 50, opacity: 0},
                {y: 0, opacity: 1, duration: 0.5, ease: 'power3.out'},
                '-=0.3',
            )
            .fromTo(
                buttonRef.current,
                {y: 50, opacity: 0},
                {y: 0, opacity: 1, duration: 0.1, ease: 'power3.out'},
                '-=0.3',
            );

        // 버튼에 호버 애니메이션 추가
        const button = buttonRef.current as unknown as HTMLButtonElement;
        if (button) {
            const handleMouseEnter = () => {
                gsap.to(button, {
                    scale: 1.05,
                    rotation: 2,
                    duration: 0.3,
                    ease: 'power3.out',
                });
            };

            const handleMouseLeave = () => {
                gsap.to(button, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power3.out',
                });
            };

            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <div
            ref={containerRef}
            className="flex h-screen w-screen flex-col items-center justify-center bg-[#1B1B1B] p-4 text-[#9C9C9C] opacity-100">
            <FaRegFrown className="sm:h-40 sm:w-40 mb-6 h-32 w-32 text-[#EEB02F]" />
            <h1
                ref={titleRef}
                className="mb-4 text-6xl font-bold text-[#EEB02F] opacity-100">
                404
            </h1>
            <p
                ref={messageRef}
                className="mb-6 text-center text-lg opacity-100">
                요청하신 페이지를 찾을 수 없습니다.
            </p>
            <button
                type="button"
                ref={buttonRef}
                onClick={handleGoHome}
                aria-label="홈으로 돌아가기"
                className="rounded-lg bg-[#EEB02F] px-6 py-2 font-semibold text-black opacity-100 shadow-lg transition-transform duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                홈으로 돌아가기
            </button>
        </div>
    );
}

export default NotFoundPage;
