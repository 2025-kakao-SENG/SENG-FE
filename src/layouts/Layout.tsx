import {Outlet} from 'react-router-dom';
import MenuBar from '../components/MenuBar';

function Layout() {
    return (
        <div className="flex bg-black text-white">
            <header className="pb-[1.75rem] pl-[1rem]">
                <nav>
                    <MenuBar />
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
