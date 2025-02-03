import {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Layout from '@/layouts/Layout.tsx';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import HomePage from '@/pages/HomePage.tsx';
import AISideBar from '@/components/homePage/AISideBar';
import LibraryPage from '@/pages/LibraryPage.tsx';
import SettingsLayout from '@/layouts/SettingsLayout';
import MyPage from '@/pages/settings/MyPage.tsx';
import CommunityPage from '@/pages/settings/CommunityPage.tsx';
import LibraryManagementPage from '@/pages/settings/LibraryManagementPage';
import NotificationPage from '@/pages/settings/NotificationPage.tsx';
import DisplayPage from '@/pages/settings/DisplayPage.tsx';
import LogoutPage from '@/pages/auth/LogoutPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage';

function Router() {
    const location = useLocation();

    // backgroundLocation 상태 저장
    const [backgroundLocation, setBackgroundLocation] = useState('');

    // 현재 location이 모달 경로인지 확인
    const isModalRoute = [
        '/login',
        '/logout',
        '/register',
        '/settings/myPage',
        '/settings/community',
        '/settings/libraryManagement',
        '/settings/notification',
        '/settings/display',
    ].includes(location.pathname);

    useEffect(() => {
        if (!isModalRoute) {
            setBackgroundLocation('');
        }
    }, [location.pathname, isModalRoute]);

    // backgroundLocation 설정
    if (!backgroundLocation && isModalRoute) {
        setBackgroundLocation(location.state?.backgroundLocation || location);
    }

    return (
        <div className="relative flex h-screen w-screen bg-black text-white">
            {/* 배경 라우트 (이전 화면) */}
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="home" element={<HomePage />}>
                        <Route path="ai" element={<AISideBar />} />
                    </Route>
                    <Route path="library" element={<LibraryPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* 모달 라우트 */}
            {isModalRoute && (
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <LoginPage
                                backgroundLocation={backgroundLocation}
                            />
                        }
                    />
                    <Route
                        path="/logout"
                        element={
                            <LogoutPage
                                backgroundLocation={backgroundLocation}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <RegisterPage
                                backgroundLocation={backgroundLocation}
                            />
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <SettingsLayout
                                backgroundLocation={backgroundLocation}
                            />
                        }>
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
                </Routes>
            )}
        </div>
    );
}

export default Router;
