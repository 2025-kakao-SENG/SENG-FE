import React, {useRef, useEffect} from 'react';
import {Chapter} from '@/types/book/bookDataType';
import {CanvasConfig} from '@/types/book/canvasType';

type PageProps = React.PropsWithChildren<{
    pageNumber: number;
    chapterData: Chapter;
    subChapterIndex: number;
    canvasConfig: CanvasConfig;
}>;

function Page(
    {pageNumber, chapterData, subChapterIndex, canvasConfig}: PageProps,
    ref: React.Ref<HTMLDivElement>,
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 애니메이션 관련 레퍼런스
    const animationFrameId = useRef<number>();
    const startTimeRef = useRef<number>();
    const opacityHeaderRef = useRef<number>(0);
    const opacitySubChapterRef = useRef<number>(0);
    const opacityBodiesRef = useRef<number[]>([]);
    const duration = 1300; // 각 요소의 페이드인 지속 시간 (밀리초)
    const delayBetweenElements = 300; // 헤더와 서브타이틀 간 지연 시간 (밀리초)
    const delayBetweenSentences = 300; // 서브타이틀과 바디 문장 간 지연 시간 (밀리초)

    const subChapterContent =
        chapterData.subChapters[subChapterIndex]?.subChapterContent || [];

    // 초기화: 컴포넌트가 업데이트될 때마다 불투명도 배열을 초기화
    useEffect(() => {
        opacityBodiesRef.current = subChapterContent.map(() => 0);
        opacityHeaderRef.current = 0;
        opacitySubChapterRef.current = 0;
    }, [subChapterContent]);

    const renderChapter = (ctx: CanvasRenderingContext2D) => {
        const {header} = canvasConfig.contents;
        ctx.font = header.font;
        ctx.fillStyle = header.fillStyle;
        ctx.fillText(
            chapterData.chapterTitle,
            canvasConfig.coordinateCriteria.xRatio * canvasConfig.canvas.width, // 좌측에서 xRatio 위치
            canvasConfig.coordinateCriteria.yRatio * canvasConfig.canvas.height, // 상단에서 yRatio 위치
        );
    };

    const renderSubChapter = (ctx: CanvasRenderingContext2D) => {
        const {subHeader} = canvasConfig.contents;
        ctx.font = subHeader.font;
        ctx.fillStyle = subHeader.fillStyle;
        ctx.fillText(
            chapterData.subChapters[subChapterIndex].subChapterTitle,
            canvasConfig.canvas.width * canvasConfig.coordinateCriteria.xRatio, // 좌측에서 xRatio 위치
            canvasConfig.canvas.height *
                canvasConfig.coordinateCriteria.yRatio +
                canvasConfig.canvas.height *
                    canvasConfig.coordinateCriteria.headerLineSpaceingRatio, // 상단 위치 + 줄 간격
        );
    };

    const renderSubChapterContents = (ctx: CanvasRenderingContext2D) => {
        const {body} = canvasConfig.contents;
        ctx.font = body.font;
        ctx.fillStyle = body.fillStyle;

        subChapterContent.forEach((content: string, index: number) => {
            const opacity = opacityBodiesRef.current[index] || 0;
            ctx.globalAlpha = opacity;
            ctx.fillText(
                content,
                canvasConfig.canvas.width *
                    canvasConfig.coordinateCriteria.xRatio, // 좌측에서 xRatio 위치
                canvasConfig.canvas.height *
                    canvasConfig.coordinateCriteria.yRatio +
                    canvasConfig.canvas.height *
                        (canvasConfig.coordinateCriteria.lineSpaceingRatio *
                            index) +
                    canvasConfig.canvas.height *
                        canvasConfig.coordinateCriteria
                            .headerLineSpaceingRatio *
                        2, // 상단 위치 + 줄 간격 + 헤더 줄 간격
            );
            ctx.globalAlpha = 1; // 다음 그리기를 위해 초기화
        });
    };

    const renderPageNumber = (ctx: CanvasRenderingContext2D) => {
        const {pageNumber: pageStyle} = canvasConfig.contents;
        ctx.font = pageStyle.font;
        ctx.fillStyle = pageStyle.fillStyle;

        const isOdd = pageNumber % 2 === 1; // 홀수 페이지 여부

        ctx.fillText(
            `${pageNumber}`,
            canvasConfig.canvas.width * (isOdd ? 0.1 : 0.9), // 홀수 페이지는 좌측에서 10%, 짝수 페이지는 우측에서 90%
            canvasConfig.canvas.height * 0.95, // 하단에서 5% 위치
        );
    };

    // 캔버스 렌더링 및 애니메이션
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 애니메이션 시작 시점 초기화
        startTimeRef.current = undefined;

        // 이전 애니메이션 취소
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }

        // 캔버스 화질 개선
        const dpi = window.devicePixelRatio || 1;
        const style = getComputedStyle(canvas);
        canvas.width = parseInt(style.width, 10) * dpi;
        canvas.height = parseInt(style.height, 10) * dpi;
        ctx.scale(dpi, dpi);

        // 텍스트 공통 설정
        ctx.textAlign = canvasConfig.contents.textAlign;
        ctx.textBaseline = canvasConfig.contents.textBaseline;
        ctx.direction = canvasConfig.contents.direction;

        const renderFrame = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;

            // 헤더 페이드인
            if (elapsed >= 0 && opacityHeaderRef.current < 1) {
                const headerElapsed = elapsed;
                const headerOpacity = Math.min(headerElapsed / duration, 1);
                opacityHeaderRef.current = headerOpacity;
            }

            // 서브타이틀 페이드인
            const subChapterStartTime = duration + delayBetweenElements; // 헤더가 완료된 후 시작
            if (
                elapsed >= subChapterStartTime &&
                opacitySubChapterRef.current < 1
            ) {
                const subChapterElapsed = elapsed - subChapterStartTime;
                const subChapterOpacity = Math.min(
                    subChapterElapsed / duration,
                    1,
                );
                opacitySubChapterRef.current = subChapterOpacity;
            }

            // 바디 문장들 페이드인
            subChapterContent.forEach((_, index) => {
                const sentenceStartTime =
                    subChapterStartTime +
                    delayBetweenSentences +
                    index * delayBetweenSentences;
                if (
                    elapsed >= sentenceStartTime &&
                    opacityBodiesRef.current[index] < 1
                ) {
                    const sentenceElapsed = elapsed - sentenceStartTime;
                    const sentenceOpacity = Math.min(
                        sentenceElapsed / duration,
                        1,
                    );
                    opacityBodiesRef.current[index] = sentenceOpacity;
                }
            });

            // 캔버스 초기화
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = canvasConfig.canvas.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 헤더 렌더링
            ctx.globalAlpha = opacityHeaderRef.current;
            renderChapter(ctx);
            ctx.globalAlpha = 1; // 초기화

            // 서브타이틀 렌더링
            ctx.globalAlpha = opacitySubChapterRef.current;
            renderSubChapter(ctx);
            ctx.globalAlpha = 1; // 초기화

            // 바디 문장 렌더링
            renderSubChapterContents(ctx);

            // 페이지 번호 렌더링 (항상 완전한 불투명도)
            renderPageNumber(ctx);

            // 모든 애니메이션이 완료되었는지 확인
            const allFadedIn =
                opacityHeaderRef.current >= 1 &&
                opacitySubChapterRef.current >= 1 &&
                opacityBodiesRef.current.every(opacity => opacity >= 1);

            if (!allFadedIn) {
                animationFrameId.current = requestAnimationFrame(renderFrame);
            }
        };

        // 애니메이션 시작
        animationFrameId.current = requestAnimationFrame(renderFrame);

        // 클린업 함수

        // eslint-disable-next-line consistent-return
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [
        canvasConfig,
        chapterData,
        subChapterIndex,
        pageNumber,
        duration,
        delayBetweenElements,
        delayBetweenSentences,
        subChapterContent,
    ]);

    return (
        <div ref={ref} className="h-full w-full">
            <canvas
                ref={canvasRef}
                width={canvasConfig.canvas.width}
                height={canvasConfig.canvas.height}
                data-testid="canvas"
                style={{
                    width: `${canvasConfig.canvas.width}px`,
                    height: `${canvasConfig.canvas.height}px`,
                    backgroundColor: canvasConfig.canvas.backgroundColor,
                }}
            />
        </div>
    );
}

export default React.forwardRef(Page);
