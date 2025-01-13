import {Outlet} from 'react-router-dom';
import MenuBar from '../components/MenuBar';

function Layout() {
    return (
        <div className="flex bg-black text-white">
            <header className="mb-[1.75rem] ml-[1rem] mt-[2.375rem]">
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
