import {CanvasConfig} from '@/types/book/canvasType';

const defaultCanvasConfig: CanvasConfig = {
    canvas: {
        width: 0,
        height: 0,
        backgroundColor: '#131313',
        headerSizeRatio: 0.06,
        subHeaderSizeRatio: 0.04,
        bodySizeRatio: 0.02,
        pageNumberSizeRatio: 0.03,
    },
    contents: {
        textAlign: 'start', // start, end, left, right, center
        textBaseline: 'alphabetic', // top, hanging, middle, alphabetic, ideographic, bottom
        direction: 'ltr', // ltr: left to right, rtl: right to left, inherit: 상속
        header: {
            font: 'bold 20px Arial', // 폰트 디폴트
            fillStyle: '#FAC453', // 채우기 색상
            strokeStyle: '#FAC453', // 테두리 색상
            lineWidth: 2, // 테두리 두께
        },
        subHeader: {
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
        headerLineSpaceingRatio: 0.06,
        lineSpaceingRatio: 0.03,
    },
};

export default defaultCanvasConfig;
