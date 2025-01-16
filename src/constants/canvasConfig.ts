import { CanvasConfig } from "@/types/bookType";

const defaultCanvasConfig : CanvasConfig = {
    canvas: {
        width: 800,
        height: 600,
        backgroundColor: '#111111',
    },
    text: {
        font: 'bold 20px Arial', // 폰트
        fillStyle: '#FAC453', // 채우기 색상
        textAlign: 'center', // start, end, left, right, center
        textBaseline: 'alphabetic', // top, hanging, middle, alphabetic, ideographic, bottom
        direction: 'ltr', // ltr: left to right, rtl: right to left, inherit: 상속
        strokeStyle: '#FAC453', // 테두리 색상
        lineWidth: 2, // 테두리 두께
    },
    textLocation: {
        x: 800 * 0.1,
        y: 600 * 0.1,
        maxWidth: 800,
    },
};

export default defaultCanvasConfig;
