import {ParsedContent} from '@/types/book/bookDataType';

function parseHTMLString(generatedContent: string): ParsedContent {
    // 브라우저 환경에서 DOMParser 사용
    const parser = new DOMParser();
    const doc = parser.parseFromString(generatedContent, 'text/html');

    // <h1>과 <h2> 요소 추출
    const h1 = doc.querySelector('h1');
    const h2 = doc.querySelector('h2');

    // 제목과 소제목 텍스트 추출
    const title = h1 ? h1.textContent?.trim() || '' : '';
    const subtitle = h2 ? h2.textContent?.trim() || '' : '';

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
        title,
        subtitle,
        content,
    };
}

export default parseHTMLString;
