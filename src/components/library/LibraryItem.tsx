import read from '@/assets/images/read.svg';
import bin from '@/assets/images/bin.svg';

interface BookItemProps {
    pid: number;
    image: string;
    handleSearchBook: (Pid: number) => void;
    handleDeleteBook: (Pid: number) => void;
}

function LibraryItem({
    pid,
    image,
    handleSearchBook,
    handleDeleteBook,
}: BookItemProps) {
    return (
        <div className="group relative h-[16.6875rem] w-[10.4375rem] transform cursor-pointer overflow-hidden rounded-2xl transition-transform duration-200 hover:animate-wiggle hover:drop-shadow-glow-yellow">
            <img
                src={image}
                alt="book"
                className="h-full w-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
            />
            <div className="absolute bottom-3 right-3 flex items-center justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                    type="button"
                    onClick={() => handleSearchBook(pid)}
                    className="h-[0.82125rem] w-[0.98125rem] group-hover:opacity-100"
                    aria-label="Search Book">
                    <img src={read} alt="book icon" className="h-full w-full" />
                </button>
                <button
                    type="button"
                    onClick={() => handleDeleteBook(pid)}
                    className="h-[1.0625rem] w-[0.855rem] group-hover:opacity-100"
                    aria-label="Delete Book">
                    <img
                        src={bin}
                        alt="delete icon"
                        className="h-full w-full"
                    />
                </button>
            </div>
        </div>
    );
}

export default LibraryItem;
