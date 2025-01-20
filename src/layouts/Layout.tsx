import {Outlet} from 'react-router-dom';
import MenuBar from '../components/MenuBar';

function Layout() {
    return (
        <div className="absolute flex h-full w-full">
            <header className="h-full w-[15vw] items-center justify-center">
                <MenuBar />
            </header>
            <main className="flex h-full w-[85vw] items-center justify-center overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
