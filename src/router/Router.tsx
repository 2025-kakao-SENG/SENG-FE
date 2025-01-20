import {useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Layout from '@/layouts/Layout.tsx';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import HomePage from '@/pages/HomePage.tsx';
import AISideBar from '@/components/homePage/AISideBar.tsx';
import LibraryPage from '@/pages/LibraryPage.tsx';
import SettingsLayout from '@/layouts/SettingsLayout';
import MyPage from '@/pages/settings/MyPage.tsx';
import CommunityPage from '@/pages/settings/CommunityPage.tsx';
import LibraryManagementPage from '@/pages/settings/LibraryManagementPage';
import NotificationPage from '@/pages/settings/NotificationPage.tsx';
import DisplayPage from '@/pages/settings/DisplayPage.tsx';

/* const router = [
    {
        path: 'landing',
        element: <LandingPage />,
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {path: 'login', element: <LoginModalRouter />},
            {
                path: 'auth',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="login" />,
                    },
                    {
                        path: 'login',
                        element: <LoginPage />,
                    },
                    {
                        path: 'logout',
                        element: <LogoutPage />,
                    },
                    {
                        path: 'register',
                        element: <RegisterPage />,
                    },
                ],
            },
            {
                path: 'home',
                element: <HomePage />,
                children: [
                    {
                        path: 'ai',
                        element: <AISideBar />,
                    },
                ],
            },
            {
                path: 'library',
                element: <LibraryPage />,
            },
            {
                path: 'settings',
                element: <SettingsLayout />,
                children: [
                    {
                        path: 'myPage',
                        element: <MyPage />,
                    },
                    {
                        path: 'community',
                        element: <CommunityPage />,
                    },
                    {
                        path: 'libraryManagement',
                        element: <LibraryManagementPage />,
                    },
                    {
                        path: 'notification',
                        element: <NotificationPage />,
                    },
                    {
                        path: 'display',
                        element: <DisplayPage />,
                    },
                ],
            },
        ],
    },
]; */

function Router() {
    const location = useLocation();
    const navigate = useNavigate();

    // backgroundLocation 상태 저장
    const [backgroundLocation, setBackgroundLocation] = useState(null);

    // 현재 location이 모달 경로인지 확인
    const isModalRoute = ['/login', '/register'].includes(location.pathname);

    // backgroundLocation 설정
    if (!backgroundLocation && isModalRoute) {
        setBackgroundLocation(location.state?.backgroundLocation || location);
    }
    return (
        <div className="min-w-screen relative flex min-h-screen bg-black text-white">
            {/* 배경 라우트 (이전 화면) */}
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<HomePage />}>
                        <Route path="ai" element={<AISideBar />} />
                    </Route>
                    <Route path="library" element={<LibraryPage />} />
                    <Route path="settings" element={<SettingsLayout />}>
                        <Route path="myPage" element={<MyPage />} />
                        <Route path="community" element={<CommunityPage />} />
                        <Route
                            path="libraryManagement"
                            element={<LibraryManagementPage />}
                        />
                        <Route
                            path="notification"
                            element={<NotificationPage />}
                        />
                        <Route path="display" element={<DisplayPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<LandingPage />} />
            </Routes>

            {/* 모달 라우트 */}
            {isModalRoute && (
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <LoginPage
                                navigateToRegister={() =>
                                    navigate('/register', {
                                        state: {backgroundLocation},
                                    })
                                }
                            />
                        }
                    />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            )}
        </div>
    );
}

export default Router;
