import {Outlet} from 'react-router-dom';

function Home() {
    return (
        <>
            <div>
                <h1>홈 페이지</h1>
            </div>
            <Outlet />
        </>
    );
}

export default Home;
