import React from 'react';

interface CardProps {
  title: string; // 책 제목
  cover: string; // 책 표지 이미지 URL
  onRead: () => void; // 책 읽기 클릭 핸들러
}

const Card: React.FC<CardProps> = ({ title, cover, onRead }) => {
  return (
    <div
      className="w-[10.5rem] h-[16.5rem] cursor-pointer transform transition-transform duration-200 hover:drop-shadow-glow-yellow hover:animate-wiggle rounded-[15px] overflow-hidden"
      onClick={onRead}
    >
      <img
        src={cover}
        alt={`${title} cover`} // 템플릿 리터럴을 올바르게 작성
        className="w-full h-full object-cover transition-opacity duration-300 opacity-80 hover:opacity-100"
      />
    </div>
  );
};

export default Card;
