import {CanvasConfig} from '@/types/bookType';

const defaultCanvasConfig: CanvasConfig = {
    canvas: {
        width: 0,
        height: 0,
        backgroundColor: '#111111',
    },
    contents: {
        textAlign: 'start', // start, end, left, right, center
        textBaseline: 'alphabetic', // top, hanging, middle, alphabetic, ideographic, bottom
        direction: 'ltr', // ltr: left to right, rtl: right to left, inherit: 상속
        header: {
            font: 'bold 20px Arial', // 폰트
            fillStyle: '#FAC453', // 채우기 색상
            strokeStyle: '#FAC453', // 테두리 색상
            lineWidth: 2, // 테두리 두께
        },
        body: {
            font: 'bold 20px Arial', // 폰트
            fillStyle: '#FAC453', // 채우기 색상
            strokeStyle: '#FAC453', // 테두리 색상
            lineWidth: 2, // 테두리 두께
        },
        pageNumber: {
            font: 'bold 20px Arial', // 폰트
            fillStyle: '#FAC453', // 채우기 색상
            strokeStyle: '#FAC453', // 테두리 색상
            lineWidth: 2, // 테두리 두께
        },
    },
    coordinateCriteria: {
        xRatio: 0.1,
        yRatio: 0.1,
        maxWidthRatio: 0.8,
        lineSpaceingRatio: 0.05,
    },
};

export default defaultCanvasConfig;
