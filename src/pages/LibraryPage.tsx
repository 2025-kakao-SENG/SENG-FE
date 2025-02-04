import bookTest from '@/assets/images/bookTest.svg';
import LibraryItem from '@/components/library/LibraryItem';
import {setDisplayBookInfo} from '@/redux/slice/displayBookSlice';
import {
    DeleteBookApiRequest,
    DeleteBookApiResponse,
} from '@/types/apis/library/deleteBookApiTypes';
import {produce} from 'immer';
import {
    BookInfo,
    SearchBooksApiRequest,
    SearchBooksApiResponse,
} from '@/types/apis/library/searchBooksApiTypes';
import {useEffect, useState} from 'react';
import useDeleteBookApi from '@/hooks/apis/library/useDeleteBookApi';
import useSearchBooksApi from '@/hooks/apis/library/useSearchBooksApi';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getUserId} from '@/redux/selector';
import {useTheme} from '@/constants/ThemeProvider';

function LibraryPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const {isDarkMode} = useTheme();

    const {searchBooksApi, isLoading: booksLoading} = useSearchBooksApi();
    const {deleteBookApi, isLoading: deleteBookLoading} = useDeleteBookApi();

    const [libraryItems, setLibraryItems] = useState<BookInfo[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const [openDeleteCheck, setOpenDeleteCheck] = useState<number | null>(null);
    const [checkDeleteNnumber, setDeleteNumber] = useState<number | null>(null);

    const FetchSearchBooksApi = async () => {
        if (!userId) {
            setErrorMessage('로그인이 필요합니다.');
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
            <div
                className="bookshelf flex h-full w-full flex-wrap gap-[2.3125rem] overflow-y-scroll py-[4.8125rem] pl-5"
                style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {libraryItems.map(book => (
                    <LibraryItem
                        key={book.pid}
                        pid={Number(book.pid)}
                        image={bookTest}
                        handleSearchBook={handleSearchBook}
                        handleDeleteBook={() =>
                            setOpenDeleteCheck(Number(book.pid))
                        }
                    />
                ))}
            </div>
            {(booksLoading || deleteBookLoading) && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-b-5 h-32 w-32 animate-spin rounded-full border-t-[7px] border-[#DBAC4A]" />
                        <p className="mt-5 text-[#DBAC4A]">
                            {booksLoading && '책 정보를 불러오는 중...'}
                            {deleteBookLoading && '책 정보를 삭제하는 중...'}
                        </p>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
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
                            className="mt-2 rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b88a3a]">
                            확인
                        </button>
                    </div>
                </div>
            )}
            {openDeleteCheck && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div
                        className={`flex flex-col items-center justify-center gap-3 rounded-[0.9375rem] p-5 transition-colors duration-300 ${
                            isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white shadow-xl'
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

export default LibraryPage;
