export interface CanvasTextConfig {
    font: string;
    fillStyle: string;
    strokeStyle: string;
    lineWidth: number;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    direction: CanvasDirection;
}

export interface CanvasTagConfig {
    width: number;
    height: number;
    backgroundColor: string;
}

export interface CanvasTextLocation {
    x: number;
    y: number;
    maxWidth: number;
}

export interface CanvasConfig {
    canvas: CanvasTagConfig;
    text: CanvasTextConfig;
    textLocation: CanvasTextLocation
}
