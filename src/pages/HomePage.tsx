import {Outlet, useLocation} from 'react-router-dom';
import Palette from '@/components/Palette';
import Book from '@/components/book/Book';

function Home() {
    const location = useLocation();
    return (
        <div className="flex h-full w-full">
            <div
                className={`flex h-full ${location.pathname === '/home' ? 'w-full' : 'w-auto'} flex-none flex-col items-center justify-center`}>
                <Palette />
                <Book />
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
