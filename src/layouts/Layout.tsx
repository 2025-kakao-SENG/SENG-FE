import {Outlet, Link} from 'react-router-dom';

function Layout() {
    return (
        <div className="flex">
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">홈</Link>
                        </li>
                        <li>
                            <Link to="/settings/myPage">마이 페이지</Link>
                        </li>
                        <li>
                            <Link to="/library">라이브러리</Link>
                        </li>
                        <li>
                            <Link to="/home/ai">AI</Link>
                        </li>
                        <li>
                            <Link to="/settings/community">커뮤니티</Link>
                        </li>
                        <li>
                            <Link to="/settings/display">설정</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
