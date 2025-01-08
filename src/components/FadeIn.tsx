import React, { useEffect } from 'react';
import { gsap } from 'gsap';

interface FadeInProps {
  text: string; // 표시할 텍스트
}

const FadeIn: React.FC<FadeInProps> = ({ text }) => {
  useEffect(() => {
    if (text) {
      gsap.fromTo(
        '.letter',
        { opacity: 0, y: 20 }, // 초기 상태
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1, // 각 글자의 애니메이션 간격
          ease: 'power2.out',
        }
      );
    }
  }, [text]);

  const letters = text.split('');

  return (
    <div className="text-2xl font-semibold flex space-x-1">
      {letters.map((letter, index) => (
        <span key={index} className="letter">
          {letter === ' ' ? '\u00A0' : letter} {/* 공백 처리 */}
        </span>
      ))}
    </div>
  );
};

export default FadeIn;
