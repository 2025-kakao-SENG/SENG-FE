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

function LibraryPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);

    const {searchBooksApi, isLoading: booksLoading} = useSearchBooksApi();
    const {deleteBookApi, isLoading: deleteBookLoading} = useDeleteBookApi();

    const [libraryItems, setLibraryItems] = useState<BookInfo[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const FetchSearchBooksApi = async () => {
        if (!userId) {
            setErrorMessage('로그인 정보가 없습니다.');
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

    const handleDeleteBook = async (Pid: number) => {
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

    return (
        <div className="h-full w-full">
            <div
                className="bookshelf flex h-full w-full flex-wrap justify-center gap-[2.3125rem] overflow-y-scroll py-[4.8125rem] pl-5"
                style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {libraryItems.map(book => (
                    <LibraryItem
                        key={book.pid}
                        pid={Number(book.pid)}
                        image={bookTest}
                        handleSearchBook={handleSearchBook}
                        handleDeleteBook={handleDeleteBook}
                    />
                ))}
            </div>
            {(booksLoading || deleteBookLoading) && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex items-center justify-center">
                        <div className="border-b-5 h-32 w-32 animate-spin rounded-full border-t-[7px] border-[#DBAC4A]" />
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center gap-3 rounded-[0.9375rem] bg-[#1E1E1E] p-5">
                        <p className="text-lg text-[#DBAC4A]">알림</p>
                        <p className="text-sm text-[#C9C9C9]">{errorMessage}</p>
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

export default LibraryPage;
