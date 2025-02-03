import leafWhite from '@/assets/images/leafCharge/leafWhite.svg';
import leafGold from '@/assets/images/leafCharge/leafGold.svg';
import leafGray from '@/assets/images/leafCharge/leafGray.svg';
import close from '@/assets/images/login/close.svg';
import {useTheme} from '@/constants/ThemeProvider';
import useChargeLeafApi from '@/hooks/apis/useChargeLeafApi';
import {useDispatch, useSelector} from 'react-redux';
import {getUserId} from '@/redux/selector';
import {useState} from 'react';
import {setUserLeaf} from '@/redux/slice/userSlice';

function LeafCharge({onClose}: {onClose: () => void}) {
    const {isDarkMode} = useTheme();
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    const {chargeLeafApi, isLoading} = useChargeLeafApi();

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const ChargeLeaf10 = async () => {
        if (!userId) {
            setErrorMessage('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await chargeLeafApi({
                id: parseInt(userId, 10),
                leaf: 10,
            });

            if (!('error' in response)) {
                dispatch(setUserLeaf(response.leaf));
                setIsSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setErrorMessage(response.error);
            }
        } catch {
            setErrorMessage('리프를 충전하는 중 오류가 발생했습니다.');
        }
    };

    const ChargeGoldenLeaf = async () => {
        if (!userId) {
            setErrorMessage('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await chargeLeafApi({
                id: parseInt(userId, 10),
                leaf: 100,
            });

            if (!('error' in response)) {
                dispatch(setUserLeaf(response.leaf));
                setIsSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setErrorMessage(response.error);
            }
        } catch {
            setErrorMessage('리프를 충전하는 중 오류가 발생했습니다.');
        }
    };

    return (
        <div
            className={`relative flex h-full max-w-[43.375rem] items-start justify-center rounded-lg px-[5.9375rem] py-[2.8125rem] shadow transition-colors duration-300 ${
                isDarkMode ? 'bg-[#1b1b1b]' : 'bg-[#F3F3F3]'
            }`}>
            {/* border */}
            <div
                className={`flex w-full rounded-lg border ${
                    isDarkMode ? 'border-[#D1D1D1]' : 'border-[#b6b6b6]' // 수정됨
                }`}>
                {/* 가운데 border 기준 - 왼쪽 */}
                <div className="flex flex-col p-[1.0625rem]">
                    <div className="">
                        <img
                            src={isDarkMode ? leafWhite : leafGray}
                            alt=""
                            className="w-[1.5625rem]"
                        />
                    </div>

                    <div className="mb-[0.3125rem] mt-[0.1875rem] flex items-end gap-0.5">
                        <p className="text-3xl font-medium text-[#FAC453]">
                            1,000원
                        </p>
                        <p
                            className={`text-[0.6875rem] ${
                                isDarkMode ? 'text-[#939393]' : 'text-[#b6b6b6]'
                            }`}>
                            10개
                        </p>
                    </div>

                    <div className="">
                        <p
                            className={`text-[0.6875rem] leading-[1.125rem] ${
                                isDarkMode ? 'text-[#D8D8D8]' : 'text-black' // 수정됨
                            }`}>
                            리프는 책을 뽑을 때 사용하는 아이템이에요! 한 번
                            뽑을 때마다 리프 1개가 소모됩니다.
                        </p>
                    </div>

                    <div className="mb-[1.4375rem] mt-2.5 flex items-center justify-center">
                        <button
                            type="button"
                            className={`h-[1.8125rem] w-full rounded-full border text-[0.5rem] transition-colors hover:border-none hover:bg-[#FAC453] hover:text-black active:bg-[#ffc240] ${
                                isDarkMode
                                    ? 'border-[#D1D1D1] text-[#D8D8D8]'
                                    : 'border-[#b6b6b6] text-[#FAC453]' // 수정됨
                            }`}
                            onClick={ChargeLeaf10}>
                            구매하기
                        </button>
                    </div>

                    <ul
                        className={`mb-4 flex list-disc flex-col pl-2 text-[0.5rem] leading-5 ${
                            isDarkMode ? 'text-[#D8D8D8]' : 'text-black' // 수정됨
                        }`}>
                        <li className="">구매 내용: 리프 10개 제공</li>
                        <li className="">
                            사용 혜택: 원하는 책을 최대 10번 뽑기 가능
                        </li>
                        <li className="">
                            장점:
                            <ol className="">
                                <li className="">
                                    여러 번 뽑을 수 있어 더 많은 기회 제공
                                </li>
                                <li className="">필요할 때 바로 사용 가능</li>
                                <li className="">개별 구매보다 편리</li>
                            </ol>
                        </li>
                        <li className="">
                            지금 구매하고 원하는 책을 만나보세요!
                        </li>
                    </ul>
                </div>

                {/* 가운데 border */}
                <div
                    className={`border-l ${
                        isDarkMode ? 'border-[#D1D1D1]' : 'border-[#b6b6b6]' // 수정됨
                    }`}
                />

                {/* 가운데 border 기준 - 오른쪽 */}
                <div className="flex flex-col p-[1.0625rem]">
                    <div className="flex items-end gap-1.5">
                        <img src={leafGold} alt="" className="w-[1.5625rem]" />
                        <div className="flex items-center gap-0.5">
                            <img
                                src={isDarkMode ? leafGray : leafGray} // 수정됨
                                alt=""
                                className="w-2"
                            />
                            <p
                                className={`text-[0.4375rem] font-medium ${
                                    isDarkMode
                                        ? 'text-[#BBBBBB]'
                                        : 'text-[#b6b6b6]' // 수정됨
                                }`}>
                                x 100
                            </p>
                        </div>
                    </div>

                    <div className="mb-[0.3125rem] mt-[0.1875rem] flex items-end gap-[0.3125rem]">
                        <p className="text-3xl font-medium text-[#FAC453]">
                            10,000원
                        </p>
                        <p className="text-[0.6875rem] text-[#FAC453]">
                            골든 리프 1개
                        </p>
                    </div>

                    <div className="">
                        <p
                            className={`text-[0.6875rem] leading-[1.125rem] ${
                                isDarkMode ? 'text-[#D8D8D8]' : 'text-black' // 수정됨
                            }`}>
                            골든 리프는 책을 뽑을 때 사용하는 아이템이에요! 한
                            번 뽑을 때마다 골든 리프 1개가 소모됩니다.
                        </p>
                    </div>

                    <div className="mb-[1.4375rem] mt-2.5 flex items-center justify-center">
                        <button
                            type="button"
                            className={`h-[1.8125rem] w-full rounded-full border text-[0.5rem] transition-colors hover:border-none hover:bg-[#FAC453] hover:text-black active:bg-[#ffc240] ${
                                isDarkMode
                                    ? 'border-[#D1D1D1] text-[#D8D8D8]'
                                    : 'border-[#b6b6b6] text-[#FAC453]' // 수정됨
                            }`}
                            onClick={ChargeGoldenLeaf}>
                            구매하기
                        </button>
                    </div>

                    <ul
                        className={`mb-4 flex list-disc flex-col pl-2 text-[0.5rem] leading-5 ${
                            isDarkMode ? 'text-[#D8D8D8]' : 'text-black' // 수정됨
                        }`}>
                        <li className="">
                            구매 내용: 골든리프 1개(리프 100개) 제공
                        </li>
                        <li className="">
                            사용 혜택: 원하는 책을 최대 100번 뽑기 가능
                        </li>
                        <li className="">
                            장점:
                            <ol className="">
                                <li className="">
                                    대량 구매로 더 편리하게 사용 가능
                                </li>
                                <li className="">
                                    여러 권을 뽑을 수 있어 선택의 폭이 넓어짐
                                </li>
                                <li className="">개별 구매보다 훨씬 경제적</li>
                            </ol>
                        </li>
                        <li className="">
                            지금 리프 100개를 구매하고 원하는 원하는 책을 마음껏
                            뽑아보세요!
                        </li>
                    </ul>
                </div>
            </div>

            {/* 닫기 버튼 */}
            <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5">
                <img src={close} alt="닫기" className="w-3" />
            </button>

            {isLoading && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-b-5 h-32 w-32 animate-spin rounded-full border-t-[7px] border-[#DBAC4A]" />
                        <p className="mt-5 text-[#DBAC4A]">
                            리프를 충전하는 중입니다.
                        </p>
                    </div>
                </div>
            )}

            {isSuccess && (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div
                        className={`flex flex-col items-center justify-center gap-3 rounded-[0.9375rem] p-5 transition-colors duration-300 ${
                            isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white shadow-xl'
                        }`}>
                        <p className="text-lg text-[#DBAC4A]">알림</p>
                        <p
                            className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? 'text-[#C9C9C9]' : 'text-black'
                            }`}>
                            리프를 충전했습니다.
                        </p>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div
                        className={`flex flex-col items-center justify-center gap-3 rounded-[0.9375rem] p-5 transition-colors duration-300 ${
                            isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white shadow-xl'
                        }`}>
                        <p className="text-lg text-[#DBAC4A]">알림</p>
                        <p
                            className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? 'text-[#C9C9C9]' : 'text-black'
                            }`}>
                            {errorMessage}
                        </p>
                        <button
                            type="button"
                            onClick={() => setErrorMessage('')}
                            className="mt-2 rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b88a3a]">
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default LeafCharge;
