/**
 * 주어진 JSON 문자열을 파싱하여 객체로 변환합니다.
 * @param {string} jsonString - 파싱할 JSON 문자열.
 * @returns {Object|null} - 파싱된 객체 또는 오류 시 null.
 */
function parseJsonString(jsonString: string) {
    try {
        // 첫 번째 파싱: 외부 JSON 문자열을 객체로 변환
        const parsedData = JSON.parse(jsonString);

        // 'outline' 속성이 문자열인 경우, 다시 JSON으로 파싱
        if (typeof parsedData.outline === 'string') {
            parsedData.outline = JSON.parse(parsedData.outline);
        }

        return parsedData;
    } catch (error) {
        throw new Error(`JSON 파싱 오류: ${error}`);
        return null;
    }
}

export default parseJsonString;
