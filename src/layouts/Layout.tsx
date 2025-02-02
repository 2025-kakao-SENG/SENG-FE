import {Outlet} from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import {useTheme} from '@/constants/ThemeProvider';

function Layout() {
    const {isDarkMode} = useTheme();

    return (
        <div
            className={`absolute flex h-full w-full ${
                isDarkMode ? 'bg-black text-white' : 'bg-[#fafafa] text-black'
            }`}>
            <header className="h-full w-auto items-center justify-center">
                <MenuBar />
            </header>
            <main className="ml-10 flex h-full w-[85vw] justify-between overflow-hidden py-[2.375rem]">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
