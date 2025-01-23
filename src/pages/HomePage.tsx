import {Outlet} from 'react-router-dom';
import Palette from '@/components/Palette';
/* import Book from '@/components/book/FlipBookDemo'; */
import Book from '@/components/book/FlipBookDemo';

function Home() {
    return (
        <div className="flex h-full w-full">
            <div className="flex h-full w-full flex-col">
                <div className="h-[5rem] w-[30vw]">
                    <Palette />
                </div>
                <div className="flex h-full w-full flex-none items-center justify-center">
                    <Book />
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
