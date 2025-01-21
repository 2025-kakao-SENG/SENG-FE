import React from 'react';
import bookTest from '../assets/images/bookTest.svg';
import read from '@/assets/images/read.svg';
import bin from '@/assets/images/bin.svg';

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
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 3,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 4,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 5,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 6,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 7,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 8,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 9,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 10,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 11,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 12,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 13,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 14,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 15,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 16,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 17,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 18,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 19,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 20,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 21,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 22,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 23,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
        {
            id: 24,
            title: '오늘하루도, 소심한 야옹이',
            cover: bookTest,
            link: '/read/cat/',
        },
    ];

    const handleRead = (link: string) => {
        // eBook 읽기 페이지로 이동
        window.location.href = link;
    };

    return (
        <div
            className="bookshelf flex h-screen flex-wrap justify-center gap-[2.3125rem] overflow-y-scroll py-[4.8125rem] pl-5"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {books.map(book => (
                <div
                    key={book.id}
                    className="group relative h-[16.6875rem] w-[10.4375rem] transform cursor-pointer overflow-hidden rounded-2xl transition-transform duration-200 hover:animate-wiggle hover:drop-shadow-glow-yellow"
                    onClick={() => handleRead(book.link)}>
                    <img
                        src={book.cover}
                        alt={`${book.title} cover`}
                        className="h-full w-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <img
                            src={read}
                            alt="book icon"
                            className="cursor-pointer"
                        />
                        <img
                            src={bin}
                            alt="delete icon"
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
