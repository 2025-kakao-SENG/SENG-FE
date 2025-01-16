import React, {useRef, useState, useEffect} from 'react';

import defaultCanvasConfig from '@/constants/canvasConfig';
import {CanvasConfig} from '@/types/bookType';

type PageProps = React.PropsWithChildren<{
    number: number;
    data: {
        title: string;
        content: string[];
    };
}>;

function Page({number, data}: PageProps, ref: React.Ref<HTMLCanvasElement>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasConfig, setCanvasConfig] = useState(defaultCanvasConfig);

    const updateCanvasSize = (canvas: HTMLCanvasElement) => {
        const newWidth = Math.floor(window.innerWidth * 0.3); // 뷰포트의 30% 너비
        const aspectRatio = 1.414; // 세로/가로 비율
        const newHeight = Math.floor(newWidth * aspectRatio); // 세로 계산

        // 캔버스 DOM 요소의 크기 업데이트
        if (canvas) {
            canvas.width = newWidth; // 픽셀 해상도 설정
            canvas.height = newHeight; // 픽셀 해상도 설정
            canvas.style.width = `${newWidth}px`; // 렌더링 크기 설정
            canvas.style.height = `${newHeight}px`; // 렌더링 크기 설정
        }
    };

    const updateCanvasConfig = (canvas: HTMLCanvasElement) => {
        const newCanvasConfig: CanvasConfig = {
            ...canvasConfig,
            canvas: {
                ...canvasConfig.canvas,
                width: canvas.width,
                height: canvas.height,
            },
            text: {
                ...canvasConfig.text,
                font: `${canvas.width * 0.04}px Arial`,
                fillStyle: '#FAC453',
                textAlign: 'start',
                textBaseline: 'alphabetic',
                direction: 'ltr',
                strokeStyle: '#FAC453',
                lineWidth: 2,
            },
            textLocation: {
                ...canvasConfig.textLocation,
                x: canvas.width * 0.1,
                y: canvas.height * 0.05,
                maxWidth: canvas.width * 0.8,
            },
        };

        setCanvasConfig(newCanvasConfig);
    };

    const renderText = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) => {
        // 캔버스 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 배경색 설정
        ctx.fillStyle = canvasConfig.canvas.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 텍스트 스타일 설정
        ctx.font = canvasConfig.text.font;
        ctx.fillStyle = canvasConfig.text.fillStyle;
        ctx.textAlign = canvasConfig.text.textAlign;
        ctx.textBaseline = canvasConfig.text.textBaseline;
        ctx.direction = canvasConfig.text.direction;
        ctx.strokeStyle = canvasConfig.text.strokeStyle;
        ctx.lineWidth = canvasConfig.text.lineWidth;

        // 텍스트 그리기
        for (let i = 0; i < data.content.length; i++) {
            ctx.fillText(
                data.content[i],
                canvasConfig.textLocation.x,
                canvasConfig.textLocation.y * (i + 1), // 줄 간격 조정
                canvasConfig.textLocation.maxWidth,
            );
        }
    };

    useEffect(() => {
        // 초기 크기 설정
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        updateCanvasSize(canvas);
        updateCanvasConfig(canvas);
        renderText(canvas, ctx);

        // 뷰포트 크기 변경 이벤트 등록
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas && ctx) {
                updateCanvasSize(canvas);
                updateCanvasConfig(canvas);
                renderText(canvas, ctx); // 리사이즈 후 텍스트 다시 그리기
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data.content]); // data.content 변경 시 렌더링

    // 데이터 변경시 텍스트 그리기
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            renderText(canvas, ctx);
        }
    }, [canvasConfig, data.content]); // canvasConfig와 data.content 변경 시 다시 그리기

    useEffect(() => {
        if (typeof ref === 'function') {
            ref(canvasRef.current);
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLCanvasElement | null>).current =
                canvasRef.current;
        }
    }, [ref]);

    return (
        <div className="h-auto w-auto">
            <canvas
                ref={canvasRef}
                width={canvasConfig.canvas.width}
                height={canvasConfig.canvas.height}
                data-testid="canvas"
                style={{
                    width: canvasConfig.canvas.width,
                    height: canvasConfig.canvas.height,
                    backgroundColor: canvasConfig.canvas.backgroundColor,
                }}
            />
        </div>
    );
}

export default React.forwardRef(Page);
