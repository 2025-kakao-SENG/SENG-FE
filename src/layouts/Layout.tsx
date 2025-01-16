import {Outlet} from 'react-router-dom';
import MenuBar from '../components/MenuBar';

function Layout() {
    return (
        <div className="flex min-h-screen bg-black text-white">
            <header className="h-screen pb-[1.75rem] pl-[1rem]">
                <nav>
                    <MenuBar />
                </nav>
            </header>
            <main className="h-screen overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
