import LibraryManagementItem from '@/components/library/LibraryManagementItem';
import bookTest from '@/assets/images/bookTest.svg';
import useSearchBooksApi from '@/hooks/apis/library/useSearchBooksApi';
import {useEffect, useState} from 'react';
import {
    BookInfo,
    SearchBooksApiRequest,
    SearchBooksApiResponse,
} from '@/types/apis/library/searchBooksApiTypes';
import useDeleteBookApi from '@/hooks/apis/library/useDeleteBookApi';
import {
    DeleteBookApiRequest,
    DeleteBookApiResponse,
} from '@/types/apis/library/deleteBookApiTypes';
import {useDispatch, useSelector} from 'react-redux';
import {getUserId, getUserLoginData} from '@/redux/selector';
import {setDisplayBookInfo} from '@/redux/slice/displayBookSlice';
import {produce} from 'immer';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@/constants/ThemeProvider';

function LibraryManagementPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const userData = useSelector(getUserLoginData);
    const {isDarkMode} = useTheme();

    const {searchBooksApi, isLoading: booksLoading} = useSearchBooksApi();
    const {deleteBookApi, isLoading: deleteBookLoading} = useDeleteBookApi();

    const [libraryItems, setLibraryItems] = useState<BookInfo[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const [openDeleteCheck, setOpenDeleteCheck] = useState<number | null>(null);
    const [checkDeleteNnumber, setDeleteNumber] = useState<number | null>(null);

    const FetchSearchBooksApi = async () => {
        if (!userId) {
            return;
        }

        try {
            const request: SearchBooksApiRequest = {
                user_pid: Number(userId),
            };

            const response: SearchBooksApiResponse =
                await searchBooksApi(request);

            if (!('error' in response)) {
                setLibraryItems(response);
            } else {
                setErrorMessage(response.error);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('책장 정보를 불러오는 중 오류가 발생했습니다.');
            }
        }
    };

    const handleSearchBook = (Pid: number) => {
        dispatch(setDisplayBookInfo(Pid));
        navigate('/home/ai');
    };

    const DeleteBook = async (Pid: number) => {
        try {
            const request: DeleteBookApiRequest = {
                pid: Pid,
            };

            const response: DeleteBookApiResponse =
                await deleteBookApi(request);

            if (response) {
                setLibraryItems(
                    produce(libraryItems, draft => {
                        return draft.filter(book => Number(book.pid) !== Pid);
                    }),
                );
            } else {
                setErrorMessage('책 정보를 삭제하는 데 실패했습니다.');
            }
        } catch {
            setErrorMessage('책 정보를 삭제하는 중 오류가 발생했습니다.');
        }
    };

    // 라이브러리 책 정보 불러오기
    useEffect(() => {
        FetchSearchBooksApi();
    }, []);

    useEffect(() => {
        if (checkDeleteNnumber) {
            DeleteBook(checkDeleteNnumber);
        }
    }, [checkDeleteNnumber]);

    return (
        <div className="h-full w-full">
            {!userId ? (
                <p className="text-lg text-[#DBAC4A]">로그인이 필요합니다.</p>
            ) : (
                <>
                    <h2 className="flex text-sm font-semibold">
                        <p className="text-[#DBAC4A]">
                            {userData.name}
                            <span
                                className={`font-semibold ${
                                    isDarkMode ? 'text-[#B1B1B1]' : 'text-black'
                                }`}>
                                {' '}
                                님의 책장
                            </span>
                        </p>
                    </h2>
                    <div
                        className="mt-[2.375rem] flex h-[32vw] flex-wrap gap-[2.625rem] overflow-y-scroll pl-[0.5625rem]"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}>
                        {libraryItems.map(book => (
                            <LibraryManagementItem
                                key={book.pid}
                                pid={Number(book.pid)}
                                image={bookTest}
                                createdAt={book.created_at}
                                handleSearchBook={handleSearchBook}
                                handleDeleteBook={() =>
                                    setOpenDeleteCheck(Number(book.pid))
                                }
                            />
                        ))}
                    </div>
                </>
            )}
            {(deleteBookLoading || booksLoading) && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-b-5 h-32 w-32 animate-spin rounded-full border-t-[7px] border-[#DBAC4A]" />
                        <p className="mt-5 text-[#DBAC4A]">
                            {deleteBookLoading && '책 정보를 삭제하는 중...'}
                            {booksLoading && '책 정보를 불러오는 중...'}
                        </p>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-[#111111] p-5">
                        <p className="text-lg text-[#DBAC4A]">{errorMessage}</p>
                        <button
                            type="button"
                            onClick={() => setErrorMessage('')}
                            className="mt-2 rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b88a3a]">
                            확인
                        </button>
                    </div>
                </div>
            )}
            {openDeleteCheck && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div
                        className={`flex flex-col items-center justify-center gap-3 rounded-[0.9375rem] p-5 transition-colors duration-300 ${
                            isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
                        }`}>
                        <p className="text-lg text-[#DBAC4A]">알림</p>
                        <p
                            className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? 'text-[#C9C9C9]' : 'text-black'
                            }`}>
                            책 정보를 삭제하시겠습니까?
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setDeleteNumber(openDeleteCheck);
                                    setOpenDeleteCheck(null);
                                }}
                                className="rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b88a3a]">
                                확인
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setOpenDeleteCheck(null);
                                }}
                                className="rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b88a3a]">
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LibraryManagementPage;
