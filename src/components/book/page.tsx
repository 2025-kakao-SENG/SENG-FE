import React, {useRef, useState, useEffect} from 'react';

// PageProps 타입 정의
type PageProps = React.PropsWithChildren<{
    number: number;
}>;

function Page({number, children}: PageProps, ref: React.Ref<HTMLDivElement>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [clicks, setClicks] = useState<{x: number; y: number}[]>([]); // 클릭한 지점 저장

    // 캔버스를 초기화하고 데모 작업을 수행하는 함수
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 초기화
                if (clicks.length === 2) {
                    const [firstClick, secondClick] = clicks;
                    ctx.strokeStyle = '#4682b4'; // 선 색상
                    ctx.lineWidth = 2; // 선 두께
                    ctx.beginPath();
                    ctx.moveTo(firstClick.x, firstClick.y); // 첫 번째 클릭 지점
                    ctx.lineTo(secondClick.x, secondClick.y); // 두 번째 클릭 지점
                    ctx.stroke(); // 선 그리기
                }
            }
        }
    }, [clicks]); // 클릭이 발생할 때마다 캔버스를 다시 그리기

    // 캔버스 클릭 이벤트 핸들러
    const handleCanvasClick = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 클릭한 위치 계산
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 두 번의 클릭을 감지
        if (clicks.length < 2) {
            setClicks(prevClicks => [...prevClicks, {x, y}]);
        } else {
            // 클릭이 두 번째일 경우 다시 클릭 리스트를 초기화하고 선을 그린 후 초기화
            setClicks([{x, y}]);
        }
    };

    return (
        <div className="demoPage" ref={ref}>
            <h1>Page Header</h1>
            <p>{children}</p>
            <p>Page number: {number}</p>
            <canvas
                ref={canvasRef}
                width={500}
                height={300}
                style={{
                    border: '1px solid black',
                    marginTop: '20px',
                    cursor: 'pointer',
                }}
                onClick={handleCanvasClick}
            />
            {clicks.length === 2 && (
                <p>
                    두 번 클릭하여 선을 그렸습니다.{' '}
                    <button type="button" onClick={() => setClicks([])}>
                        초기화
                    </button>
                </p>
            )}
        </div>
    );
}

// React.forwardRef로 감싸기
export default React.forwardRef(Page);
