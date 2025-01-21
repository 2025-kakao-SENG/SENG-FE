import {Outlet} from 'react-router-dom';
import MenuBar from '../components/MenuBar';

function Layout() {
    return (
        <div className="absolute flex h-full w-full">
            <header className="h-full w-[6.6vw] items-center justify-center">
                <MenuBar />
            </header>
            <main className="ml-10 flex h-full w-[85vw] justify-between overflow-hidden py-[2.375rem]">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
