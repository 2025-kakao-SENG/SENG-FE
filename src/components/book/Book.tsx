import {useState, useEffect} from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';
import bookMockData from '@/__test__/mocks/bookMockData';
import defaultCanvasConfig from '@/constants/canvasConfig';
import {CanvasConfig} from '@/types/bookType';

function Book() {
    const [bookData] = useState(bookMockData);
    const [canvasConfig, setCanvasConfig] = useState(defaultCanvasConfig);

    // window 크기를 저장할 state
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // 리사이즈 이벤트 핸들러
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // 리스너 등록
        window.addEventListener('resize', handleResize);
        // 언마운트 시 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 캔버스 설정 업데이트
    useEffect(() => {
        updateCanvasConfig(windowSize.width * 0.3);
    }, [windowSize]);

    const updateCanvasConfig = (newWidth: number) => {
        const aspectRatio = 1.414; // 세로/가로 비율
        const newHeight = Math.floor(newWidth * aspectRatio); // 세로 계산

        const newCanvasConfig: CanvasConfig = {
            ...canvasConfig,
            canvas: {
                ...canvasConfig.canvas,
                width: newWidth,
                height: newHeight,
            },
            contents: {
                ...canvasConfig.contents,
                header: {
                    ...canvasConfig.contents.header,
                    font: `bold ${newWidth * 0.04}px Arial`,
                },
                body: {
                    ...canvasConfig.contents.body,
                    font: `bold ${newWidth * 0.02}px Arial`,
                },
                pageNumber: {
                    ...canvasConfig.contents.pageNumber,
                    font: `bold ${newWidth * 0.03}px Arial`,
                },
            },
        };

        setCanvasConfig(newCanvasConfig);
    };

    return (
        <div style={{width: `${canvasConfig.canvas.width * 2}px`, height: `${canvasConfig.canvas.height}px`}}>
            <HTMLFlipBook
                width={canvasConfig.canvas.width}
                height={canvasConfig.canvas.height}
                startPage={0}
                size="stretch"
                minWidth={0}
                maxWidth={10000}
                minHeight={0}
                maxHeight={10000}
                drawShadow
                flippingTime={1500}
                usePortrait={false}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={1}
                showCover={false}
                mobileScrollSupport
                clickEventForward
                useMouseEvents
                swipeDistance={1}
                showPageCorners
                disableFlipByClick
                className={'h-full w-full'}
                style={{}}>
                {bookData.chapters.map((chapter, idx) => (
                    <Page
                        key={idx}
                        pageNumber={idx + 1}
                        pageData={chapter}
                        canvasConfig={canvasConfig}
                    />
                ))}
            </HTMLFlipBook>
        </div>
    );
}

export default Book;
