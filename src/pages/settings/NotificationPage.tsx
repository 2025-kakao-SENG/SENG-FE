import {useTheme} from '@/constants/ThemeProvider';

function NotificationPage() {
    const {isDarkMode} = useTheme();

    return (
        <div
            className="h-[37vw] overflow-y-scroll pr-[20.625rem]"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <h2
                className={`text-sm font-semibold ${
                    isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                }`}>
                시스템 알림
            </h2>
            <div className="mt-[0.5625rem] flex flex-col flex-wrap gap-[0.5625rem]">
                <div
                    className={`flex flex-col rounded-[0.1875rem] p-[0.9375rem] ${
                        isDarkMode ? 'bg-[#292929]' : 'bg-[#bbbbbb]' // 수정됨
                    }`}>
                    <p
                        className={`text-xs font-bold ${
                            isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                        }`}>
                        500 토큰이 충전되었습니다.
                    </p>
                    <div className="my-1">
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                            }`}>
                            안녕하세요 스토리브리즈입니다. Noah님의 토큰 충전
                            내역을 안내드립니다.
                        </p>
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                            }`}>
                            2025년 01월 08일 13시 08분 등록하신 결제 수단으로
                            500토큰이 충전되었습니다.
                        </p>
                    </div>
                    <p
                        className={`self-end text-[0.625rem] ${
                            isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                        }`}>
                        2025-01-08
                    </p>
                </div>
                <div
                    className={`flex flex-col rounded-[0.1875rem] p-[0.9375rem] ${
                        isDarkMode ? 'bg-[#292929]' : 'bg-[#999999]' // 수정됨
                    }`}>
                    <p className="text-xs font-bold text-[#ffe9bb]">
                        500 토큰이 충전되었습니다.
                    </p>
                    <div className="my-1">
                        <p className="text-xs text-[#ffe9bb]">
                            안녕하세요 스토리브리즈입니다. Noah님의 토큰 충전
                            내역을 안내드립니다.
                        </p>
                        <p className="text-xs text-[#ffe9bb]">
                            2025년 01월 08일 13시 08분 등록하신 결제 수단으로
                            500토큰이 충전되었습니다.
                        </p>
                    </div>
                    <p className="self-end text-[0.625rem] text-[#ffe9bb]">
                        2025-01-08
                    </p>
                </div>
                <div
                    className={`flex flex-col rounded-[0.1875rem] p-[0.9375rem] ${
                        isDarkMode ? 'bg-[#292929]' : 'bg-[#bbbbbb]' // 수정됨
                    }`}>
                    <p
                        className={`text-xs font-bold ${
                            isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                        }`}>
                        500 토큰이 충전되었습니다.
                    </p>
                    <div className="my-1">
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                            }`}>
                            안녕하세요 스토리브리즈입니다. Noah님의 토큰 충전
                            내역을 안내드립니다.
                        </p>
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                            }`}>
                            2025년 01월 08일 13시 08분 등록하신 결제 수단으로
                            500토큰이 충전되었습니다.
                        </p>
                    </div>
                    <p
                        className={`self-end text-[0.625rem] ${
                            isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                        }`}>
                        2025-01-08
                    </p>
                </div>
            </div>

            <h2
                className={`mt-[2.1875rem] flex flex-col flex-wrap text-sm font-semibold ${
                    isDarkMode ? 'text-[#F5F5F5]' : 'text-black' // 수정됨
                }`}>
                커뮤니티 알림
            </h2>
            <div className="mt-[0.5625rem] flex flex-col gap-[0.5625rem]">
                <div
                    className={`flex flex-col rounded-[0.1875rem] p-[0.9375rem] ${
                        isDarkMode ? 'bg-[#292929]' : 'bg-[#999999]' // 수정됨
                    }`}>
                    <p
                        className={`text-xs font-bold ${
                            isDarkMode ? 'text-[#999999]' : 'text-[#ffe9bb]' // 수정됨
                        }`}>
                        Eden님이 게시글에 댓글을 남겼습니다.
                    </p>
                    <div className="my-1">
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-[#ffe9bb]' // 수정됨
                            }`}>
                            회원님의 “공룡책” 게시글에 Eden님이 댓글을
                            남겼습니다.
                        </p>
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-[#ffe9bb]' // 수정됨
                            }`}>
                            Eden님의 댓글을 확인하고 소통해보세요.
                        </p>
                    </div>
                    <p
                        className={`self-end text-[0.625rem] ${
                            isDarkMode ? 'text-[#999999]' : 'text-[#ffe9bb]' // 수정됨
                        }`}>
                        2025-01-08
                    </p>
                </div>
                <div
                    className={`flex flex-col rounded-[0.1875rem] p-[0.9375rem] ${
                        isDarkMode ? 'bg-[#292929]' : 'bg-[#bbbbbb]' // 수정됨
                    }`}>
                    <p
                        className={`text-xs font-bold ${
                            isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                        }`}>
                        Eden님이 게시글에 댓글을 남겼습니다.
                    </p>
                    <div className="my-1">
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                            }`}>
                            회원님의 “공룡책” 게시글에 Eden님이 댓글을
                            남겼습니다.
                        </p>
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                            }`}>
                            Eden님의 댓글을 확인하고 소통해보세요.
                        </p>
                    </div>
                    <p
                        className={`self-end text-[0.625rem] ${
                            isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                        }`}>
                        2025-01-08
                    </p>
                </div>
                <div
                    className={`flex flex-col rounded-[0.1875rem] p-[0.9375rem] ${
                        isDarkMode ? 'bg-[#292929]' : 'bg-[#bbbbbb]' // 수정됨
                    }`}>
                    <p
                        className={`text-xs font-bold ${
                            isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                        }`}>
                        Eden님이 게시글에 댓글을 남겼습니다.
                    </p>
                    <div className="my-1">
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                            }`}>
                            회원님의 “공룡책” 게시글에 Eden님이 댓글을
                            남겼습니다.
                        </p>
                        <p
                            className={`text-xs ${
                                isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                            }`}>
                            Eden님의 댓글을 확인하고 소통해보세요.
                        </p>
                    </div>
                    <p
                        className={`self-end text-[0.625rem] ${
                            isDarkMode ? 'text-[#999999]' : 'text-black' // 수정됨
                        }`}>
                        2025-01-08
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;
