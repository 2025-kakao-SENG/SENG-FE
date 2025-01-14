import {Outlet} from 'react-router-dom';
import Palette from '../components/Palette';

function Home() {
    return (
        <div className="flex gap-[2.125rem] pt-[2.375rem]">
            <div className="flex flex-col">
                <Palette />
                <div className="">책 들어올 자리</div>
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
