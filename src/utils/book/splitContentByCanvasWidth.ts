import {CanvasConfig} from '@/types/book/canvasType';

function splitContentByCanvasWidth(
    contents: string[],
    canvasConfig: CanvasConfig,
): string[] {
    const canvasMaxWidth = canvasConfig.canvas.width * 1.05; // 5%는 더 넓게 기준 설정
    const canvasWordWidth =
        canvasConfig.canvas.bodySizeRatio * canvasConfig.canvas.width;
    const lines: string[] = [];
    let line = '';

    for (let i = 0; i < contents.length; i += 1) {
        const content = contents[i];

        const words = content.split(' ');
        for (let j = 0; j < words.length; j += 1) {
            const word = words[j];

            if (
                (line.length + word.length) * canvasWordWidth >
                canvasMaxWidth
            ) {
                lines.push(line);
                line = `${word} `;
            } else {
                line += `${word} `;
            }
        }

        if (line) {
            lines.push(line);
            line = '';
        }
    }

    lines.push(line);

    return lines;
}

export default splitContentByCanvasWidth;
