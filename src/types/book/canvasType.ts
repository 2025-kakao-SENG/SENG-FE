export interface CanvasTextStyle {
    font: string;
    fillStyle: string;
    strokeStyle: string;
    lineWidth: number;
}

export interface CanvasTextConfig extends CanvasTextStyle {
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    direction: CanvasDirection;
}

export interface CanvasContentsConfig {
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    direction: CanvasDirection;
    header: CanvasTextStyle;
    subHeader: CanvasTextStyle;
    body: CanvasTextStyle;
    pageNumber: CanvasTextStyle;
}

export interface CanvasTagConfig {
    width: number;
    height: number;
    backgroundColor: string;
    headerSizeRatio: number;
    subHeaderSizeRatio: number;
    bodySizeRatio: number;
    pageNumberSizeRatio: number;
}

export interface CanvasCoordinateCriteria {
    xRatio: number;
    yRatio: number;
    maxWidthRatio: number;
    headerLineSpaceingRatio: number;
    lineSpaceingRatio: number;
}

export interface CanvasConfig {
    canvas: CanvasTagConfig;
    contents: CanvasContentsConfig;
    coordinateCriteria: CanvasCoordinateCriteria;
}
