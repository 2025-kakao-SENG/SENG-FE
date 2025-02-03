import view from '@/assets/images/view.svg';
import bin from '@/assets/images/bin.svg';
import {useTheme} from '@/constants/ThemeProvider';

const dummyPosts = [
    {
        date: '2025.01.08',
        posts: [
            {title: '공룡 시대의 신비한 이야기'},
            {title: '지구에서 가장 오래된 생명체'},
            {title: '고대 생물의 진화 과정'},
        ],
    },
    {
        date: '2025.01.07',
        posts: [
            {title: 'AI가 책을 만드는 과정'},
            {title: 'AI 시대의 윤리적 문제'},
        ],
    },
    {
        date: '2025.01.06',
        posts: [
            {title: '우주의 기원과 블랙홀'},
            {title: '다중 우주의 가능성'},
            {title: 'NASA가 발견한 새로운 행성'},
        ],
    },
    {
        date: '2025.01.05',
        posts: [
            {title: '해양 생물의 놀라운 생태계'},
            {title: '심해 탐사의 최신 기술'},
        ],
    },
    {
        date: '2025.01.04',
        posts: [
            {title: '고대 문명의 비밀과 유적'},
            {title: '잃어버린 도시, 아틀란티스의 전설'},
        ],
    },
    {
        date: '2025.01.03',
        posts: [
            {title: '시간 여행이 가능할까?'},
            {title: '타임 패러독스란 무엇인가?'},
            {title: '과거로 돌아갈 수 있다면?'},
        ],
    },
];

function Community() {
    const {isDarkMode} = useTheme();

    return (
        <div>
            <h2
                className={`text-sm font-semibold ${
                    isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                }`}>
                작성한 글
            </h2>

            <div
                className="mt-[0.8125rem] flex h-[34.5vw] flex-col gap-[0.9375rem] overflow-y-scroll"
                style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {/* 날짜별 그룹핑 */}
                {dummyPosts.map((group, index) => (
                    <div key={index} className="flex flex-col gap-[0.1875rem]">
                        {/* 날짜 */}
                        <p className="text-[0.625rem] text-[#8D8D8D]">
                            {group.date}
                        </p>

                        {/* 게시글 목록 */}
                        <div className="flex flex-col gap-[0.6875rem]">
                            {group.posts.map((post, postIndex) => (
                                <div
                                    key={postIndex}
                                    key={postIndex}
                                    className={`flex w-[28.3125rem] items-center justify-between rounded-[0.1875rem] px-[0.9375rem] py-[0.6875rem] ${
                                        isDarkMode
                                            ? 'bg-[#292929]'
                                            : 'bg-[#999999]' // 수정됨
                                    }`}>
                                    <div
                                        className={`${
                                            isDarkMode
                                                ? 'text-white'
                                                : 'text-[#ffe9bb]' // 수정됨
                                        }`}>
                                        {post.title}
                                    </div>
                                    <div className="flex gap-3.5">
                                        <button type="button">
                                            <img src={view} alt="보기" />
                                        </button>
                                        <button type="button">
                                            <img src={bin} alt="삭제" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Community;
