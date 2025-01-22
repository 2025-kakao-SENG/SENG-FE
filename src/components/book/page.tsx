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

    const renderChapter = (ctx: CanvasRenderingContext2D) => {
        const {header} = canvasConfig.contents;
        ctx.font = header.font;
        ctx.fillStyle = header.fillStyle;
        ctx.fillText(
            chapterData.chapterTitle,
            canvasConfig.coordinateCriteria.xRatio * canvasConfig.canvas.width, // 좌측에서 10% 위치
            canvasConfig.coordinateCriteria.yRatio * canvasConfig.canvas.height, // 상단에서 10% 위치
        );
    };

    const renderSubChapter = (ctx: CanvasRenderingContext2D) => {
        const {subHeader} = canvasConfig.contents;
        ctx.font = subHeader.font;
        ctx.fillStyle = subHeader.fillStyle;
        ctx.fillText(
            chapterData.subChapters[subChapterIndex].subChapterTitle,
            canvasConfig.canvas.width * canvasConfig.coordinateCriteria.xRatio, // 좌측에서 10% 위치
            canvasConfig.canvas.height *
                canvasConfig.coordinateCriteria.yRatio + // 상단에서 10% 위치
                canvasConfig.canvas.height *
                    canvasConfig.coordinateCriteria.headerLineSpaceingRatio, // 줄 간격
        );
    };
    const renderSubChapterContents = (ctx: CanvasRenderingContext2D) => {
        const {body} = canvasConfig.contents;
        ctx.font = body.font;
        ctx.fillStyle = body.fillStyle;

        const {subChapterContent} = chapterData.subChapters[subChapterIndex];

        subChapterContent.forEach((content: string, index: number) => {
            ctx.fillText(
                content,
                canvasConfig.canvas.width *
                    canvasConfig.coordinateCriteria.xRatio, // 좌측에서 10% 위치
                canvasConfig.canvas.height *
                    canvasConfig.coordinateCriteria.yRatio + // 상단에서 10% 위치
                    canvasConfig.canvas.height *
                        (canvasConfig.coordinateCriteria.lineSpaceingRatio * // 바디 줄 간격
                            index) +
                    canvasConfig.canvas.height *
                        canvasConfig.coordinateCriteria
                            .headerLineSpaceingRatio *
                        2, // 헤더 줄 간격
            );
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

    // 캔버스 렌더링
    useEffect(() => {
        const renderCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // 캔버스 화질 개선
            const dpi = window.devicePixelRatio || 1;
            const style = getComputedStyle(canvas);
            canvas.width = parseInt(style.width, 10) * dpi;
            canvas.height = parseInt(style.height, 10) * dpi;
            ctx.scale(dpi, dpi);

            // 캔버스 초기화
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = canvasConfig.canvas.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 캔버스 텍스트 공통 설정
            ctx.textAlign = canvasConfig.contents.textAlign;
            ctx.textBaseline = canvasConfig.contents.textBaseline;
            ctx.direction = canvasConfig.contents.direction;

            // 개별 영역 그리기
            renderChapter(ctx);
            renderSubChapter(ctx);
            renderSubChapterContents(ctx);
            renderPageNumber(ctx);
        };
        renderCanvas();
    }, [canvasConfig, chapterData, subChapterIndex, pageNumber]);

    return (
        <div
            ref={ref}
            className={`w-[${canvasConfig.canvas.width}px] h-[${canvasConfig.canvas.height}px]`}>
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
