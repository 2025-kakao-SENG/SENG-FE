import {Outlet} from 'react-router-dom';
import Book from '@/components/book/Book';
import Palette from '@/components/Palette';

function Home() {
    return (
        <div className="flex gap-[2.125rem] pt-[2.375rem]">
            <div className="flex flex-col">
                <div className="h-[5rem] w-[30rem]">
                    <Palette />
                </div>
                <Book />
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
