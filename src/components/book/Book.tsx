import {useState, useEffect, useRef} from 'react';
import HTMLFlipBook from 'react-pageflip';
import bookMockData from '@/__test__/mocks/bookMockData';
import defaultCanvasConfig from '@/constants/canvasConfig';
import {CanvasConfig} from '@/types/book/canvasType';
import Page from './Page';

import useBookHeadApi from '@/hooks/apis/book/useBookHeadApi';
import useBookContentApi from '@/hooks/apis/book/useBookContentApi';
import {useSelector} from 'react-redux';
import {getBookCreatingData} from '@/redux/selector';
import {
    BookHeadApiRequest,
    BookHeadApiResponse,
} from '@/types/apis/book/bookHeadApiTypes';
import {BookData} from '@/types/book/bookDataType';
import {produce} from 'immer';

// 책 테마화

// [만들 것들]
// 만들 함수 및 데이터 타입(서재 고려 해야함)
// 1. 책 Law 데이터 타입
// 2. 텍스트 파싱 함수
// 3. 텍스트 끊는 함수 (줄마다 끊어 줘야 함)
// 4. 책 가공 정보 데이터 타입 (그리기 위한 textLayout 정보) + 책 가공 컨텐츠 데이터 타입 => 책 가공 데이터 타입     !! 이 정보 만으로 그릴 수 있어야 함

// 5. 일반 텍스트 출력 함수
// 6. 애니매이션 텍스트 입력 함수

// 8. 캔버스 데이터 타입 (어느 크기에 어느 좌표에 어느 테마에)
// 9. 캔버스 페이지 단위 출력 함수

// 10. 북 컴포넌트
// 11. 페이지 넘기기 버튼, 이전 페이지 버튼

// [시나리오]
// 1. AI 생성하기 버튼 클릭
// 제목 컨텐츠 API 호출 (manifest)
// 책 처음으로 넘기는 애니매이션 (로딩)
// 버튼 로딩 상태로 변경 (로딩)

function Book() {
    const createBookData = useSelector(getBookCreatingData);
    const {bookHeadApi, isLoading: isBookHeadLoading} = useBookHeadApi();
    const {bookContentApi, isLoading: isBookContentLoading} =
        useBookContentApi();

    const [bookData, setBookDate] = useState<BookData>(bookMockData);
    const [canvasConfig, setCanvasConfig] = useState(defaultCanvasConfig);
    const [errorMessage, setErrorMessage] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flipBookRef = useRef<{pageFlip: () => any}>(null);

    // window 크기를 저장할 state
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const fetchBookHead = async () => {
            if (createBookData === null) {
                return;
            }

            const request: BookHeadApiRequest = {
                user_pid: createBookData.userPid,
                category_arr: createBookData.categoriesArr,
            };

            try {
                const response: BookHeadApiResponse =
                    await bookHeadApi(request);

                if (response.success) {
                    setBookDate(
                        produce(draft => {
                            if (draft && draft.metadata) {
                                draft.metadata.pid = response.data.pid;
                                draft.metadata.title = response.data.title;
                                draft.metadata.category =
                                    response.data.category;
                                draft.metadata.created_at =
                                    response.data.created_at;
                                draft.metadata.generated_date =
                                    response.data.generated_date;
                            }
                        }),
                    );

                    console.log(response.data);

                    // parseBookOutline(response.data.outline);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('책 생성 중 오류가 발생했습니다.');
                }
            }
        };
        fetchBookHead();
    }, [createBookData]);

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

        updateCanvasConfig(windowSize.width * 0.33);
    }, [windowSize]);

    const handleFlipNext = () => {
        const pageFlip = flipBookRef.current?.pageFlip();
        if (pageFlip) {
            pageFlip.flipNext();
        }
    };

    const handleFlipPrev = () => {
        const pageFlip = flipBookRef.current?.pageFlip();
        if (pageFlip) {
            pageFlip.flipPrev();
        }
    };

    const handleGoToPage3 = () => {
        const pageFlip = flipBookRef.current?.pageFlip();
        if (pageFlip) {
            pageFlip.flip(1, 'top'); // 페이지 인덱스는 0부터 시작
        }
    };

    return (
        <div
            style={{
                width: `${canvasConfig.canvas.width * 2}px`,
                height: `${canvasConfig.canvas.height}px`,
                maxHeight: `calc(100vh - 2rem)`, // 화면 아래에서 2rem 떨어지도록 제한
                overflow: 'hidden',
            }}>
            <HTMLFlipBook
                ref={flipBookRef}
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
                autoSize
                maxShadowOpacity={1}
                showCover={false}
                mobileScrollSupport
                clickEventForward
                useMouseEvents
                swipeDistance={1}
                showPageCorners
                disableFlipByClick
                className="h-full w-full"
                style={{}}>
                {bookData?.chapters.map((chapter, idx) => (
                    <Page
                        key={idx}
                        pageNumber={idx + 1}
                        pageData={chapter}
                        canvasConfig={canvasConfig}
                    />
                ))}
            </HTMLFlipBook>

            <button type="button" onClick={handleGoToPage3}>
                이전 페이지
            </button>
            <button type="button" onClick={handleFlipNext}>
                다음 페이지
            </button>
        </div>
    );
}

export default Book;
