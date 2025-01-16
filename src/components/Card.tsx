import React from 'react';

const Card: React.FC<{
    books: Array<{id: number; title: string; cover: string; link: string}>;
}> = ({books}) => {
    const handleRead = (link: string) => {
        // eBook 읽기 페이지로 이동
        window.location.href = link;
    };

    return (
        <div className="bookshelf flex flex-wrap gap-[2.3125rem]">
            {books.map(book => (
                <div
                    key={book.id}
                    className="h-[16.5rem] w-[10.5rem] transform cursor-pointer overflow-hidden rounded-2xl transition-transform duration-200 hover:animate-wiggle hover:drop-shadow-glow-yellow"
                    onClick={() => handleRead(book.link)}>
                    <img
                        src={book.cover}
                        alt={`${book.title} cover`}
                        className="h-full w-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
                    />
                </div>
            ))}
        </div>
    );
};

export default Card;
