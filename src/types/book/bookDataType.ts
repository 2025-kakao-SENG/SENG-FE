export interface Chapter {
    chapterIndex: number;
    chapterTitle: string;
    subChapters: SubChapter[];
}

export interface SubChapter {
    subChapterIndex: number;
    subChapterTitle: string;
    subChapterContent: string;
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
