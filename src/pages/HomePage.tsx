import {Outlet} from 'react-router-dom';
import Palette from '@/components/Palette';
import Book from '@/components/book/BookPC';

function Home() {
    return (
        <div className="flex">
            <div className="flex flex-col">
                <div className="h-[5rem] w-[30vw]">
                    <Palette />
                </div>
                <Book />
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
