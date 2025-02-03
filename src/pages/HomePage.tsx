import {Outlet, useLocation} from 'react-router-dom';
import Book from '@/components/book/Book';

function Home() {
    const location = useLocation();
    return (
        <div className="flex h-full w-full">
            <div
                className={`flex h-full ${location.pathname === '/home' ? 'w-full' : 'ml-2 w-auto'} flex-none items-center justify-center`}>
                <Book />
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
