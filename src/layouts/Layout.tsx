import {Outlet} from 'react-router-dom';
import MenuBar from '../components/MenuBar';

function Layout() {
    return (
        <div className="flex h-screen w-screen bg-black text-white">
            <header className="h-full w-[12.5rem] items-center justify-center">
                <MenuBar />
            </header>
            <main className="h-full overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
