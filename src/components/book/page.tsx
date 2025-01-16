import React, {useRef, useEffect} from 'react';

import {CanvasConfig} from '@/types/bookType';

type PageProps = React.PropsWithChildren<{
    pageNumber: number;
    pageData: {
        title: string;
        content: string[];
    };
    canvasConfig: CanvasConfig;
}>;

function Page(
    {pageNumber, pageData, canvasConfig}: PageProps,
    ref: React.Ref<HTMLDivElement>,
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 캔버스 렌더링
    useEffect(() => {
        renderCanvas();
    });

    const renderCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 캔버스 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = canvasConfig.canvas.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 캔버스 공통 설정
        ctx.textAlign = canvasConfig.contents.textAlign;
        ctx.textBaseline = canvasConfig.contents.textBaseline;
        ctx.direction = canvasConfig.contents.direction;

        // 개별 영역 그리기
        renderHeader(ctx);
        renderContents(ctx);
        renderPageNumber(ctx);
    };

    const renderHeader = (ctx: CanvasRenderingContext2D) => {
        const {header} = canvasConfig.contents;
        ctx.font = header.font;
        ctx.fillStyle = header.fillStyle;

        ctx.fillText(
            pageData.title,
            canvasConfig.coordinateCriteria.xRatio * canvasConfig.canvas.width, // 좌측에서 10% 위치
            canvasConfig.coordinateCriteria.yRatio * canvasConfig.canvas.height, // 상단에서 10% 위치
        );
    };

    const renderContents = (ctx: CanvasRenderingContext2D) => {
        const {body} = canvasConfig.contents;
        ctx.font = body.font;
        ctx.fillStyle = body.fillStyle;

        pageData.content.forEach((line, index) => {
            ctx.fillText(
                line,
                canvasConfig.canvas.width * canvasConfig.coordinateCriteria.xRatio, // 좌측에서 10% 위치
                canvasConfig.canvas.height * canvasConfig.coordinateCriteria.yRatio + // 상단에서 10% 위치
                (index + 1) * canvasConfig.canvas.height * canvasConfig.coordinateCriteria.lineSpaceingRatio, // 줄 간격
                canvasConfig.canvas.width * canvasConfig.coordinateCriteria.maxWidthRatio, // 최대 너비
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

    return (
        <div
            ref={ref}
            className='w-full h-full'>
            <canvas
                ref={canvasRef}
                width={canvasConfig.canvas.width}
                height={canvasConfig.canvas.height}
                data-testid="canvas"
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: canvasConfig.canvas.backgroundColor,
                }}
            />
        </div>
    );
}

export default React.forwardRef(Page);
