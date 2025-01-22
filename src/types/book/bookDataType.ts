export interface Chapter {
    chapterIndex: number;
    chapterTitle: string;
    subChapters: SubChapter[];
}

export interface SubChapter {
    subChapterIndex: number;
    subChapterTitle: string;
    subChapterContent: string[];
    pageNumber: number;
}

export interface BookData {
    metadata: {
        pid: string;
        title: string;
        category: string;
        created_at: string;
        generated_date: string;
    };
    chapters: Chapter[];
}

export interface ParsedContent {
    isValid: boolean; // 유효성 검증 결과
    title: string; // 제목 (<h1> 태그 내용)
    subtitle: string; // 소제목 (<h2> 태그 내용)
    content: string[]; // 본문 콘텐츠 토큰
}
