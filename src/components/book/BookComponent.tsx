import {useRef} from 'react';
import HTMLFlipBook from 'react-pageflip';

import Page from '@/components/book/Page';

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

function BookComponent() {
    const flipBookRef = useRef<FlipBookRef>(null);

    // 다음 페이지로 이동
    const nextButtonClick = () => {
        flipBookRef.current?.pageFlip().flipNext();
    };

    // 이전 페이지로 이동
    const prevButtonClick = () => {
        flipBookRef.current?.pageFlip().flipPrev();
    };

    return (
        <div>
            <HTMLFlipBook
                width={400}
                height={800}
                ref={flipBookRef} // flipBook에 ref 연결
                style={{}}
                className=""
                startPage={0}
                size="fixed"
                minWidth={400}
                maxWidth={400}
                minHeight={800}
                maxHeight={800}
                drawShadow
                flippingTime={1}
                usePortrait={false}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={1}
                showCover
                mobileScrollSupport
                clickEventForward
                useMouseEvents
                swipeDistance={1}
                showPageCorners
                disableFlipByClick={false}>
                <Page number={1}>Page text 1</Page>
                <Page number={2}>Page text 2</Page>
                <Page number={3}>Page text 3</Page>
                <Page number={4}>Page text 4</Page>
            </HTMLFlipBook>

            {/* 컨트롤 버튼 */}
            <div style={{marginTop: '20px'}}>
                <button type="button" onClick={prevButtonClick}>
                    Previous Page
                </button>
                <button type="button" onClick={nextButtonClick}>
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default BookComponent;
