import React from 'react';
import FadeIn from './components/FadeIn';
import LoadingSpinner from './components/LoadingSpinner';
import Card from './components/Card';
import bookTest from './assets/images/bookTest.svg';

const books = [
  {
    id: 1,
    title: '오늘하루도, 소심한 야옹이',
    cover: bookTest,
    link: '/read/cat/',
  },
  {
    id: 2,
    title: '오늘하루도, 소심한 야옹이',
    cover: bookTest,
    link: '/read/cat/',
  },
];

const App: React.FC = () => {
  const text = 'Welcome to Your Bookshelf!'; // 애니메이션 텍스트

  const handleRead = (link: string) => {
    // eBook 읽기 페이지로 이동
    window.location.href = link;
  };

  return (
    <div className="flex flex-col items-center justify-around min-h-screen bg-black text-white">
      {/* 페이드인 텍스트 */}
      <FadeIn text={text} />

      {/* 로딩 스피너 */}
      <LoadingSpinner loading={true} />

      {/* 책장 */}
      <div className="bookshelf flex flex-wrap justify-center gap-[37px]">
        {books.map((book) => (
          <Card
            key={book.id}
            title={book.title}
            cover={book.cover}
            onRead={() => handleRead(book.link)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
