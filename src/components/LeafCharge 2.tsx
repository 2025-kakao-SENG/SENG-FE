import leafWhite from '@/assets/images/leafCharge/leafWhite.svg';
import leafGold from '@/assets/images/leafCharge/leafGold.svg';
import leafGray from '@/assets/images/leafCharge/leafGray.svg';
import close from '@/assets/images/login/close.svg';

function LeafCharge({onClose}: {onClose: () => void}) {
    return (
        <div className="relative flex h-full max-w-[43.375rem] items-start justify-center rounded-lg bg-[#1b1b1b] px-[5.9375rem] py-[2.8125rem] shadow">
            {/* border */}
            <div className="flex w-full rounded-lg border">
                {/* 가운데 border 기준 - 왼쪽 */}
                <div className="flex flex-col p-[1.0625rem]">
                    <div className="">
                        <img src={leafWhite} alt="" className="w-[1.5625rem]" />
                    </div>

                    <div className="mb-[0.3125rem] mt-[0.1875rem] flex items-end gap-0.5">
                        <p className="text-3xl font-medium text-[#FAC453]">
                            1,000원
                        </p>
                        <p className="text-[0.6875rem] text-[#939393]">10개</p>
                    </div>

                    <div className="">
                        <p className="text-[0.6875rem] leading-[1.125rem] text-[#D8D8D8]">
                            리프는 책을 뽑을 때 사용하는 아이템이에요! 한 번
                            뽑을 때마다 리프 1개가 소모됩니다.
                        </p>
                    </div>

                    <div className="mb-[1.4375rem] mt-2.5 flex items-center justify-center">
                        <button
                            type="button"
                            className="h-[1.8125rem] w-full rounded-full border text-[0.5rem] text-[#D8D8D8] transition-colors hover:border-none hover:bg-[#FAC453] hover:text-black active:bg-[#ffc240]">
                            구매하기
                        </button>
                    </div>

                    <ul className="mb-4 flex list-disc flex-col pl-2 text-[0.5rem] leading-5 text-[#D8D8D8]">
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
                <div className="border-l"></div>

                {/* 가운데 border 기준 - 오른쪽 */}
                <div className="flex flex-col p-[1.0625rem]">
                    <div className="flex items-end gap-1.5">
                        <img src={leafGold} alt="" className="w-[1.5625rem]" />
                        <div className="flex items-center gap-0.5">
                            <img src={leafGray} alt="" className="w-2" />
                            <p className="text-[0.4375rem] font-medium text-[#BBBBBB]">
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
                        <p className="text-[0.6875rem] leading-[1.125rem] text-[#D8D8D8]">
                            골든 리프는 책을 뽑을 때 사용하는 아이템이에요! 한
                            번 뽑을 때마다 골든 리프 1개가 소모됩니다.
                        </p>
                    </div>

                    <div className="mb-[1.4375rem] mt-2.5 flex items-center justify-center">
                        <button
                            type="button"
                            className="h-[1.8125rem] w-full rounded-full border text-[0.5rem] text-[#D8D8D8] transition-colors hover:border-none hover:bg-[#FAC453] hover:text-black active:bg-[#ffc240]">
                            구매하기
                        </button>
                    </div>

                    <ul className="mb-4 flex list-disc flex-col pl-2 text-[0.5rem] leading-5 text-[#D8D8D8]">
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
            <button onClick={onClose} className="absolute right-5 top-5">
                <img src={close} alt="닫기" className="w-3" />
            </button>
        </div>
    );
}

export default LeafCharge;
