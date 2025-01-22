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
}

export interface CanvasCoordinateCriteria {
    xRatio: number;
    yRatio: number;
    maxWidthRatio: number;
    lineSpaceingRatio: number;
}

export interface CanvasConfig {
    canvas: CanvasTagConfig;
    contents: CanvasContentsConfig;
    coordinateCriteria: CanvasCoordinateCriteria;
}
