import React from 'react';
import bookTest from '../assets/images/bookTest.svg';

const Card: React.FC = () => {
  // 내부에서 사용할 데이터
  const books = [
    {
      id: 1,
      title: '오늘하루도, 소심한 야옹이',
      cover: bookTest, // 실제 이미지 경로로 교체
      link: '/read/cat/',
    },
    {
      id: 2,
      title: '오늘하루도, 소심한 야옹이',
      cover: bookTest, // 실제 이미지 경로로 교체
      link: '/read/cat/',
    },
  ];

  const handleRead = (link: string) => {
    // eBook 읽기 페이지로 이동
    window.location.href = link;
  };

  return (
    <div className="bookshelf flex flex-wrap justify-center gap-9">
      {books.map((book) => (
        <div
          key={book.id}
          className="w-[10.5rem] h-[16.5rem] cursor-pointer transform transition-transform duration-200 hover:drop-shadow-glow-yellow hover:animate-wiggle rounded-2xl overflow-hidden"
          onClick={() => handleRead(book.link)}
        >
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transition-opacity duration-300 opacity-80 hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
};

export default Card;
