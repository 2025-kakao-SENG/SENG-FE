import {useEffect, useRef} from 'react';

// 텍스트 객체 타입 정의
interface TextData {
    contents: string[];
    fontSize: string;
    fontFamily: string;
    textColor: string;
}

interface PageProps {
    pageData: TextData;
}

function Page({pageData}: PageProps) {
    // 캔버스 변수
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    // 투명도 변수
    const alpha = useRef<number>(1);

    // 텍스트 변수
    const [renderedTexts, setRenderedTexts] = useState<string[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctxRef.current = canvas.getContext('2d');
        }
    }, []);

    // 애니메이션 함수
    const animateText = () => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        let animationFrameId: number;

        // 애니메이션 반복적으로 실행
        const animate = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 화면 지우기

            // 텍스트 스타일 설정
            ctx.font = `${pageData.fontSize} ${pageData.fontFamily}`;
            ctx.fillStyle = pageData.textColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.globalAlpha = alpha.current;
            ctx.fillText(
                pageData.contents.join(' '),
                canvas.width / 2,
                canvas.height / 2,
            );
            alpha.current -= 0.01; // 투명도 감소
            if (alpha.current <= 0) {
                alpha.current = 1; // 투명도 리셋
            }

            animationFrameId = requestAnimationFrame(animate); // 다음 프레임에 호출
        };

        animate(); // 애니메이션 시작

        return () => cancelAnimationFrame(animationFrameId); // 컴포넌트 언마운트 시 애니메이션 취소
    };

    return <canvas ref={canvasRef} width={500} height={200} />;
}

export default Page;
