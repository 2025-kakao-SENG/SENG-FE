import LibraryItem from '@/components/library/LibraryItem';
import bookTest from '@/assets/images/bookTest.svg';
import useSearchBooksApi from '@/hooks/apis/library/useSearchBooksApi';
import {useEffect, useState} from 'react';
import {
    BookInfo,
    SearchBooksApiRequest,
    SearchBooksApiResponse,
} from '@/types/apis/library/searchBooksApiTypes';
import useSearchBookApi from '@/hooks/apis/library/useSearchBookApi';
import {
    SearchBookApiRequest,
    SearchBookApiResponse,
} from '@/types/apis/library/searchBookApiTypes';
import useDeleteBookApi from '@/hooks/apis/library/useDeleteBookApi';
import {
    DeleteBookApiRequest,
    DeleteBookApiResponse,
} from '@/types/apis/library/deleteBookApiTypes';
import {useDispatch, useSelector} from 'react-redux';
import {getUserId} from '@/redux/selector';
import useChargeLeafApi from '@/hooks/apis/useChargeLeafApi';
import {setDisplayBookInfo} from '@/redux/slice/displayBookSlice';
import {produce} from 'immer';

function LibraryManagementPage() {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);

    const {searchBooksApi, isLoading: booksLoading} = useSearchBooksApi();
    const {searchBookApi, isLoding: bookLoading} = useSearchBookApi();
    const {deleteBookApi, isLoding: deleteBookLoading} = useDeleteBookApi();
    const {chargeLeafApi, isLoding: chargeLeafLoading} = useChargeLeafApi();

    const [libraryItems, setLibraryItems] = useState<BookInfo[]>([]);

    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
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

    const ChargeLeaf = async () => {
        if (!userId) {
            setErrorMessage('로그인 정보가 없습니다.');
            return;
        }

        try {
            const response = await chargeLeafApi({
                id: parseInt(userId, 10),
                leaf: 100,
            });

            if (!('error' in response)) {
                console.log('리프 충전 결과', response);
            } else {
                setErrorMessage(response.error);
            }
        } catch {
            setErrorMessage('리프를 충전하는 중 오류가 발생했습니다.');
        }
    };

    const handleSearchBook = (Pid: number) => {
        dispatch(setDisplayBookInfo(Pid));
    };

    const handleDeleteBook = async (Pid: number) => {
        try {
            const request: DeleteBookApiRequest = {
                pid: Pid,
            };

            const response: DeleteBookApiResponse =
                await deleteBookApi(request);

            if (response) {
                setIsDeleteSuccess(true);
                setLibraryItems(
                    produce(libraryItems, draft => {
                        return draft.filter(book => Number(book.pid) !== Pid);
                    }),
                );
                setTimeout(() => {
                    setIsDeleteSuccess(false);
                }, 1500);
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
        <div>
            <h2 className="flex text-sm font-semibold">
                <p className="text-[#DBAC4A]">@Noah</p>
                <p className="text-[#C9C9C9]">의 책장</p>
            </h2>
            {booksLoading ? (
                <div className="flex h-full items-center justify-center">
                    <div className="loader" />
                    <p className="ml-2 text-lg">로딩중...</p>
                </div>
            ) : (
                <div
                    className="mt-[2.375rem] flex h-[32vw] flex-wrap gap-[2.625rem] overflow-y-scroll pl-[0.5625rem]"
                    style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                    {libraryItems.map(book => (
                        <LibraryItem
                            key={book.pid}
                            pid={Number(book.pid)}
                            image={bookTest}
                            createdAt={book.created_at}
                            handleSearchBook={handleSearchBook}
                            handleDeleteBook={handleDeleteBook}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default LibraryManagementPage;
