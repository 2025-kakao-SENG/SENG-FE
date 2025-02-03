import {Outlet, useLocation} from 'react-router-dom';
import Book from '@/components/book/Book';

function Home() {
    const location = useLocation();
    return (
        <div className="flex h-full w-full">
            <div
                className={`flex h-full ${location.pathname === '/home' ? 'w-full' : 'ml-5 w-auto'} flex-none flex-col items-center justify-center gap-y-[3%]`}>
                <Book />
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
