import {BookData} from '@/types/book/bookDataType';

const mergedBookData: BookData = {
    metadata: {
        pid: 'landingPage',
        title: 'StoryBreeze 사용자 가이드',
        category: 'Guide',
        created_at: '2025-01-30',
        generated_date: '2025-01-30',
    },
    chapters: [
        {
            chapterIndex: 1,
            chapterTitle: '서비스 개요',
            subChapters: [
                {
                    subChapterIndex: 1,
                    subChapterTitle: 'StoryBreeze 란?',
                    subChapterContent: [
                        'StoryBreeze는 AI 기술을 활용해 사용자가 원하는 카테고리, 분량, 수준에 맞춘',
                        '맞춤형 디지털 교재(도서)를 즉시 생성하고 열람할 수 있는 웹 서비스입니다.',
                        '기존의 정형화된 자료 제공 방식과 달리, 개별 학습자의 필요에 맞춘 콘텐츠를',
                        '제공하여 보다 효율적인 학습 환경을 지원합니다.',
                        '빠르게 변화하는 정보 환경 속에서 사용자는 실시간으로 원하는 정보를',
                        '얻을 수 있으며, 교육, 연구, 취미 등 다양한 목적으로 활용 가능합니다.',
                        '언제 어디서든 접근할 수 있다는 점도 큰 장점입니다.',
                    ],
                    pageNumber: 1,
                },
            ],
        },
        {
            chapterIndex: 2,
            chapterTitle: '서비스 사용법',
            subChapters: [
                {
                    subChapterIndex: 1,
                    subChapterTitle: '사이트 접속 및 회원가입/로그인',
                    subChapterContent: [
                        'StoryBreeze 메인 랜딩 페이지에서 핵심 기능 소개와 회원가입/로그인 버튼을',
                        '확인할 수 있습니다. 이메일과 비밀번호 방식 또는 카카오 간편 로그인 방식 중에서',
                        '선택할 수 있습니다. 로그인 후에는 AI 도서 생성, 커뮤니티 이용, 마이페이지 등',
                        '다양한 기능에 접근할 수 있습니다. 간편한 로그인 절차를 통해 2분 이내에 계정을',
                        '생성하고 서비스를 시작할 수 있으며, 회원가입 후에는 개인 맞춤형 추천 시스템을',
                        '활용할 수 있습니다.',
                    ],
                    pageNumber: 2,
                },
                {
                    subChapterIndex: 2,
                    subChapterTitle: 'AI 도서 생성',
                    subChapterContent: [
                        '1. “AI 도서 생성” 메뉴로 이동합니다.',
                        '2. 원하는 주제를 선택하고, 세분화된 카테고리를 추가로 설정합니다.',
                        '3. “AI 생성하기” 버튼을 누르면 즉시 도서가 생성되어 내 서재에 저장됩니다.',
                        '4. 페이지를 넘길 때마다 AI가 실시간으로 콘텐츠를 생성하는 과정을',
                        '시각적으로 확인할 수 있습니다.',
                        '5. 도서 생성 시 각 카테고리에 따른 자동 추천 기능이 적용됩니다.',
                    ],
                    pageNumber: 3,
                },
                {
                    subChapterIndex: 3,
                    subChapterTitle: '마이페이지(개인 설정)',
                    subChapterContent: [
                        '닉네임, 비밀번호 변경 및 보유 리프 확인 등 계정 정보를 관리할 수 있습니다.',
                        '내 서재에 저장된 도서를 확인하고 원하는 시점에 열람할 수 있으며, 이전에 생성한',
                        '도서의 히스토리도 관리할 수 있습니다. 또한, 설정 메뉴에서 UI 테마 변경 및',
                        '접근성 기능을 조정할 수 있습니다.',
                    ],
                    pageNumber: 4,
                },
                {
                    subChapterIndex: 4,
                    subChapterTitle: '커뮤니티',
                    subChapterContent: [
                        '게시글과 댓글을 통해 다른 사용자들과 정보를 공유하고 소통할 수 있습니다.',
                        '게시글 작성자의 댓글은 별도로 구분되어 표시됩니다.',
                        '인기 게시글에는 “추천” 태그가 부여되어 더 많은 사용자에게 노출됩니다.',
                        '사용자들은 다양한 학습 노하우를 공유하고, 자신이 생성한 AI 도서를',
                        '소개할 수 있습니다. 건전한 커뮤니티 운영을 위해 신고 기능이 제공되며,',
                        '관리자가 지속적으로 모니터링을 진행합니다.',
                    ],
                    pageNumber: 5,
                },
                {
                    subChapterIndex: 5,
                    subChapterTitle: '리프(Leaf) 충전 및 결제',
                    subChapterContent: [
                        'AI 도서 생성 시 소모되는 가상 재화인 리프는 사이트 내 결제 시스템을 통해',
                        '충전할 수 있습니다. 책의 분량, 난이도, 전문성에 따라 소모되는 리프의 양이',
                        '달라질 수 있으며, 리프는 100, 500, 1000 단위의 패키지로 구매할 수 있습니다.',
                        '일부 기능은 무료 체험이 가능하며, 신규 가입자에게는 보너스 리프가 제공됩니다.',
                        '또한, 월간 구독 서비스를 통해 정기적으로 리프를 지급받을 수도 있습니다.',
                    ],
                    pageNumber: 6,
                },
            ],
        },
        {
            chapterIndex: 3,
            chapterTitle: '',
            subChapters: [
                {
                    subChapterIndex: 1,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 7,
                },
                {
                    subChapterIndex: 2,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 8,
                },
                {
                    subChapterIndex: 3,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 9,
                },
            ],
        },
        {
            chapterIndex: 4,
            chapterTitle: '',
            subChapters: [
                {
                    subChapterIndex: 1,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 10,
                },
                {
                    subChapterIndex: 2,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 11,
                },
                {
                    subChapterIndex: 3,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 12,
                },
            ],
        },
        {
            chapterIndex: 5,
            chapterTitle: '',
            subChapters: [
                {
                    subChapterIndex: 1,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 13,
                },
                {
                    subChapterIndex: 2,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 14,
                },
                {
                    subChapterIndex: 3,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 15,
                },
            ],
        },
        {
            chapterIndex: 6,
            chapterTitle: '',
            subChapters: [
                {
                    subChapterIndex: 1,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 16,
                },
                {
                    subChapterIndex: 2,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 17,
                },
                {
                    subChapterIndex: 3,
                    subChapterTitle: '',
                    subChapterContent: [''],
                    pageNumber: 18,
                },
            ],
        },
    ],
};

export default mergedBookData;
