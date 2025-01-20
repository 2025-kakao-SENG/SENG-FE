import React, {useEffect, useRef, useState} from 'react';
import useFetchCategoriesApi from '@/hooks/apis/categories/useAiFetchCategoriesApi';
import useFetchSubCategoriesApi from '@/hooks/apis/categories/useAiFecthSubCategoriesApi';
import {
    CategoriesApiResponse,
    Category,
} from '@/types/category/categoriesTypes';
import rightArrow from '@/assets/images/sideBar/rightArrow.svg';
import aiYellow from '@/assets/images/aiYellow.svg';
import leftArrow from '@/assets/images/sideBar/leftArrow.svg';
import aiBlack from '@/assets/images/sideBar/aiBlack.svg';
import logoTransparent from '@/assets/images/sideBar/logoTransparent.png';
import rightArrow2 from '@/assets/images/sideBar/rightArrow2.svg';
import {SubCategoryApiRequest} from '@/types/category/subCategoriesTypes';

interface SideBarProps {
    isModalOpen: boolean;
}

export default function SideBar({isModalOpen}: SideBarProps) {
    const {fetchCategoriesApi, isLoading: categoriesLoading} =
        useFetchCategoriesApi();
    const {fetchSubCategoriesApi, isLoading: subCategoriesLoading} =
        useFetchSubCategoriesApi();

    const [activeCategoryName, setActiveCategoryName] = useState('');
    const [currentCategoryNamePath, setCurrentCategoryNamePath] = useState<
        string[]
    >([]);

    const depth = useRef(0);
    const [categoriesView, setCategoriesView] = useState<string[]>([]);
    const [dafaultCategories, setDafaultCategories] = useState<Category[]>([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [isSidebarPartiallyOpen, setIsSidebarPartiallyOpen] = useState(true);

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const response: CategoriesApiResponse =
                    await fetchCategoriesApi();

                if (response && !('error' in response)) {
                    setDafaultCategories(response);
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
        fetchDate();
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

    return (
        <div
            className={`fixed right-0 flex h-[51.5vw] w-[23vw] transform flex-col rounded-[0.6875rem] bg-[#111111] transition-transform duration-300 ${
                isSidebarPartiallyOpen ? 'translate-x-0' : 'translate-x-[90%]'
            }`}
            style={{
                display: isModalOpen ? 'none' : 'block', // 모달 열릴 때 SideBar 숨기기
            }}>
            <div className="pl-[0.5625rem] pt-[0.9375rem]">
                <button
                    type="button"
                    className="rounded-lg px-2 py-2.5 hover:bg-[#4a4a4a]"
                    onClick={() =>
                        setIsSidebarPartiallyOpen(!isSidebarPartiallyOpen)
                    }>
                    <img
                        src={isSidebarPartiallyOpen ? rightArrow : leftArrow}
                        alt="toggle button"
                        className="h-2.5 w-3.5"
                    />
                </button>
            </div>

            <div className="flex-grow px-[1.0625rem]">
                <div className="mb-[1.27rem] mt-[1.0625rem]">
                    <img src={aiYellow} alt="" className="h-11 w-10" />
                </div>

                <div>
                    <h3 className="text-[0.6875rem] font-extrabold text-[#D4D4D4]">
                        카테고리를 선택해주세요.
                    </h3>
                </div>

                <div className="mb-[1.625rem] mt-3 flex flex-wrap gap-x-2 gap-y-[0.4375rem] py-[0.4375rem] pr-[1.125rem] text-[0.6875rem] font-medium text-[#FAC453]">
                    {categoriesView.map(category => (
                        <button
                            type="button"
                            key={category}
                            onClick={() => handleCategoryClick(category)}
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

                <div className="mb-7 w-[20.5rem]">
                    <div className="flex items-center justify-start gap-2 rounded-[0.25rem] bg-[#1C1C1C] px-2.5 py-[0.875rem] text-[0.6875rem] font-medium text-[#F6F6F6]">
                        {[...currentCategoryNamePath]
                            .reverse()
                            .map((path, index) => (
                                <React.Fragment key={path}>
                                    <button
                                        type="button"
                                        className={
                                            index ===
                                            currentCategoryNamePath.length - 1
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
                                        currentCategoryNamePath.length - 1 && (
                                        <img src={rightArrow2} alt="arrow" />
                                    )}
                                </React.Fragment>
                            ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="flex h-[2.1875rem] w-full items-center justify-center gap-1.5 rounded-[0.25rem] bg-[#FFC752] hover:bg-[#EEB02F]">
                    <img src={aiBlack} alt="" className="" />
                    <p className="text-[0.6875rem] font-medium text-[#000000]">
                        생성하기
                    </p>
                </button>
            </div>

            {errorMessage && (
                <div className="absolute bottom-0 w-full bg-[#FF0000] py-1.5 text-center text-white">
                    {errorMessage}
                </div>
            )}

            <div className="ml-20">
                <img src={logoTransparent} alt="" className="" />
            </div>
        </div>
    );
}
