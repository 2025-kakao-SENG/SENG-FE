import {Outlet} from 'react-router-dom';
import Palette from '@/components/Palette';
import Book from '@/components/book/Book';

function Home() {
    return (
        <div className="flex h-full w-full">
            <div className="flex h-full w-auto flex-none flex-col items-center justify-center">
                <Palette />
                <Book />
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
