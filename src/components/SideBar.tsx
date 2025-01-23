import React, {useEffect, useRef, useState} from 'react';
import useFetchCategoriesApi from '@/hooks/apis/categories/useAiFetchCategoriesApi';
import useFetchSubCategoriesApi from '@/hooks/apis/categories/useAiFecthSubCategoriesApi';
import {
    CategoriesApiResponse,
    Category,
} from '@/types/apis/category/categoriesTypes';
import rightArrow from '@/assets/images/sideBar/rightArrow.svg';
import aiYellow from '@/assets/images/aiYellow.svg';
import leftArrow from '@/assets/images/sideBar/leftArrow.svg';
import aiBlack from '@/assets/images/sideBar/aiBlack.svg';
import logoTransparent from '@/assets/images/sideBar/logoTransparent.png';
import rightArrow2 from '@/assets/images/sideBar/rightArrow2.svg';
import {SubCategoryApiRequest} from '@/types/apis/category/subCategoriesTypes';
import {useDispatch, useSelector} from 'react-redux';
import {getCreateContentPid, getUserId} from '@/redux/selector';
import {setCreateBookInfo} from '@/redux/slice/createBookSlice';
import Palette from '@/components/Palette';
import {setCreateContentSignal} from '@/redux/slice/createContentSlice';

interface SideBarProps {
    isModalOpen: boolean;
}

export default function SideBar({isModalOpen}: SideBarProps) {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const createContentPid = useSelector(getCreateContentPid);
    const {fetchCategoriesApi, isLoading: categoriesLoading} =
        useFetchCategoriesApi();
    const {fetchSubCategoriesApi, isLoading: subCategoriesLoading} =
        useFetchSubCategoriesApi();

    // ✅ 태블릿 감지 (768px 이하)
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);
    const [isVisible, setIsVisible] = useState(true);

    const [activeCategoryName, setActiveCategoryName] = useState('');
    const [currentCategoryNamePath, setCurrentCategoryNamePath] = useState<
        string[]
    >([]);

    const depth = useRef(0);
    const [categoriesView, setCategoriesView] = useState<string[]>([]);
    const [dafaultCategories, setDefaultCategories] = useState<Category[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSidebarPartiallyOpen, setIsSidebarPartiallyOpen] = useState(true);

    // ✅ 화면 크기 감지 (태블릿 여부 체크 + 깜빡임 방지)
    useEffect(() => {
        const checkScreenSize = () => {
            const isNowTablet = window.innerWidth <= 768;
            if (isNowTablet !== isTablet) {
                setIsVisible(false); // 변경될 때 잠시 숨김
                setTimeout(() => {
                    setIsTablet(isNowTablet);
                    setIsVisible(true);
                }, 200); // 200ms 후 변경 적용
            }
        };

        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [isTablet]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: CategoriesApiResponse =
                    await fetchCategoriesApi();
                if (response && !('error' in response)) {
                    setDefaultCategories(response);
                    setCategoriesView(
                        response.map(category => category.category_name),
                    );
                } else {
                    setErrorMessage(response.error);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage(
                        '카테고리 데이터를 불러오는 중 오류가 발생했습니다.',
                    );
                }
            }
        };
        fetchData();
    }, []);

    const handleCategoryClick = (category: string) => {
        setActiveCategoryName(category);
    };

    const handlePathClick = (index: number) => {
        setCurrentCategoryNamePath(currentCategoryNamePath.slice(0, index + 1));
    };

    const handleNextClick = async () => {
        if (
            activeCategoryName &&
            !currentCategoryNamePath.includes(activeCategoryName)
        ) {
            if (depth.current === 0) {
                const categoryTemp = dafaultCategories.find(
                    category => category.category_name === activeCategoryName,
                );

                if (categoryTemp) {
                    setCategoriesView(
                        categoryTemp.subcategories.map(
                            subcategory => subcategory.subcategory_name,
                        ),
                    );
                } else {
                    setErrorMessage('카테고리를 찾을 수 없습니다.');
                }
            } else {
                const request: SubCategoryApiRequest = {
                    category: activeCategoryName,
                };
                const response = await fetchSubCategoriesApi(request);

                if (
                    response &&
                    !('error' in response) &&
                    !('info' in response)
                ) {
                    setCategoriesView(response);
                } else {
                    if ('error' in response) {
                        setErrorMessage(response.error);
                    }
                    if ('info' in response) {
                        setErrorMessage(response.info);
                    }
                    setErrorMessage('카테고리를 찾을 수 없습니다.');
                }
            }
            depth.current += 1;
            setCurrentCategoryNamePath([
                activeCategoryName,
                ...currentCategoryNamePath,
            ]);
        } else {
            setErrorMessage('이미 선택한 카테고리입니다.');
        }
    };

    const handlePreviousClick = () => {
        if (currentCategoryNamePath.length > 1) {
            setCurrentCategoryNamePath(currentCategoryNamePath.slice(1));
        }
    };

    const handleCreateBook = async () => {
        if (userId === null) {
            setErrorMessage('로그인이 필요합니다.');
            return;
        }

        dispatch(
            setCreateBookInfo({
                user_pid: parseInt(userId, 10),
                category_arr: currentCategoryNamePath,
            }),
        );
    };

    const handleCreateContent = () => {
        if (createContentPid) {
            dispatch(setCreateContentSignal());
        }
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isVisible && (
                <div
                    className={`fixed z-10 flex transition-transform duration-300 ${
                        isTablet
                            ? `bottom-0 left-0 w-full flex-col items-center ${
                                  isSidebarPartiallyOpen
                                      ? 'translate-y-0'
                                      : 'translate-y-[100%]'
                              }`
                            : `right-0 h-[calc(100%-4rem)] w-[23vw] flex-col ${
                                  isSidebarPartiallyOpen
                                      ? 'translate-x-0'
                                      : 'translate-x-[90%]'
                              }`
                    }`}
                    style={{
                        display: isModalOpen ? 'none' : 'block',
                        top: isTablet ? 'auto' : '2rem',
                        bottom: isTablet ? '0' : '2rem',
                    }}>
                    {isTablet && (
                        <div className="absolute left-1/2 top-5 flex w-full -translate-x-1/2 justify-center">
                            <Palette />
                        </div>
                    )}

                    {/* ✅ 기존 SideBar 유지 (버튼, UI, 기능 변경 없음) */}
                    <div
                        className={`bg-[#111111] shadow-lg transition-opacity duration-300 ${
                            isTablet
                                ? 'w-full flex-row justify-around p-3'
                                : 'h-full rounded-[0.6875rem]'
                        }`}>
                        {!isTablet && (
                            <div className="pl-[0.5625rem] pt-[0.9375rem]">
                                <button
                                    type="button"
                                    className="rounded-lg px-2 py-2.5 hover:bg-[#4a4a4a]"
                                    onClick={() =>
                                        setIsSidebarPartiallyOpen(
                                            !isSidebarPartiallyOpen,
                                        )
                                    }>
                                    <img
                                        src={
                                            isSidebarPartiallyOpen
                                                ? rightArrow
                                                : leftArrow
                                        }
                                        alt="toggle button"
                                        className="h-2.5 w-3.5"
                                    />
                                </button>
                            </div>
                        )}

                        <div className="flex-grow px-[1.0625rem]">
                            <div className="mb-[1.27rem] mt-[1.0625rem]">
                                <img
                                    src={aiYellow}
                                    alt=""
                                    className="h-11 w-10"
                                />
                            </div>

                            <h3 className="text-[0.6875rem] font-extrabold text-[#D4D4D4]">
                                카테고리를 선택해주세요.
                            </h3>

                            <div className="mb-[1.625rem] mt-3 flex flex-wrap gap-x-2 gap-y-[0.4375rem] py-[0.4375rem] pr-[1.125rem] text-[0.6875rem] font-medium text-[#FAC453]">
                                {categoriesView.map(category => (
                                    <button
                                        type="button"
                                        key={category}
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                        className={
                                            activeCategoryName === category
                                                ? 'rounded-[0.6875rem] bg-gradient-to-r from-[#FFDD87] to-[#FFC752] px-[1.125rem] py-[0.4375rem] text-black'
                                                : 'rounded-[0.6875rem] bg-[#1C1C1C] px-[1.125rem] py-[0.4375rem] hover:bg-[#2D2D2D]'
                                        }>
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between gap-2.5">
                                <button
                                    type="button"
                                    className="h-[2.1875rem] w-full rounded-[0.25rem] bg-[#2D2D2D] text-[0.6875rem] font-medium text-[#BEBEBE] hover:bg-[#3D3D3D]"
                                    onClick={handlePreviousClick}>
                                    이전 카테고리
                                </button>

                                <button
                                    type="button"
                                    className="h-[2.1875rem] w-full rounded-[0.25rem] bg-[#FFC752] text-[0.6875rem] font-medium text-[#111111] hover:bg-[#EEB02F]"
                                    onClick={handleNextClick}>
                                    다음으로
                                </button>
                            </div>

                            <div className="mb-3 mt-6">
                                <p className="text-[0.6875rem] font-extrabold text-[#D4D4D4]">
                                    현재 카테고리
                                </p>
                            </div>

                            <div className="mb-7 w-full">
                                <div className="flex items-center justify-start gap-2 rounded-[0.25rem] bg-[#1C1C1C] px-2.5 py-[0.875rem] text-[0.6875rem] font-medium text-[#F6F6F6]">
                                    {[...currentCategoryNamePath]
                                        .reverse()
                                        .map((path, index) => (
                                            <React.Fragment key={path}>
                                                <button
                                                    type="button"
                                                    className={
                                                        index ===
                                                        currentCategoryNamePath.length -
                                                            1
                                                            ? 'text-[#FAC453]'
                                                            : 'text-[#F6F6F6]'
                                                    }
                                                    onClick={() =>
                                                        handlePathClick(
                                                            currentCategoryNamePath.length -
                                                                1 -
                                                                index,
                                                        )
                                                    }>
                                                    {path}
                                                </button>
                                                {index !==
                                                    currentCategoryNamePath.length -
                                                        1 && (
                                                    <img
                                                        src={rightArrow2}
                                                        alt="arrow"
                                                    />
                                                )}
                                            </React.Fragment>
                                        ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mb-7 flex h-[2.1875rem] w-full items-center justify-center gap-1.5 rounded-[0.25rem] bg-[#FFC752] hover:bg-[#EEB02F]"
                                onClick={handleCreateBook}>
                                <img src={aiBlack} alt="" className="" />
                                <p className="text-[0.6875rem] font-medium text-[#000000]">
                                    생성하기
                                </p>
                            </button>

                            {createContentPid && (
                                <button
                                    type="button"
                                    className="mb-7 flex h-[2.1875rem] w-full items-center justify-center gap-1.5 rounded-[0.25rem] bg-[#FFC752] hover:bg-[#EEB02F]"
                                    onClick={handleCreateContent}>
                                    <img src={aiBlack} alt="" className="" />
                                    <p className="text-[0.6875rem] font-medium text-[#000000]">
                                        컨텐츠 생성하기
                                    </p>
                                </button>
                            )}

                            {errorMessage && (
                                <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 rounded-md bg-[#FF4C4C] px-4 py-2 text-center text-[#FFFFFF]">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="absolute bottom-0 left-2/3 -translate-x-1/2">
                                <img
                                    src={logoTransparent}
                                    alt="logo"
                                    className="md:max-w-[10rem] lg:max-w-[8rem] xl:max-w-[6rem] h-auto w-auto max-w-[20rem] transition-all duration-300 ease-in-out"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
