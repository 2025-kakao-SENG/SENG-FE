import {useRef, useState} from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';
import bookMockData from '@/__test__/mocks/bookMockData';

// TODO
// 1. 렌더링 최적화 (보이는 6 페이지만 렌더링)

// 2. 캔버스로 그릴 수 있도록 구현

// 3. 페이지 이동 애니매이션
// 3-1. 페이지 이동 버튼
// 3-2. 페이지 드래그

type FlipBookRef = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageFlip: () => any;
};

function Book() {
    const flipBookRef = useRef<FlipBookRef>(null);
    const [bookData, setBookData] = useState(bookMockData);

    // 뷰포트의 30% 너비
    const width = Math.floor(window.innerWidth * 0.3) ;
    const aspectRatio = 1.414; // 세로/가로 비율
    const height = Math.floor(width * aspectRatio); // 세로 계산

    return (
        <HTMLFlipBook
            width={width}
            height={height}
            ref={flipBookRef} // flipBook에 ref 연결
            style={{}}
            className=""
            startPage={0}
            size="fixed"
            minWidth={width}
            maxWidth={width}
            minHeight={height}
            maxHeight={height}
            drawShadow
            flippingTime={1500}
            usePortrait={false}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={1}
            showCover
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            swipeDistance={0}
            showPageCorners
            disableFlipByClick={false}>
            <Page number={1} data={bookData.chapters[0]} />
            <Page number={2} data={bookData.chapters[1]} />
            <Page number={3} data={bookData.chapters[2]} />
            <Page number={4} data={bookData.chapters[3]} />
            <Page number={5} data={bookData.chapters[4]} />
            <Page number={6} data={bookData.chapters[5]} />
            <Page number={7} data={bookData.chapters[6]} />
            <Page number={8} data={bookData.chapters[7]} />
            <Page number={9} data={bookData.chapters[8]} />
            <Page number={10} data={bookData.chapters[9]} />
        </HTMLFlipBook>
    );
}

export default Book;
