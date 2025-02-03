import {useState, useEffect, useRef} from 'react';
import HTMLFlipBook from 'react-pageflip';
import bookMockData from '@/constants/bookMockData';
import {resetCreateBookInfo} from '@/redux/slice/createBookSlice';
import defaultCanvasConfig from '@/constants/canvasConfig';
import {CanvasConfig} from '@/types/book/canvasType';
import Page from '@/components/book/page';

import useBookHeadApi from '@/hooks/apis/book/useBookHeadApi';
import useBookContentApi from '@/hooks/apis/book/useBookContentApi';
import {useDispatch, useSelector} from 'react-redux';
import {
    getBookCreatingData,
    getCreateContentSignal,
    getDisplayBookPid,
    getDisplayBookSignal,
} from '@/redux/selector';
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
import {
    SearchBookApiRequest,
    SearchBookApiResponse,
} from '@/types/apis/library/searchBookApiTypes';
import useSearchBookApi from '@/hooks/apis/library/useSearchBookApi';
import {resetDisplayBookInfo} from '@/redux/slice/displayBookSlice';

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
// AI 생성하기 버튼 클릭
// 제목 컨텐츠 API 호출 (manifest)
// 책 처음으로 넘기는 애니매이션 (로딩)
// 버튼 로딩 상태로 변경 (로딩)

function Book() {
    const dispatch = useDispatch();
    const createBookData = useSelector(getBookCreatingData);
    const createContentSignal = useSelector(getCreateContentSignal);
    const displayBookSignal = useSelector(getDisplayBookSignal);
    const displayBookPid = useSelector(getDisplayBookPid);
    const {bookHeadApi, isLoading: isBookHeadLoading} = useBookHeadApi();
    const {bookContentApi, isLoading: isBookContentLoading} =
        useBookContentApi();
    const {searchBookApi, isLoading: isSearchBookLoading} = useSearchBookApi();

    const bookSizeRatioPC = 0.325;
    const bookSizeRatioTablet = 0.7;
    const boundaryWidth = 1100;
    // initialWidth는 1400~ 1800px 사이로 제한
    const initialWidth = useRef<number>(
        Math.min(Math.max(window.innerWidth, 1400), 2500),
    );
    const prevWidthRef = useRef<number>(window.innerWidth);
    const [canvasConfig, setCanvasConfig] = useState(defaultCanvasConfig);

    const [bookData, setBookDate] = useState<BookData>(bookMockData);

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
                setBookDate(
                    produce(bookData, draft => {
                        let pageNumber = 0;
                        const outline = parseJsonString(response.data.outline);
                        const chapters: Chapter[] = outline.map(
                            (chapter: Chapter, chapterIdx: number) => {
                                return {
                                    chapterIndex: chapterIdx,
                                    chapterTitle: chapter.chapterTitle,
                                    subChapters: chapter.subChapters.map(
                                        (subTitle, subIdx) => ({
                                            subChapterIndex: subIdx,
                                            subChapterTitle: subTitle,
                                            subChapterContent: [],
                                            // eslint-disable-next-line no-plusplus
                                            pageNumber: ++pageNumber,
                                        }),
                                    ),
                                };
                            },
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

                        const parsedContent: ParsedContent =
                            parseHTMLString(generatedContent);

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

    const FetchSearchBookApi = async () => {
        if (!displayBookPid) {
            setErrorMessage('책 정보중 Pid 항목이 존재하지 않습니다.');
            return;
        }

        try {
            const request: SearchBookApiRequest = {
                pid: displayBookPid,
            };

            const response: SearchBookApiResponse =
                await searchBookApi(request);

            if (response.status === 'success') {
                setBookDate(
                    produce(bookData, draft => {
                        let pageNumber = 0;
                        const outline = parseJsonString(response.data.outline);
                        const chapters: Chapter[] = outline.map(
                            (chapter: Chapter, chapterIdx: number) => {
                                return {
                                    chapterIndex: chapterIdx,
                                    chapterTitle: chapter.chapterTitle,
                                    subChapters: chapter.subChapters.map(
                                        (subTitle, subIdx) => ({
                                            subChapterIndex: subIdx,
                                            subChapterTitle: subTitle,
                                            subChapterContent: [],
                                            // eslint-disable-next-line no-plusplus
                                            pageNumber: ++pageNumber,
                                        }),
                                    ),
                                };
                            },
                        );

                        if (draft && draft.metadata) {
                            draft.metadata.pid = String(response.data.pid);
                            draft.metadata.title = response.data.title;
                            draft.metadata.category = response.data.category;
                            draft.metadata.created_at =
                                response.data.created_at;
                            draft.metadata.generated_date =
                                response.data.generated_date;
                            draft.chapters = chapters;
                        }

                        // parseContent
                        const semiParsedContent: string[] =
                            response.data.content.split(/(?=\n\n<h1>)/);
                        const parsedContentArray: ParsedContent[] =
                            semiParsedContent.map(content => {
                                return parseHTMLString(content);
                            });

                        const splitedContentArray = parsedContentArray.map(
                            (parsedContent: ParsedContent) => {
                                return splitContentByCanvasWidth(
                                    parsedContent.content,
                                    canvasConfig,
                                );
                            },
                        );

                        let index = 0;
                        draft.chapters.forEach(chapter => {
                            chapter.subChapters.forEach(subChapter => {
                                // eslint-disable-next-line no-param-reassign
                                subChapter.subChapterContent =
                                    // eslint-disable-next-line no-plusplus
                                    splitedContentArray[index++];
                            });
                        });
                    }),
                );
            } else {
                setErrorMessage(response.message);
            }
        } catch {
            setErrorMessage('책 정보를 불러오는 중 오류가 발생했습니다.');
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
        if (initialWidth.current > boundaryWidth) {
            updateCanvasConfig(initialWidth.current * bookSizeRatioPC);
        } else {
            updateCanvasConfig(window.innerWidth * bookSizeRatioTablet);
        }

        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const prevWidth = prevWidthRef.current;

            // 캔버스 너비가 1100px 이상인지 확인
            if (currentWidth > boundaryWidth) {
                // 경계선을 넘었으면 새로운 너비로 업데이트
                if (prevWidth <= boundaryWidth) {
                    updateCanvasConfig(initialWidth.current * bookSizeRatioPC);
                }
            }
            // 경계선을 넘었는지 확인
            else if (
                (prevWidth <= boundaryWidth && currentWidth > boundaryWidth) ||
                (prevWidth > boundaryWidth && currentWidth <= boundaryWidth)
            ) {
                // 경계선을 넘었으면 새로운 너비로 업데이트
                if (currentWidth > boundaryWidth) {
                    // 초기 너비로 돌아가기
                    updateCanvasConfig(initialWidth.current * bookSizeRatioPC);
                } else {
                    // 태블릿 너비로 업데이트
                    updateCanvasConfig(currentWidth * bookSizeRatioTablet);
                }
            }
            // 1100px 이하인지 확인
            else if (currentWidth <= boundaryWidth) {
                updateCanvasConfig(currentWidth * bookSizeRatioTablet);
            }

            // 이전 너비 업데이트
            prevWidthRef.current = currentWidth;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [bookSizeRatioPC]);

    // 책 생성하기 (AISideBar 에서 클릭) or 라이브러리에서 책 가져오기
    useEffect(() => {
        if (displayBookSignal && canvasConfig.canvas.width > 0) {
            FetchSearchBookApi();
            dispatch(resetDisplayBookInfo());
        } else if (createBookData.isCreating) {
            fetchBookHeadApi();
            dispatch(resetCreateBookInfo());
        }
    }, [createBookData, displayBookSignal, canvasConfig.canvas.width]);

    // 책 컨텐츠 정보 가져오기 (AISideBar 에서 클릭)
    useEffect(() => {
        if (bookData.metadata.pid !== 'landingPage') {
            fetchBookContentApi();
        }
    }, [createContentSignal]);

    /* const handleFlipNext = () => {
        const pageFlip = flipBookRef.current?.pageFlip();
        if (pageFlip) {
            pageFlip.flipNext();
        }
    }; */

    /* const handleFlipPrev = () => {
        const pageFlip = flipBookRef.current?.pageFlip();
        if (pageFlip) {
            pageFlip.flipPrev();
        }
    }; */

    return (
        <div className="flex h-full w-full items-center justify-center">
            {(isBookHeadLoading ||
                isBookContentLoading ||
                isSearchBookLoading) && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-b-5 h-32 w-32 animate-spin rounded-full border-t-[7px] border-[#DBAC4A]" />
                        <div className="mt-5 flex flex-col text-[#DBAC4A]">
                            {isBookHeadLoading && '책 정보를 가져오는 중...'}
                            {isBookContentLoading && '콘텐츠를 생성하는 중...'}
                            {isSearchBookLoading && '책 정보를 가져오는 중...'}
                        </div>
                    </div>
                </div>
            )}
            {/* PC 용 FlipBook - PC 이상에서만 표시 */}
            <div className="hidden h-full w-auto items-center justify-center TB:flex TB:flex-col">
                <div className="flex h-full w-auto flex-col items-center justify-center">
                    {/* 이전 페이지 버튼 */}
                    {/* <FlipButton direction="prev" onClick={handleFlipPrev} /> */}

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
                            flippingTime={800}
                            usePortrait={false}
                            startZIndex={0}
                            autoSize
                            maxShadowOpacity={0.5}
                            showCover={false}
                            mobileScrollSupport
                            clickEventForward
                            useMouseEvents
                            swipeDistance={0.5}
                            showPageCorners={false}
                            disableFlipByClick={false}
                            className="h-full w-full"
                            style={{}}>
                            {bookData?.chapters.map(chapter =>
                                chapter.subChapters.map(
                                    (subChapter, subIdx) => (
                                        <Page
                                            key={`page-${chapter}-${chapter.chapterIndex}-${subChapter}-${subChapter.subChapterIndex}`}
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
                    {/* <FlipButton direction="next" onClick={handleFlipNext} /> */}
                </div>
            </div>
            {/* 태블릿 및 모바일 용 ScrollBook - PC 미만에서만 표시 */}
            <div className="block h-full w-full TB:hidden">
                <div className="hide-scrollbar flex h-full w-full flex-col items-start justify-start overflow-y-auto p-4">
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

            {createCompleteMessage && (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-[#111111] p-5">
                        <p className="text-lg text-[#DBAC4A]">
                            {createCompleteMessage}
                        </p>
                        <button
                            type="button"
                            onClick={() => setCreateCompleteMessage('')}
                            className="mt-2 rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b88a3a]">
                            확인
                        </button>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-[#111111] p-5">
                        <p className="text-lg text-[#DBAC4A]">{errorMessage}</p>
                        <button
                            type="button"
                            onClick={() => setErrorMessage('')}
                            className="mt-2 rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b88a3a]">
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Book;
