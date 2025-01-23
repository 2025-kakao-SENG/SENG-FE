import {useState, useEffect, useRef} from 'react';
import HTMLFlipBook from 'react-pageflip';
import bookMockData from '@/__test__/mocks/bookMockData';
import {initialState} from '@/redux/slice/createBookSlice';
import defaultCanvasConfig from '@/constants/canvasConfig';
import {CanvasConfig} from '@/types/book/canvasType';
import Page from '@/components/book/Page';

import useBookHeadApi from '@/hooks/apis/book/useBookHeadApi';
import useBookContentApi from '@/hooks/apis/book/useBookContentApi';
import {useDispatch, useSelector} from 'react-redux';
import {getBookCreatingData, getCreateContentSignal} from '@/redux/selector';
import {
    BookHeadApiRequest,
    BookHeadApiResponse,
} from '@/types/apis/book/bookHeadApiTypes';
import {BookData, Chapter, ParsedContent} from '@/types/book/bookDataType';
import {produce} from 'immer';
import parseJsonString from '@/utils/book/parseJsonString';
import {
    BookContentApiRequest,
    BookContentApiResponse,
} from '@/types/apis/book/bookContentApiTypes';

import parseHTMLString from '@/utils/book/parseHTMLString';
import splitContentByCanvasWidth from '@/utils/book/splitContentByCanvasWidth';
import {setCreateContentPid} from '@/redux/slice/createContentSlice';
import FlipButton from '@/components/FlipButton';

// 책 테마화

// [만들 것들]
// 만들 함수 및 데이터 타입(서재 고려 해야함)
// $ 1. 책 Law 데이터 타입
// $ 2. 텍스트 파싱 함수
// $ 3. 텍스트 끊는 함수 (줄마다 끊어 줘야 함)
// $ 4. 책 가공 정보 데이터 타입 (그리기 위한 textLayout 정보) + 책 가공 컨텐츠 데이터 타입 => 책 가공 데이터 타입

// $ 5. 일반 텍스트 출력 함수
// $ 6. 애니매이션 텍스트 입력 함수

// $ 8. 캔버스 데이터 타입 (어느 크기에 어느 좌표에 어느 테마에)
// $ 9. 캔버스 페이지 단위 출력 함수

// $ 10. 북 컴포넌트
// $ 11. 페이지 넘기기 버튼, 이전 페이지 버튼

// [시나리오]
// 1. AI 생성하기 버튼 클릭
// 제목 컨텐츠 API 호출 (manifest)
// 책 처음으로 넘기는 애니매이션 (로딩)
// 버튼 로딩 상태로 변경 (로딩)

function Book() {
    const dispatch = useDispatch();
    const createBookData = useSelector(getBookCreatingData);
    const createContentSignal = useSelector(getCreateContentSignal);
    const {bookHeadApi, isLoading: isBookHeadLoading} = useBookHeadApi();
    const {bookContentApi, isLoading: isBookContentLoading} =
        useBookContentApi();

    const bookSizeRatioPC = 0.27;
    const bookSizeRatioTablet = 0.6;
    const boundaryWidth = 768;
    const prevWidthRef = useRef<number>(window.innerWidth);
    const [canvasConfig, setCanvasConfig] = useState(defaultCanvasConfig);

    const [bookData, setBookDate] = useState<BookData>(bookMockData);
    const pageNumber = useRef<number>(0);

    const [createCompleteMessage, setCreateCompleteMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flipBookRef = useRef<{pageFlip: () => any}>(null);

    const fetchBookHeadApi = async () => {
        try {
            const request: BookHeadApiRequest = {
                user_pid: createBookData.userPid,
                category_arr: createBookData.categoriesArr,
            };

            const response: BookHeadApiResponse = await bookHeadApi(request);

            if (response.success) {
                pageNumber.current = 0;
                setBookDate(
                    produce(bookData, draft => {
                        const outline = parseJsonString(response.data.outline);

                        const chapters: Chapter[] = outline.map(
                            (chapter: Chapter, chapterIdx: number) => ({
                                chapterIndex: chapterIdx,
                                chapterTitle: chapter.chapterTitle,
                                subChapters: chapter.subChapters.map(
                                    (subTitle, subIdx) => ({
                                        subChapterIndex: subIdx,
                                        subChapterTitle: subTitle,
                                        subChapterContent: [],
                                        // eslint-disable-next-line no-plusplus
                                        pageNumber: ++pageNumber.current,
                                    }),
                                ),
                            }),
                        );

                        if (draft && draft.metadata) {
                            draft.metadata.pid = response.data.pid;
                            draft.metadata.title = response.data.title;
                            draft.metadata.category = response.data.category;
                            draft.metadata.created_at =
                                response.data.created_at;
                            draft.metadata.generated_date =
                                response.data.generated_date;
                            draft.chapters = chapters;
                        }
                    }),
                );

                dispatch(setCreateContentPid(parseInt(response.data.pid, 10)));
            } else {
                setErrorMessage(response.error);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('책 생성 중 오류가 발생했습니다.');
            }
        }
    };

    const fetchBookContentApi = async () => {
        const request: BookContentApiRequest = {
            pid: parseInt(bookData.metadata.pid, 10),
        };

        try {
            const response: BookContentApiResponse =
                await bookContentApi(request);
            if (response.success && 'data' in response) {
                setBookDate(
                    produce(bookData, draft => {
                        const {
                            chapterIndex: nextChapterIndex,
                            subChapterIndex: nextSubChapterIndex,
                            generatedContent,
                        } = response.data;

                        const currentChapterIndex =
                            nextSubChapterIndex === 0
                                ? Math.max(nextChapterIndex - 1, 0)
                                : nextChapterIndex;

                        const currentSubChapterIndex =
                            nextSubChapterIndex === 0
                                ? bookData.chapters[currentChapterIndex]
                                      .subChapters.length - 1
                                : nextSubChapterIndex - 1;

                        const parsedContent: ParsedContent = parseHTMLString(
                            generatedContent,
                            bookData.chapters[currentChapterIndex].chapterTitle,
                            bookData.chapters[currentChapterIndex].subChapters[
                                currentSubChapterIndex
                            ].subChapterTitle,
                        );

                        const splitedContent = splitContentByCanvasWidth(
                            parsedContent.content,
                            canvasConfig,
                        );

                        draft.chapters[currentChapterIndex].subChapters[
                            currentSubChapterIndex
                        ].subChapterContent = splitedContent;
                    }),
                );
            } else if (response.success && 'message' in response) {
                setCreateCompleteMessage(response.message);
            } else if ('error' in response) {
                setErrorMessage(response.error);
            } else {
                setErrorMessage('콘텐츠 생성 중 오류가 발생했습니다.');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('책 생성 중 오류가 발생했습니다.');
            }
        }
    };

    // 캔버스 초기 설정 업데이트 & 리사이즈 함수 등록
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
                        font: `bold ${newWidth * canvasConfig.canvas.headerSizeRatio}px Arial`,
                    },
                    subHeader: {
                        ...canvasConfig.contents.subHeader,
                        font: `bold ${newWidth * canvasConfig.canvas.subHeaderSizeRatio}px Arial`,
                    },
                    body: {
                        ...canvasConfig.contents.body,
                        font: `bold ${newWidth * canvasConfig.canvas.bodySizeRatio}px Arial`,
                    },
                    pageNumber: {
                        ...canvasConfig.contents.pageNumber,
                        font: `bold ${newWidth * canvasConfig.canvas.pageNumberSizeRatio}px Arial`,
                    },
                },
            };

            setCanvasConfig(newCanvasConfig);
        };

        // 초기 설정
        const initialWidth = window.innerWidth;
        if (initialWidth > boundaryWidth) {
            updateCanvasConfig(initialWidth * bookSizeRatioPC);
        } else {
            updateCanvasConfig(initialWidth * bookSizeRatioTablet);
        }

        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const prevWidth = prevWidthRef.current;

            // 경계선을 넘었는지 확인
            if (
                (prevWidth <= boundaryWidth && currentWidth > boundaryWidth) ||
                (prevWidth > boundaryWidth && currentWidth <= boundaryWidth)
            ) {
                if (currentWidth > boundaryWidth) {
                    // Tablet -> PC
                    updateCanvasConfig(currentWidth * bookSizeRatioPC * 2.2);
                } else {
                    // PC -> Tablet
                    updateCanvasConfig(currentWidth * bookSizeRatioTablet);
                }
            }

            // 이전 너비 업데이트
            prevWidthRef.current = currentWidth;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 책 기본 정보 가져오기
    useEffect(() => {
        if (createBookData === initialState) {
            return;
        }
        fetchBookHeadApi();
    }, [createBookData]);

    // 책 컨텐츠 정보 가져오기 (AISideBar 에서 클릭)
    useEffect(() => {
        if (createBookData === initialState) {
            return;
        }
        fetchBookContentApi();
    }, [createContentSignal]);

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

    return (
        <div className="flex h-full w-full">
            {/* PC 용 FlipBook - PC 이상에서만 표시 */}
            <div className="hidden h-full w-auto items-center justify-center TB:flex">
                <div className="flex h-full w-auto flex-none items-center justify-center gap-x-8 p-2">
                    {/* 이전 페이지 버튼 */}
                    <FlipButton direction="prev" onClick={handleFlipPrev} />

                    {/* FlipBook 컴포넌트 */}
                    <div
                        style={{
                            width: canvasConfig.canvas.width * 2,
                            height: canvasConfig.canvas.height,
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
                            flippingTime={700}
                            usePortrait={false}
                            startZIndex={0}
                            autoSize
                            maxShadowOpacity={1.3}
                            showCover={false}
                            mobileScrollSupport
                            clickEventForward
                            useMouseEvents={false}
                            swipeDistance={1}
                            showPageCorners={false}
                            disableFlipByClick
                            className="h-full w-full"
                            style={{}}>
                            {bookData?.chapters.map(chapter =>
                                chapter.subChapters.map(
                                    (subChapter, subIdx) => (
                                        <Page
                                            key={`page-${chapter.chapterIndex}-${subChapter.subChapterIndex}`}
                                            pageNumber={subChapter.pageNumber}
                                            chapterData={chapter}
                                            subChapterIndex={subIdx}
                                            canvasConfig={canvasConfig}
                                        />
                                    ),
                                ),
                            )}
                        </HTMLFlipBook>
                    </div>

                    {/* 다음 페이지 버튼 */}
                    <FlipButton direction="next" onClick={handleFlipNext} />
                </div>
            </div>

            {/* 태블릿 및 모바일 용 ScrollBook - PC 미만에서만 표시 */}
            <div className="block TB:hidden">
                <div className="hide-scrollbar flex h-full w-full flex-col items-start justify-start overflow-y-auto p-4">
                    {/* 로딩 및 메시지 표시 */}
                    <div className="mb-4">
                        {isBookHeadLoading && (
                            <div className="text-gray-700">
                                책 정보를 가져오는 중...
                            </div>
                        )}
                        {isBookContentLoading && (
                            <div className="text-gray-700">
                                콘텐츠를 생성하는 중...
                            </div>
                        )}
                        {createCompleteMessage && (
                            <div className="text-green-500">
                                {createCompleteMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="text-red-500">{errorMessage}</div>
                        )}
                    </div>

                    {/* 페이지 목록 */}
                    {bookData?.chapters.map(chapter =>
                        chapter.subChapters.map((subChapter, subIdx) => (
                            <div
                                key={`scroll-page-${chapter.chapterIndex}-${subChapter.subChapterIndex}`}
                                className="mb-8 w-full">
                                <Page
                                    pageNumber={subChapter.pageNumber}
                                    chapterData={chapter}
                                    subChapterIndex={subIdx}
                                    canvasConfig={canvasConfig}
                                />
                            </div>
                        )),
                    )}
                </div>
            </div>
        </div>
    );
}

export default Book;
