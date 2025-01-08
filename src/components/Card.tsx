import React from 'react';

interface CardProps {
  title: string; // 책 제목
  cover: string; // 책 표지 이미지 URL
  onRead: () => void; // 책 읽기 클릭 핸들러
}

const Card: React.FC<CardProps> = ({ title, cover, onRead }) => {
  return (
    <div
      className="w-36 h-56 cursor-pointer transform transition-transform duration-200 hover:drop-shadow-glow-yellow hover:animate-wiggle rounded-[15px] overflow-hidden"
      onClick={onRead}
    >
      <img
        src={cover}
        alt={`${title} cover`}
        className="transition-opacity duration-300 opacity-80 hover:opacity-100"
      />
    </div>
  );
};

export default Card;
