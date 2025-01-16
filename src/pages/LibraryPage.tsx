import React from 'react';
import Card from '../components/Card';
import bookTest from '../assets/images/bookTest.svg'; // 실제 이미지 경로

function Library() {
    // 폴더1과 폴더2에 있는 책 데이터
    const folderBooks = {
        folder1: [
            {
                id: 1,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/1',
            },
            {
                id: 2,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/2',
            },
            {
                id: 3,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/3',
            },
            {
                id: 4,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/4',
            },
            {
                id: 5,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/5',
            },
            {
                id: 6,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/6',
            },
            {
                id: 7,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/7',
            },
            {
                id: 8,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/8',
            },
            {
                id: 9,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/9',
            },
            {
                id: 10,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/10',
            },
            {
                id: 11,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/11',
            },
            {
                id: 12,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/12',
            },
            {
                id: 13,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/13',
            },
            {
                id: 14,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/14',
            },
        ],
        folder2: [
            {
                id: 1,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/3',
            },
            {
                id: 2,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/4',
            },
            {
                id: 3,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/5',
            },
            {
                id: 4,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/6',
            },
            {
                id: 5,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/7',
            },
            {
                id: 6,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/8',
            },
            {
                id: 7,
                title: '오늘하루도, 소심한 야옹이',
                cover: bookTest,
                link: '/read/cat/9',
            },
        ],
    };

    return (
        <div className="flex h-[61.75rem] flex-col gap-[9.5rem] overflow-y-scroll py-[5.1875rem] pr-[12.6875rem]">
            {Object.keys(folderBooks).map((folderName, index) => (
                <div key={folderName} className="flex flex-col gap-6">
                    {/* 폴더 이름을 "폴더 1", "폴더 2" 형식으로 표시 */}
                    <p>{`폴더 ${index + 1}`}</p>
                    <div className="flex">
                        <Card books={folderBooks[folderName]} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Library;
