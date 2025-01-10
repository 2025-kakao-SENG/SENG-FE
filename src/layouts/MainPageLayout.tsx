import {Outlet, Link} from 'react-router-dom';

function Layout() {
    return (
        <div className="flex">
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/main/home">홈</Link>
                        </li>
                        <li>
                            <Link to="/main/setting/myPage">마이 페이지</Link>
                        </li>
                        <li>
                            <Link to="/main/library">라이브러리</Link>
                        </li>
                        <li>
                            <Link to="/main/AI">AI</Link>
                        </li>
                        <li>
                            <Link to="/main/community">커뮤니티</Link>
                        </li>
                        <li>
                            <Link to="/main/setting">설정</Link>
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
