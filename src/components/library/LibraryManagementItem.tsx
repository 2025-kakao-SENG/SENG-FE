import read from '@/assets/images/read.svg';
import bin from '@/assets/images/bin.svg';

interface BookItemProps {
    pid: number;
    image: string;
    createdAt: string;
    handleSearchBook: (Pid: number) => void;
    handleDeleteBook: (Pid: number) => void;
}

function LibraryManagementItem({
    pid,
    image,
    createdAt,
    handleSearchBook,
    handleDeleteBook,
}: BookItemProps) {
    return (
        <div className="flex cursor-pointer flex-col items-center text-xs font-medium text-[#999999]">
            <div className="group relative">
                <img
                    src={image}
                    alt="book"
                    className="h-[13.375rem] w-[8.375rem] rounded-[0.9375rem] transition-opacity duration-300 group-hover:opacity-50"
                />
                <div className="absolute bottom-4 right-4 flex items-center justify-center gap-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                        type="button"
                        onClick={() => handleSearchBook(pid)}
                        className="group-hover:opacity-100"
                        aria-label="Search Book">
                        <img src={read} alt="book icon" className="h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDeleteBook(pid)}
                        className="group-hover:opacity-100"
                        aria-label="Delete Book">
                        <img src={bin} alt="delete icon" className="h-5" />
                    </button>
                </div>
            </div>
            <p className="mt-3">도서 생성일</p>
            <p>{createdAt}</p>
        </div>
    );
}

export default LibraryManagementItem;
