import {Outlet} from 'react-router-dom';
import {useTheme} from '@/constants/ThemeProvider';
import MenuBar from '@/components/MenuBar';

function Layout() {
    const {isDarkMode} = useTheme();

    return (
        <div
            className={`absolute flex h-full w-full ${
                isDarkMode ? 'bg-black text-white' : 'bg-[#F3F3F3] text-black'
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
