import {ParsedContent} from '@/types/book/bookDataType';

function parseHTMLString(
    generatedContent: string,
    expectedTitle: string,
    expectedSubtitle: string,
): ParsedContent {
    // 브라우저 환경에서 DOMParser 사용
    const parser = new DOMParser();
    const doc = parser.parseFromString(generatedContent, 'text/html');

    // <h1>과 <h2> 요소 추출
    const h1 = doc.querySelector('h1');
    const h2 = doc.querySelector('h2');

    // 제목과 소제목 텍스트 추출
    const title = h1 ? h1.textContent?.trim() || '' : '';
    const subtitle = h2 ? h2.textContent?.trim() || '' : '';

    // 유효성 검증
    const isTitleValid = title === expectedTitle;
    const isSubtitleValid = subtitle === expectedSubtitle;
    const isValid = isTitleValid && isSubtitleValid;

    if (!isValid) {
        throw new Error('제목 또는 소제목이 일치하지 않습니다.');
    }

    // <h1>과 <h2> 제거
    h1?.remove();
    h2?.remove();

    // 본문 텍스트 추출
    const contentText = doc.body.textContent || '';

    // 줄바꿈을 기준으로 콘텐츠 토큰화
    const content = contentText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');

    return {
        isValid,
        title,
        subtitle,
        content,
    };
}

export default parseHTMLString;
