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
        <div className="group relative flex h-[16.6875rem] w-[10.4375rem] transform cursor-pointer items-start justify-center overflow-hidden rounded-2xl bg-white transition-transform duration-200 hover:animate-wiggle hover:drop-shadow-glow-yellow">
            <img
                src={image}
                alt="book"
                className="mt-10 h-20 object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
            />
            <div className="absolute bottom-5 right-5 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                    type="button"
                    onClick={() => handleSearchBook(pid)}
                    className="h-6 group-hover:opacity-100"
                    aria-label="Search Book">
                    <img src={read} alt="book icon" className="h-full w-full" />
                </button>
                <button
                    type="button"
                    onClick={() => handleDeleteBook(pid)}
                    className="h-6 group-hover:opacity-100"
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
